import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote } from 'lucide-react';

const AboutFounder = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Meet The Visionary
        </h2>

        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-neon-blue/30 shadow-glow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-electric-purple rounded-2xl blur-xl opacity-50"></div>
              <img
                src="/assets/generated/founder-nitesh.dim_400x400.png"
                alt="Nitesh Kumar Yadav"
                className="relative rounded-2xl w-full max-w-md mx-auto shadow-glow-lg border-2 border-neon-blue/50"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-neon-blue mb-2">
                  Nitesh Kumar Yadav
                </h3>
                <p className="text-xl text-electric-purple font-semibold mb-4">
                  Founder & CEO
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  A young technology entrepreneur focused on building AI-driven digital platforms that empower businesses.
                </p>
              </div>

              <div className="relative glass-panel p-6 rounded-xl border border-electric-purple/30">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-electric-purple/30" />
                <blockquote className="text-lg italic text-foreground/90 pl-8">
                  "I don't just build software. I build intelligent digital assets that create long-term business value."
                </blockquote>
                <p className="text-right text-neon-blue font-semibold mt-4">
                  – Nitesh Kumar Yadav
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;
