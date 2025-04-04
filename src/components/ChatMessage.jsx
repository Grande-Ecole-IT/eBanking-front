import { FaUser, FaSeedling } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";

const ChatMessage = ({ message, isBot }) => {
  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } mb-4 animate-fade-in`}
    >
      <div
        className={`flex items-start max-w-[80%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isBot
              ? "bg-gradient-to-br from-emerald-400 to-green-500 animate-pulse"
              : "bg-gradient-to-br from-green-100 to-green-200"
          } shadow-md`}
        >
          {isBot ? (
            <PiPlantFill className="text-xl text-white" />
          ) : (
            <FaUser className="text-green-700" />
          )}
        </div>
        <div
          className={`mx-2 px-6 py-3 rounded-2xl ${
            isBot
              ? "bg-white/80 backdrop-blur-md text-green-800 shadow-md border border-green-100"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          } transform transition-all duration-300 hover:scale-[1.02]`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
          {isBot && (
            <div className="absolute -bottom-2 left-4">
              <FaSeedling className="text-green-500 animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;