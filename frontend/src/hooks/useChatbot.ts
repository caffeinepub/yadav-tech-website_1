import { useState, useEffect, useRef } from 'react';
import { useGetConversation, useSendMessage } from './useQueries';
import type { Message } from '../backend';

export function useChatbot() {
  const [inputValue, setInputValue] = useState('');
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetingShownRef = useRef(false);
  
  const { data: messages = [], isLoading, refetch } = useGetConversation();
  const sendMessageMutation = useSendMessage();

  // Add automatic greeting message on first load
  useEffect(() => {
    const sessionKey = 'chatbot_greeting_shown';
    const greetingShown = sessionStorage.getItem(sessionKey);
    
    if (!greetingShown && !greetingShownRef.current && !isLoading && messages.length === 0) {
      greetingShownRef.current = true;
      setHasShownGreeting(true);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [isLoading, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    const messageText = inputValue.trim();
    setInputValue('');

    try {
      await sendMessageMutation.mutateAsync(messageText);
      await refetch();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Create greeting message if needed
  const greetingMessage: Message | null = hasShownGreeting && messages.length === 0 ? {
    id: BigInt(0),
    author: 'bot',
    text: "Hello! I'm here to help you with anything you need. Feel free to ask me about our services, pricing, or how we can assist your business. What would you like to know?",
    timestamp: BigInt(0),
  } : null;

  const displayMessages = greetingMessage ? [greetingMessage, ...messages] : messages;

  return {
    messages: displayMessages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    isLoading,
    isSending: sendMessageMutation.isPending,
    messagesEndRef,
  };
}
