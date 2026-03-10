import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle,
  Cloud,
  Code2,
  Globe,
  HeadphonesIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Send,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const els = document.querySelectorAll(".reveal");
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

// ─── Chatbot ──────────────────────────────────────────────────────────────────
const chatResponses: Record<string, string> = {
  default:
    "I'm here to help! You can ask me about our services, pricing, projects, or how to contact us. 😊",
  hello:
    "Hello there! 👋 I'm Yadav AI. What can I help you with today? Ask me about our AI web development, mobile apps, chatbots, or pricing!",
  hi: "Hi! Great to meet you! 😊 I'm Yadav AI assistant. How can I assist you today?",
  services:
    "We offer: 🌐 AI Web Development, 📱 Mobile App Development, 🤖 AI Chatbot Integration, ☁️ Cloud & DevOps, 🎨 UI/UX Design, and 📈 Digital Marketing & SEO. Which interests you?",
  pricing:
    "Our plans: 💚 Starter ($499) — perfect for small businesses. 💙 Professional ($999) — ideal for growing companies. 💜 Enterprise ($2499) — for large-scale projects. Want details on any plan?",
  contact:
    "You can reach us at: 📞 +91 7678643475, 📧 yadavtech@gmail.com, or 💬 WhatsApp: wa.me/917678643475. We respond within 24 hours!",
  projects:
    "We've delivered 100+ successful projects including AI dashboards, SaaS platforms, mobile apps, and enterprise chatbots. Our clients love us! ⭐⭐⭐⭐⭐",
  ai: "We specialize in cutting-edge AI solutions: intelligent chatbots, machine learning integrations, computer vision, NLP, and AI-powered analytics. The future is now! 🚀",
  web: "Our web development covers React, Next.js, Node.js, Python/Django, and full-stack AI applications. We build fast, scalable, and beautiful web apps. 🌐",
  mobile:
    "We build cross-platform mobile apps with Flutter and React Native, plus native iOS/Android. AI-powered features included! 📱",
  time: "Project timelines vary: Simple websites 2-4 weeks, Mobile apps 4-8 weeks, Complex AI systems 8-16 weeks. We always deliver on time! ⏱️",
  thanks:
    "You're very welcome! 😊 Is there anything else I can help you with? We're always here to assist!",
  bye: "Goodbye! 👋 Feel free to come back anytime. Have a great day! 🌟",
};

function getChatResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hey"))
    return chatResponses.hello;
  if (lower.includes("hi")) return chatResponses.hi;
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("do you")
  )
    return chatResponses.services;
  if (
    lower.includes("pric") ||
    lower.includes("cost") ||
    lower.includes("plan") ||
    lower.includes("package")
  )
    return chatResponses.pricing;
  if (
    lower.includes("contact") ||
    lower.includes("reach") ||
    lower.includes("phone") ||
    lower.includes("email")
  )
    return chatResponses.contact;
  if (
    lower.includes("project") ||
    lower.includes("work") ||
    lower.includes("portfolio") ||
    lower.includes("client")
  )
    return chatResponses.projects;
  if (lower.includes("ai") || lower.includes("machine") || lower.includes("ml"))
    return chatResponses.ai;
  if (
    lower.includes("web") ||
    lower.includes("website") ||
    lower.includes("react")
  )
    return chatResponses.web;
  if (
    lower.includes("mobile") ||
    lower.includes("app") ||
    lower.includes("flutter")
  )
    return chatResponses.mobile;
  if (
    lower.includes("time") ||
    lower.includes("how long") ||
    lower.includes("timeline") ||
    lower.includes("deadline")
  )
    return chatResponses.time;
  if (lower.includes("thank")) return chatResponses.thanks;
  if (lower.includes("bye") || lower.includes("goodbye"))
    return chatResponses.bye;
  return chatResponses.default;
}

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! I'm Yadav AI 🤖 How can I help you today?",
    },
  ]);
  const msgIdRef = useRef(1);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const uid = msgIdRef.current++;
    const bid = msgIdRef.current++;
    const userMsg: ChatMessage = { id: uid, role: "user", text: input };
    const botMsg: ChatMessage = {
      id: bid,
      role: "bot",
      text: getChatResponse(input),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open && (
        <div
          className="chat-widget glass-card rounded-2xl shadow-2xl"
          style={{
            width: "320px",
            maxWidth: "calc(100vw - 3rem)",
            border: "1px solid oklch(72 0.24 210 / 0.3)",
            boxShadow: "0 0 40px oklch(72 0.24 210 / 0.2)",
          }}
          data-ocid="chatbot.panel"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 rounded-t-2xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(55 0.28 295), oklch(72 0.24 210))",
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/robot-avatar.dim_64x64.png"
                alt="Yadav AI"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-display font-semibold text-white text-sm">
                  Yadav AI
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-green-400"
                    style={{ boxShadow: "0 0 6px #4ade80" }}
                  />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              data-ocid="chatbot.close_button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="p-4 space-y-3 overflow-y-auto"
            style={{ height: "280px" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && (
                  <img
                    src="/assets/generated/robot-avatar.dim_64x64.png"
                    alt="bot"
                    className="w-7 h-7 rounded-full mr-2 flex-shrink-0 self-end"
                  />
                )}
                <div
                  className="rounded-2xl px-3 py-2 text-sm max-w-[75%]"
                  style={{
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, oklch(72 0.24 210), oklch(55 0.28 295))"
                        : "oklch(18 0.04 264)",
                    color: "white",
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 border-t"
            style={{ borderColor: "oklch(72 0.24 210 / 0.2)" }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                data-ocid="chatbot.input"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="text-white/70 hover:text-white transition-colors"
                data-ocid="chatbot.submit_button"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl pulse-glow transition-transform hover:scale-110"
        style={{
          background:
            "linear-gradient(135deg, oklch(55 0.28 295), oklch(72 0.24 210))",
        }}
        data-ocid="chatbot.open_modal_button"
        title="Chat with Yadav AI"
      >
        {open ? (
          <X size={22} color="white" />
        ) : (
          <img
            src="/assets/generated/robot-avatar.dim_64x64.png"
            alt="AI Chat"
            className="w-9 h-9 rounded-full"
          />
        )}
      </button>
    </div>
  );
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917678643475"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group"
      style={{
        background: "#25d366",
        boxShadow: "0 0 30px rgba(37, 211, 102, 0.4)",
      }}
      data-ocid="whatsapp.button"
      title="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
        role="img"
        aria-label="WhatsApp"
      >
        <title>WhatsApp</title>
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.348L4 29l7.875-2.21A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.944 0-3.747-.523-5.29-1.433l-.38-.228-4.667 1.31 1.297-4.571-.248-.394A9.953 9.953 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.5-7.5c-.3-.15-1.77-.874-2.046-.975-.275-.1-.475-.15-.674.15-.2.3-.774.975-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.776-1.67-2.076-.174-.3-.018-.463.132-.613.134-.133.3-.35.45-.525.15-.174.2-.3.3-.5.1-.2.05-.374-.025-.524-.075-.15-.674-1.626-.924-2.226-.244-.586-.492-.507-.674-.516l-.575-.01a1.1 1.1 0 00-.8.376c-.274.3-1.05 1.026-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.226 5.124 4.526.716.308 1.274.492 1.71.63.718.229 1.372.197 1.888.12.576-.086 1.77-.723 2.02-1.422.252-.7.252-1.3.177-1.424-.076-.125-.276-.2-.576-.35z" />
      </svg>
      {/* Tooltip */}
      <span
        className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
        style={{ border: "1px solid oklch(72 0.24 210 / 0.3)" }}
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-card" : "bg-transparent"
      }`}
      style={{
        borderBottom: scrolled ? "1px solid oklch(72 0.24 210 / 0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(72 0.24 210), oklch(55 0.28 295))",
            }}
          >
            <Zap size={16} color="white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Yadav <span className="gradient-text">Tech</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              data-ocid="nav.link"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden md:block btn-neon px-5 py-2 rounded-full text-sm font-semibold relative z-10"
            data-ocid="nav.primary_button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </button>
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            data-ocid="nav.toggle"
          >
            <span
              className={`hamburger-line ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span className={`hamburger-line ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`hamburger-line ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden glass-card border-t"
          style={{ borderColor: "oklch(72 0.24 210 / 0.2)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-white text-base font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              className="btn-neon w-full py-2.5 rounded-full text-sm font-semibold relative z-10"
              onClick={() => {
                setMenuOpen(false);
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050510 0%, #0a0a1a 100%)",
      }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 ai-grid-bg opacity-60" />

      {/* Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "oklch(72 0.24 210)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: "oklch(55 0.28 295)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "oklch(72 0.24 210 / 0.1)",
              border: "1px solid oklch(72 0.24 210 / 0.3)",
              color: "var(--neon-blue)",
            }}
          >
            <Zap size={14} />
            <span>AI-Powered Technology Solutions</span>
          </div>

          <h1 className="font-display font-bold leading-tight mb-6">
            <span
              className="block text-5xl md:text-6xl lg:text-7xl text-white"
              style={{ lineHeight: 1.1 }}
            >
              Build the Future
            </span>
            <span
              className="block text-5xl md:text-6xl lg:text-7xl gradient-text"
              style={{ lineHeight: 1.2 }}
            >
              with AI
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            We craft cutting-edge AI-powered web apps, mobile solutions, and
            intelligent systems that transform businesses and define the next
            generation of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              type="button"
              className="btn-neon px-8 py-3.5 rounded-full font-semibold text-base relative z-10 flex items-center gap-2"
              data-ocid="hero.primary_button"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Your Project <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="btn-outline-neon px-8 py-3.5 rounded-full font-semibold text-base flex items-center gap-2"
              data-ocid="hero.secondary_button"
              onClick={() =>
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Watch Demo <Bot size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 justify-center lg:justify-start">
            {[
              { value: "100+", label: "Projects" },
              { value: "50+", label: "Clients" },
              { value: "5 Yrs", label: "Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-bold text-2xl text-white text-glow-blue">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sphere Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: "oklch(72 0.24 210)" }}
            />
            <img
              src="/assets/generated/ai-sphere.dim_600x600.png"
              alt="AI Sphere"
              className="relative z-10 float-animation"
              style={{ width: "min(480px, 85vw)", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white/40 text-xs">Scroll to explore</span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: "oklch(72 0.24 210 / 0.4)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "var(--neon-blue)" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24" style={{ background: "#070714" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Photo */}
          <div className="relative reveal">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(72 0.24 210), oklch(55 0.28 295))",
              }}
            />
            <div className="gradient-border rounded-3xl p-1 relative z-10">
              <img
                src="/assets/generated/founder-nitesh.dim_400x400.png"
                alt="Nitesh Yadav - Founder"
                className="w-72 h-72 object-cover rounded-3xl"
              />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 text-center z-20"
              style={{ border: "1px solid oklch(78 0.18 70 / 0.4)" }}
            >
              <p className="gradient-text-gold font-display font-bold text-xl">
                5+
              </p>
              <p className="text-white/60 text-xs">Years in AI</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 reveal">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "oklch(55 0.28 295 / 0.1)",
                border: "1px solid oklch(55 0.28 295 / 0.3)",
                color: "oklch(65 0.28 295)",
              }}
            >
              <Star size={14} /> Meet the Founder
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
              Nitesh Yadav
            </h2>
            <p className="gradient-text font-medium text-lg mb-6">
              Visionary AI Entrepreneur & Tech Innovator
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              With over 5 years of experience at the intersection of artificial
              intelligence and software engineering, Nitesh Yadav has led 100+
              successful digital transformations for clients across India, USA,
              and Europe. His passion for AI-driven innovation drives every
              product Yadav Tech builds.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              From startup MVPs to enterprise-grade AI platforms, Nitesh
              combines technical mastery with business acumen to deliver
              solutions that don't just work — they make a measurable
              difference.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+917678643475"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "oklch(72 0.24 210 / 0.1)",
                  border: "1px solid oklch(72 0.24 210 / 0.3)",
                  color: "var(--neon-blue)",
                }}
              >
                <Phone size={15} /> +91 7678643475
              </a>
              <a
                href="https://wa.me/917678643475"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "rgba(37, 211, 102, 0.1)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25d366",
                }}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Code2,
    title: "AI Web Development",
    desc: "Full-stack AI-powered web applications built with React, Next.js, Node.js, and Python. Scalable, fast, and intelligent.",
    color: "oklch(72 0.24 210)",
    colorBg: "oklch(72 0.24 210 / 0.15)",
    colorBorder: "1px solid oklch(72 0.24 210 / 0.3)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps with Flutter and React Native. Native performance with AI-driven features built in.",
    color: "oklch(55 0.28 295)",
    colorBg: "oklch(55 0.28 295 / 0.15)",
    colorBorder: "1px solid oklch(55 0.28 295 / 0.3)",
  },
  {
    icon: Bot,
    title: "AI Chatbot Integration",
    desc: "Intelligent conversational AI powered by GPT and custom NLP models. 24/7 customer support that never sleeps.",
    color: "oklch(78 0.18 70)",
    colorBg: "oklch(78 0.18 70 / 0.15)",
    colorBorder: "1px solid oklch(78 0.18 70 / 0.3)",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS, GCP, Azure deployment with CI/CD pipelines, Kubernetes orchestration, and infrastructure as code.",
    color: "oklch(72 0.24 210)",
    colorBg: "oklch(72 0.24 210 / 0.15)",
    colorBorder: "1px solid oklch(72 0.24 210 / 0.3)",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Stunning, user-centric interfaces that convert. From wireframes to pixel-perfect, animated design systems.",
    color: "oklch(55 0.28 295)",
    colorBg: "oklch(55 0.28 295 / 0.15)",
    colorBorder: "1px solid oklch(55 0.28 295 / 0.3)",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    desc: "Data-driven SEO, content marketing, and growth hacking strategies to dominate search and social channels.",
    color: "oklch(78 0.18 70)",
    colorBg: "oklch(78 0.18 70 / 0.15)",
    colorBorder: "1px solid oklch(78 0.18 70 / 0.3)",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24" style={{ background: "#050510" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: "oklch(72 0.24 210 / 0.1)",
              border: "1px solid oklch(72 0.24 210 / 0.3)",
              color: "var(--neon-blue)",
            }}
          >
            <Zap size={14} /> What We Build
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            End-to-end technology solutions engineered for impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="gradient-border rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{
                  background: svc.colorBg,
                  border: svc.colorBorder,
                }}
              >
                <svc.icon size={22} style={{ color: svc.color }} />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">
                {svc.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Python", color: "#3776ab" },
  { name: "TensorFlow", color: "#ff6f00" },
  { name: "Node.js", color: "#339933" },
  { name: "AWS", color: "#ff9900" },
  { name: "MongoDB", color: "#47a248" },
  { name: "Flutter", color: "#02569b" },
  { name: "OpenAI", color: "#412991" },
];

function TechStackSection() {
  return (
    <section className="py-20" style={{ background: "#070714" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-white/40 text-sm">
            Powered by industry-leading technologies
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 reveal">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-card px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform cursor-default"
              style={{ border: `1px solid ${tech.color}40` }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: tech.color,
                  boxShadow: `0 0 8px ${tech.color}`,
                }}
              />
              <span className="text-white font-medium text-sm">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
const products = [
  {
    title: "AI Trading Dashboard",
    desc: "Real-time market intelligence with ML-driven predictions and automated trading signals.",
    img: "/assets/generated/mockup-trading-dashboard.dim_800x600.png",
    tag: "FinTech",
  },
  {
    title: "SaaS Admin Panel",
    desc: "Enterprise-grade admin dashboard with advanced analytics, role management, and AI insights.",
    img: "/assets/generated/mockup-saas-panel.dim_800x600.png",
    tag: "SaaS",
  },
  {
    title: "AI Mobile App",
    desc: "Smart mobile experience with on-device AI, personalized recommendations, and real-time sync.",
    img: "/assets/generated/mockup-mobile-app.dim_400x800.png",
    tag: "Mobile",
  },
  {
    title: "AI Chatbot Platform",
    desc: "Enterprise conversational AI platform with NLP, multi-language support, and CRM integrations.",
    img: "/assets/generated/mockup-chatbot.dim_800x600.png",
    tag: "AI/ML",
  },
];

function ProductsSection() {
  return (
    <section id="products" className="py-24" style={{ background: "#050510" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: "oklch(55 0.28 295 / 0.1)",
              border: "1px solid oklch(55 0.28 295 / 0.3)",
              color: "oklch(65 0.28 295)",
            }}
          >
            <Award size={14} /> Featured Work
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Product <span className="gradient-text">Showcase</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <div
              key={p.title}
              className="gradient-border rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-ocid={`products.item.${i + 1}`}
            >
              <div
                className="relative overflow-hidden"
                style={{ height: "220px" }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(10 0.02 264) 0%, transparent 60%)",
                  }}
                />
                <span
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "oklch(72 0.24 210 / 0.2)",
                    border: "1px solid oklch(72 0.24 210 / 0.5)",
                    color: "var(--neon-blue)",
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-white text-xl mb-2">
                  {p.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: "$499",
    desc: "Perfect for small businesses and MVPs",
    features: [
      "5-page responsive website",
      "Basic AI integration",
      "Mobile responsive design",
      "SEO optimization",
      "1 month support",
    ],
    highlight: false,
    color: "oklch(72 0.24 210)",
    colorBorder: "1px solid oklch(72 0.24 210 / 0.4)",
    colorBg: "oklch(72 0.24 210 / 0.15)",
    colorBorderSoft: "1px solid oklch(72 0.24 210 / 0.3)",
  },
  {
    name: "Professional",
    price: "$999",
    desc: "Ideal for growing companies",
    features: [
      "15-page web application",
      "Advanced AI features",
      "Custom chatbot integration",
      "Admin dashboard",
      "API integrations",
      "3 months support",
    ],
    highlight: true,
    color: "oklch(55 0.28 295)",
    colorBorder: "1px solid oklch(55 0.28 295 / 0.4)",
    colorBg: "oklch(55 0.28 295 / 0.15)",
    colorBorderSoft: "1px solid oklch(55 0.28 295 / 0.3)",
  },
  {
    name: "Enterprise",
    price: "$2,499",
    desc: "For large-scale enterprise projects",
    features: [
      "Unlimited pages & features",
      "Full AI/ML system",
      "Mobile app included",
      "Cloud infrastructure",
      "Dedicated team",
      "12 months support",
    ],
    highlight: false,
    color: "oklch(78 0.18 70)",
    colorBorder: "1px solid oklch(78 0.18 70 / 0.4)",
    colorBg: "oklch(78 0.18 70 / 0.15)",
    colorBorderSoft: "1px solid oklch(78 0.18 70 / 0.3)",
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-24" style={{ background: "#070714" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/50">Transparent pricing. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 reveal ${
                plan.highlight ? "scale-105 glow-purple" : ""
              }`}
              style={{
                background: plan.highlight
                  ? "linear-gradient(135deg, oklch(55 0.28 295 / 0.2), oklch(72 0.24 210 / 0.1))"
                  : "oklch(12 0.03 264)",
                border: `1px solid ${plan.color.replace(")", " / 0.4)")}`,
                transitionDelay: `${i * 100}ms`,
              }}
              data-ocid={`pricing.item.${i + 1}`}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(55 0.28 295), oklch(72 0.24 210))",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: plan.colorBg,
                  border: plan.colorBorderSoft,
                }}
              >
                <Zap size={18} style={{ color: plan.color }} />
              </div>

              <h3 className="font-display font-bold text-white text-xl mb-1">
                {plan.name}
              </h3>
              <p className="text-white/40 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-display font-bold text-4xl text-white">
                  {plan.price}
                </span>
                <span className="text-white/40 text-sm ml-1">/ project</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      style={{ color: plan.color, marginTop: 2, flexShrink: 0 }}
                    />
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={
                  plan.highlight
                    ? "w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 btn-neon relative z-10"
                    : "w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 btn-outline-neon"
                }
                data-ocid={`pricing.primary_button.${i + 1}`}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Yadav Tech ───────────────────────────────────────────────────────────
const reasons = [
  {
    icon: Award,
    value: "100+",
    label: "Projects Delivered",
    desc: "Successful products across web, mobile, and AI domains.",
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    desc: "Trusted by startups and enterprises across 10+ countries.",
  },
  {
    icon: Star,
    value: "5 Yrs",
    label: "Experience",
    desc: "Deep expertise in AI, cloud, and modern software engineering.",
  },
  {
    icon: HeadphonesIcon,
    value: "24/7",
    label: "Support",
    desc: "Round-the-clock dedicated support and rapid response times.",
  },
];

function WhySection() {
  return (
    <section className="py-24" style={{ background: "#050510" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Why Choose <span className="gradient-text">Yadav Tech</span>?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.label}
              className="gradient-border rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "oklch(72 0.24 210 / 0.15)",
                  border: "1px solid oklch(72 0.24 210 / 0.3)",
                }}
              >
                <r.icon size={22} style={{ color: "var(--neon-blue)" }} />
              </div>
              <p className="font-display font-bold text-3xl text-white gradient-text mb-1">
                {r.value}
              </p>
              <p className="font-semibold text-white mb-2">{r.label}</p>
              <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Global Vision ────────────────────────────────────────────────────────────
function GlobalSection() {
  return (
    <section className="py-24" style={{ background: "#070714" }}>
      <div className="max-w-5xl mx-auto px-6 text-center reveal">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
          style={{
            background: "oklch(78 0.18 70 / 0.1)",
            border: "1px solid oklch(78 0.18 70 / 0.3)",
            color: "var(--gold)",
          }}
        >
          <Globe size={14} /> Global Reach
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
          Serving Clients <span className="gradient-text-gold">Worldwide</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          From Silicon Valley startups to European enterprises, Yadav Tech
          delivers world-class AI solutions without borders. Our remote-first
          team operates across time zones to ensure your project is always
          moving forward.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            "🇮🇳 India",
            "🇺🇸 USA",
            "🇬🇧 UK",
            "🇩🇪 Germany",
            "🇦🇪 UAE",
            "🇸🇬 Singapore",
          ].map((loc) => (
            <div
              key={loc}
              className="glass-card px-5 py-2.5 rounded-full text-white/70 text-sm font-medium"
              style={{ border: "1px solid oklch(72 0.24 210 / 0.2)" }}
            >
              {loc}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24" style={{ background: "#050510" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/50">
            Ready to build something extraordinary? Let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="reveal">
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 7678643475",
                  href: "tel:+917678643475",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "yadavtech@gmail.com",
                  href: "mailto:yadavtech@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "India • Global Remote",
                  href: "#",
                },
              ].map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 gradient-border rounded-xl p-4 group hover:scale-[1.02] transition-transform"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(72 0.24 210 / 0.15)",
                      border: "1px solid oklch(72 0.24 210 / 0.3)",
                    }}
                  >
                    <info.icon
                      size={18}
                      style={{ color: "var(--neon-blue)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="gradient-border rounded-2xl p-8 reveal">
            {submitted ? (
              <div
                className="text-center py-12"
                data-ocid="contact.success_state"
              >
                <CheckCircle
                  size={48}
                  style={{ color: "var(--neon-blue)" }}
                  className="mx-auto mb-4"
                />
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/50">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-white/60 text-sm mb-2 block"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Nitesh Yadav"
                    required
                    className="bg-transparent border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-white/60 text-sm mb-2 block"
                  >
                    Email Address
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    required
                    className="bg-transparent border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-white/60 text-sm mb-2 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="bg-transparent border-white/10 text-white placeholder:text-white/30 focus:border-primary resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-neon w-full py-3 rounded-xl font-semibold relative z-10 flex items-center justify-center gap-2"
                  data-ocid="contact.submit_button"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-12"
      style={{
        background: "#030309",
        borderTop: "1px solid oklch(72 0.24 210 / 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(72 0.24 210), oklch(55 0.28 295))",
              }}
            >
              <Zap size={16} color="white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Yadav <span className="gradient-text">Tech</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            {[
              "#home",
              "#about",
              "#services",
              "#products",
              "#pricing",
              "#contact",
            ].map((href) => (
              <a
                key={href}
                href={href}
                className="text-white/40 hover:text-white transition-colors capitalize"
              >
                {href.replace("#", "")}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/30 text-sm">
              © {year} Yadav Tech. All rights reserved.
            </p>
            <p className="text-white/20 text-xs mt-1">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <div className="font-body" style={{ background: "#050510" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechStackSection />
        <ProductsSection />
        <PricingSection />
        <WhySection />
        <GlobalSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}
