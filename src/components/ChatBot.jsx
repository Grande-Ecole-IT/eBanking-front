/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiSend, FiX, FiZap, FiMic } from "react-icons/fi";
import { getAllUsers, updateUserBalance } from "../services/databases/users";
import { useAuth } from "../hooks/useAuth";
import { createTransaction } from "../services/databases/transactions";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [recentMess, setRecentMess] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [users, setUsers] = useState(null);
  const { user: currentUser } = useAuth() || {};
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.documents);
    });
  }, []);

  const verifyIfExistingUser = (username) => {
    if (!username || !users) {
      console.warn("Username ou liste d'utilisateurs manquant");
      return null;
    }
    const normalizedUsername = username.trim().replace(/^@+/, "").toLowerCase();
    const existingUser = users.find((user) => {
      const normalizedUserName = user.name?.toLowerCase();
      return normalizedUserName === normalizedUsername || user.$id === username;
    });

    if (existingUser) {
      return {
        ...existingUser,
        matchType: existingUser.email?.includes(normalizedUsername)
          ? "email"
          : "name",
      };
    }
    return null;
  };

  useEffect(() => {
    if (users && currentUser?.$id) {
      const filtered = users.filter((user) => user.$id !== currentUser.$id);
      setFilteredUsers(filtered);
    }
  }, [users, currentUser?.$id]);

  const doTransaction = async (transactionData) => {
    try {
      const response = await fetch(
        "https://ebanking-back.onrender.com/transaction-analyzer/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      if (result.type == "SEND") {
        const user = verifyIfExistingUser(result.receiver);
        if (user) {
          setMessages([
            ...messages,
            {
              text: `Ok je vais envoyé ${result.amount} ${result.currency} à ${result.receiver}`,
              sender: "bot",
            },
            {
              text: "Envoi en cours...",
              sender: "bot",
              status: "processing",
              animation: "ripple",
            },
          ]);
          try {
            await createTransaction(
              currentUser?.$id,
              result.receiver,
              result.purpose,
              parseFloat(result.amount),
              "ENVOI"
            );

            const amount = currentUser.solde - result.amount;
            updateUserBalance(currentUser.$id, amount);
            setTimeout(onClose, 2000);
          } catch (error) {
            console.error("Transaction error:", error);
          } finally {
            setMessages((prev) => [
              ...prev.filter((msg) => msg.status !== "processing"),
              {
                text: `Transaction de ${result.amount} ${result.currency} effectuée avec succès à ${result.receiver}`,
                sender: "bot",
                status: "completed",
              },
            ]);
          }
        } else {
          setMessages([
            ...messages,
            {
              text: `L'user ${result.receiver} n'existe pas. Veuillez bien verifier.`,
              sender: "bot",
            },
          ]);
        }
      } else if (result.type == "DEMAND") {
        const user = verifyIfExistingUser(result.sender);
        if (user) {
          const amount = currentUser.solde + result.amount;
          updateUserBalance(currentUser.$id, amount);
          setMessages([
            ...messages,
            {
              text: `Ok je vais envoyé une demande à ${result.sender} une valeur de ${result.amount} ${result.currency} `,
              sender: "bot",
            },
          ]);
        } else {
          setMessages([
            ...messages,
            {
              text: `L'user ${result.sender} n'existe pas. Veuillez bien verifier.`,
              sender: "bot",
            },
          ]);
        }
      }
      return result;
    } catch (error) {
      setMessages([
        ...messages,
        {
          text: `Erreur lors de la transaction. Veuillez bien verifier votre message`,
          sender: "bot",
        },
      ]);
      console.error("Erreur lors de la transaction:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (recentMess) {
      const transactionData = {
        username: recentMess.sender,
        content: recentMess.text,
      };
      const result = doTransaction(transactionData);
      const user = getAllUsers();
      console.log(user);
    }
  }, [recentMess]);

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "fr-FR";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      console.warn(
        "L'API de reconnaissance vocale n'est pas supportée par ce navigateur"
      );
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error(
          "Erreur lors du démarrage de la reconnaissance vocale:",
          error
        );
      }
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setRecentMess({ text: inputValue, sender: "@Jason" });
    setInputValue("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-md z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-200/50 overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh", height: "560px" }}
          >
            {/* Header avec effet néon */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm" />
              <div className="relative z-10 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs">
                  <FiZap className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg tracking-tight">
                    FlashPay Assistant
                  </h3>
                  <p className="text-blue-100 text-xs font-light">
                    Connecté en temps réel
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="relative z-10 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Messages avec effet de profondeur */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-blue-50/50 to-white/30">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <FiMessageSquare className="text-blue-500 text-2xl" />
                  </div>
                  <h4 className="text-blue-800 font-medium mb-1">
                    Assistant FlashPay
                  </h4>
                  <p className="text-blue-500 text-sm max-w-xs">
                    Posez-moi vos questions sur vos transactions, comptes ou
                    services bancaires
                  </p>
                  <button
                    onClick={toggleListening}
                    className={`mt-4 p-3 rounded-full ${
                      isListening ? "bg-red-500 animate-pulse" : "bg-blue-500"
                    } text-white shadow-md`}
                  >
                    <FiMic className="text-xl" />
                  </button>
                  {isListening && (
                    <p className="text-blue-500 text-xs mt-2">En écoute...</p>
                  )}
                </motion.div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`relative max-w-xs p-4 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none shadow-blue-200/50 shadow-md"
                            : "bg-white border border-blue-100 rounded-bl-none shadow-sm"
                        }`}
                      >
                        {message.text}

                        {/* Effet d'ondulation pour les messages en cours */}
                        {message.status === "processing" && (
                          <div className="absolute -bottom-1.5 left-3 right-3 flex justify-center space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0.5, y: 0 }}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  y: [0, -3, 0],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  delay: i * 0.2,
                                }}
                                className="w-2 h-2 bg-blue-400 rounded-full"
                              />
                            ))}
                          </div>
                        )}

                        {/* Barre de progression */}
                        {message.status === "processing" && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-blue-300 rounded-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie avec effet glassmorphism */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-blue-100/50">
              <motion.div
                layout
                className="flex items-center space-x-2 bg-white/90 backdrop-blur-xs rounded-xl px-3 py-2 border border-blue-100 shadow-inner"
              >
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  } transition-all`}
                >
                  <FiMic className="text-lg" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Écrivez ou dictez votre message..."
                  className="flex-1 p-2 bg-transparent focus:outline-none text-blue-900 placeholder-blue-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg ${
                    inputValue.trim()
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-blue-100 text-blue-400"
                  } transition-all`}
                >
                  <FiSend className="text-lg" />
                </motion.button>
              </motion.div>
              <p className="text-xs text-blue-400 mt-2 text-center">
                Appuyez sur Entrée pour envoyer ou cliquez sur le micro pour
                parler
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
