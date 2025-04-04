import { Link, useNavigate } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import AuthLayout from "../layout/AuthLayout";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const provider = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!provider?.user) {
        await provider?.login(formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [facialRecognitionActive, setFacialRecognitionActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Transactions sécurisées",
      description: "Banquez en toute confiance avec notre plateforme chiffrée",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Paiements faciles",
      description: "Envoyez et recevez de l'argent instantanément",
    },
  ];

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setFacialRecognitionActive(true);
      } catch (err) {
        console.error("Erreur d'accès à la caméra:", err);
        alert(
          "Impossible d'accéder à la caméra. Veuillez vérifier vos permissions."
        );
        setFacialRecognitionActive(false);
      }
    };

    if (facialRecognitionActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facialRecognitionActive]);

  const toggleFacialRecognition = async () => {
    setFacialRecognitionActive(!facialRecognitionActive);
    if (facialRecognitionActive) {
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setFacialRecognitionActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <AuthLayout
      title="Bienvenue sur FlashPay"
      subtitle="Gérez vos finances avec notre plateforme bancaire sécurisée et innovante."
      features={features}
    >
      <div className="flex flex-col justify-center items-center transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
          <p className="text-gray-600 mt-2">
            Content de vous revoir ! Veuillez entrer vos identifiants.
          </p>
        </div>
        {facialRecognitionActive && (
          <div className="flex flex-col items-center justify-center mb-6 animate-fade-in">
            {/* Cadre circulaire avec effet de halo */}
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-60 h-60 rounded-full object-cover border-4 border-blue-100 shadow-lg transform transition-all duration-300 hover:scale-105"
              />

              {/* Effet de halo animé */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-0 pointer-events-none"></div>

              {/* Indicateur de reconnaissance */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-50"></span>
                </span>
                Reconnaissance en cours
              </div>
            </div>

            {/* Bouton d'annulation stylisé */}
            <button
              onClick={toggleFacialRecognition}
              className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Annuler la reconnaissance
              </div>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <Button variant="primary" size="md">
              {loading ? <Loader /> : "Se connecter"}
            </Button>

            <button
              variant="outline"
              size="md"
              type="button"
              onClick={toggleFacialRecognition}
              className="flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Connexion par reconnaissance faciale
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
