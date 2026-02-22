import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote } from 'lucide-react';

const AboutFounder = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 gradient-text">
          Meet The Visionary
        </h2>

        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-12 border border-neon-blue/30 shadow-glow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="relative order-1 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-electric-purple rounded-xl sm:rounded-2xl blur-xl opacity-50"></div>
              <img
                src="/assets/11FE0F25-D994-42A0-BFA2-D7406D3CF574.jpg"
                alt="Nitesh Kumar Yadav"
                className="relative rounded-xl sm:rounded-2xl w-full max-w-sm mx-auto shadow-glow-lg border-2 border-neon-blue/50"
              />
            </div>

            <div className="space-y-5 sm:space-y-6 order-2 md:order-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neon-blue mb-2">
                  Nitesh Kumar Yadav
                </h3>
                <p className="text-lg sm:text-xl text-electric-purple font-semibold mb-3 sm:mb-4">
                  Founder & CEO
                </p>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  A young technology entrepreneur focused on building AI-driven digital platforms that empower businesses.
                </p>
              </div>

              <div className="relative glass-panel p-5 sm:p-6 rounded-lg sm:rounded-xl border border-electric-purple/30">
                <Quote className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 text-electric-purple/30" />
                <blockquote className="text-base sm:text-lg italic text-foreground/90 pl-6 sm:pl-8">
                  "I don't just build software. I build intelligent digital assets that create long-term business value."
                </blockquote>
                <p className="text-right text-neon-blue font-semibold mt-3 sm:mt-4 text-sm sm:text-base">
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
