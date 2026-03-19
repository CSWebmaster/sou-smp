import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickOption {
  id: string;
  label: string;
  response: string;
}

const QUICK_OPTIONS: QuickOption[] = [
  {
    id: "join",
    label: "How to join IEEE?",
    response: "To join IEEE, you can become a member through the official IEEE website or visit our Join page for more information about student membership benefits and the registration process. As a student member, you'll get access to exclusive resources, networking opportunities, and technical publications."
  },
  {
    id: "events",
    label: "Upcoming events",
    response: "Check out our Events page to see all upcoming workshops, seminars, and technical sessions. We regularly organize events on emerging technologies, skill development, and professional networking. Stay connected through our social media channels for the latest updates!"
  },
  {
    id: "contact",
    label: "Contact team",
    response: "You can reach our team at:\n📧 ieee.fbc@socet.edu.in\n📧 ieee.sc@socet.edu.in\n📧 ieee.tr@socet.edu.in\n📞 +91 79660 46304\n📍 Apple Lab, B-120, Silver Oak University\n\nOr visit our Contact page to send us a message directly!"
  },
  {
    id: "benefits",
    label: "IEEE benefits",
    response: "IEEE membership offers:\n• Access to cutting-edge technical papers and publications\n• Networking opportunities with professionals worldwide\n• Career development resources and job boards\n• Discounts on conferences and events\n• Leadership and skill development programs\n• Student branch activities and competitions\n• Resume building and professional recognition"
  },
  {
    id: "about",
    label: "About IEEE SOU SB",
    response: "IEEE Silver Oak University Student Branch is dedicated to providing students with opportunities for professional development, technical growth, and networking. We conduct various events, workshops, and competitions throughout the year. Visit our About page to learn more about our mission, vision, and activities!"
  },
  {
    id: "chapters",
    label: "Student chapters",
    response: "We have several active chapters:\n• WIE (Women in Engineering)\n• SPS (Signal Processing Society)\n• CS (Computer Society)\n• SIGHT (Special Interest Group on Humanitarian Technology)\n\nEach chapter focuses on specific technical domains and organizes specialized events and workshops."
  }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your IEEE SOU SB assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [customInput, setCustomInput] = useState("");

  /* ─── Auto-scroll refs ─── */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Track whether user is near the bottom of the chat
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const threshold = 100;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsNearBottom(distanceFromBottom <= threshold);
  };

  // Auto-scroll to bottom when new messages arrive (only if user is near bottom)
  useEffect(() => {
    if (isNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isNearBottom]);

  const handleQuickOption = (option: QuickOption) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: option.label,
      sender: "user",
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: option.response,
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleCustomMessage = () => {
    if (!customInput.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: customInput,
      sender: "user",
      timestamp: new Date()
    };

    let botResponse = "I'm a simple assistant with predefined responses. Please use the quick options above, or visit our Contact page for specific inquiries. Our team will be happy to help you!";

    const lowerInput = customInput.toLowerCase();

    if (lowerInput.includes("join") || lowerInput.includes("membership") || lowerInput.includes("register")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "join")?.response || botResponse;
    } else if (lowerInput.includes("event") || lowerInput.includes("workshop") || lowerInput.includes("seminar")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "events")?.response || botResponse;
    } else if (lowerInput.includes("contact") || lowerInput.includes("reach") || lowerInput.includes("email") || lowerInput.includes("phone")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "contact")?.response || botResponse;
    } else if (lowerInput.includes("benefit") || lowerInput.includes("advantage") || lowerInput.includes("why")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "benefits")?.response || botResponse;
    } else if (lowerInput.includes("about") || lowerInput.includes("what is") || lowerInput.includes("who are")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "about")?.response || botResponse;
    } else if (lowerInput.includes("chapter") || lowerInput.includes("wie") || lowerInput.includes("sps") || lowerInput.includes("sight")) {
      botResponse = QUICK_OPTIONS.find(opt => opt.id === "chapters")?.response || botResponse;
    }

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: botResponse,
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setCustomInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCustomMessage();
    }
  };

  return (
    <>
      {/* ─── Floating Button + Tooltip ─── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group floating-button-mobile">
          {/* Tooltip — desktop only */}
          <span
            className="
              hidden md:block
              absolute right-full mr-3 top-1/2 -translate-y-1/2
              whitespace-nowrap
              bg-[#00629B] text-white text-xs font-medium
              px-3 py-1.5 rounded-full
              opacity-0 scale-95 -translate-x-1
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0
              transition-all duration-300 ease-in-out
              pointer-events-none
            "
          >
            Need help?
          </span>

          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-[#00629B] hover:bg-[#004f7d] transition-all duration-300 hover:scale-110 hover:shadow-xl"
            size="icon"
            aria-label="Open assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* ─── Chat Panel ─── */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[30vw] h-[30vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 ai-assistant-mobile">
          {/* Header */}
          <div className="bg-[#00629B] text-white p-[clamp(12px, 2vw, 16px)] flex items-center justify-between">
            <div className="flex items-center gap-[clamp(8px, 1.5vw, 12px)]">
              <MessageCircle className="h-[clamp(16px, 2.5vw, 20px)] w-[clamp(16px, 2.5vw, 20px)]" />
              <h3 className="font-semibold text-[clamp(14px, 1.8vw, 18px)]">IEEE SOU SB Assistant</h3>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-[clamp(28px, 4vw, 36px)] w-[clamp(28px, 4vw, 36px)]"
              aria-label="Close assistant"
            >
              <X className="h-[clamp(12px, 2vw, 16px)] w-[clamp(12px, 2vw, 16px)]" />
            </Button>
          </div>

          {/* Quick Options */}
          <div className="p-[clamp(8px, 1.5vw, 12px)] bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <p className="text-[clamp(10px, 1.2vw, 12px)] font-medium text-gray-600 dark:text-gray-400 mb-[clamp(6px, 1vw, 8px)]">Quick Options:</p>
            <div className="flex flex-wrap gap-[clamp(6px, 1vw, 8px)]">
              {QUICK_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOption(option)}
                  className="text-[clamp(10px, 1.2vw, 12px)] px-[clamp(8px, 1.5vw, 12px)] py-[clamp(6px, 1vw, 8px)] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-[#00629B] hover:text-white hover:border-[#00629B] transition-colors duration-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-[clamp(8px, 1.5vw, 16px)] space-y-[clamp(6px, 1vw, 8px)]"
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-[clamp(8px, 1.5vw, 12px)] text-[clamp(12px, 1.2vw, 14px)]",
                    message.sender === "user"
                      ? "bg-[#00629B] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  )}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className="text-[clamp(10px, 1vw, 12px)] opacity-70 mt-[clamp(4px, 0.8vw, 6px)]">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* Invisible anchor for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-[clamp(8px, 1.5vw, 16px)] border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-[clamp(6px, 1vw, 8px)]">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-[clamp(8px, 1.5vw, 12px)] py-[clamp(6px, 1vw, 8px)] border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[clamp(12px, 1.2vw, 14px)] focus:outline-none focus:ring-2 focus:ring-[#00629B]"
              />
              <Button
                onClick={handleCustomMessage}
                size="icon"
                className="bg-[#00629B] hover:bg-[#004f7d] h-[clamp(32px, 5vw, 40px)] w-[clamp(32px, 5vw, 40px)]"
                aria-label="Send message"
              >
                <Send className="h-[clamp(12px, 2vw, 16px)] w-[clamp(12px, 2vw, 16px)]" />
              </Button>
            </div>
            <p className="text-[clamp(10px, 1vw, 12px)] text-gray-500 dark:text-gray-400 mt-[clamp(4px, 0.8vw, 6px)]">
              This is a simple rule-based assistant. For specific inquiries, please contact our team.
            </p>
          </div>
        </div>
      )}
    </>
  );
}