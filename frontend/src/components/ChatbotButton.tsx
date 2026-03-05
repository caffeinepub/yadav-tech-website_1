import { MessageSquare } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatbotButton = ({ onClick, isOpen }: ChatbotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
    >
      <div className="relative w-7 h-7 sm:w-8 sm:h-8">
        <img 
          src="/assets/generated/chatbot-icon.dim_64x64.png" 
          alt="AI Chat" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-space-black animate-pulse" />
      )}
    </button>
  );
};

export default ChatbotButton;
