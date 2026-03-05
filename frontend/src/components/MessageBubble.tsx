interface MessageBubbleProps {
  text: string;
  author: 'user' | 'bot';
  timestamp?: bigint;
}

const MessageBubble = ({ text, author }: MessageBubbleProps) => {
  const isBot = author === 'bot';

  return (
    <div className={`flex items-start gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'} mb-4`}>
      {isBot && (
        <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 flex items-center justify-center p-1">
          <img 
            src="/assets/generated/robot-avatar.dim_64x64.png" 
            alt="AI Bot" 
            className="w-full h-full object-contain"
          />
        </div>
      )}
      
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl glass-panel border ${
          isBot
            ? 'border-electric-purple/30 bg-electric-purple/5'
            : 'border-neon-blue/30 bg-neon-blue/5'
        }`}
      >
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>

      {!isBot && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center">
          <span className="text-white text-sm font-semibold">U</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
