import { X, Send, Loader2 } from 'lucide-react';
import { useChatbot } from '../hooks/useChatbot';
import MessageBubble from './MessageBubble';
import { ScrollArea } from './ui/scroll-area';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    isLoading,
    isSending,
    messagesEndRef,
  } = useChatbot();

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] glass-panel border border-neon-blue/30 rounded-2xl shadow-glow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-gradient-to-r from-neon-blue/10 to-electric-purple/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 flex items-center justify-center p-1.5">
            <img 
              src="/assets/generated/robot-avatar.dim_64x64.png" 
              alt="AI Assistant" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Yadav Tech AI</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-accent/50 flex items-center justify-center transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <MessageBubble
                key={message.id.toString()}
                text={message.text}
                author={message.author as 'user' | 'bot'}
                timestamp={message.timestamp}
              />
            ))}
            {isSending && (
              <div className="flex items-center gap-3 mb-4">
                <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 flex items-center justify-center p-1">
                  <img 
                    src="/assets/generated/robot-avatar.dim_64x64.png" 
                    alt="AI Bot" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-4 py-3 rounded-2xl glass-panel border border-electric-purple/30 bg-electric-purple/5">
                  <p className="text-sm text-muted-foreground">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/50 bg-gradient-to-r from-neon-blue/5 to-electric-purple/5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 px-4 py-2 bg-background/50 border border-input rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isSending}
            className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Send message"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
