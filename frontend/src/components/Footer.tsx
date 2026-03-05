import { SiFacebook, SiX, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-neon-blue/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shadow-glow">
                <span className="text-xl font-bold text-white">YT</span>
              </div>
              <span className="text-xl font-bold gradient-text">Yadav Tech</span>
            </div>
            <p className="text-foreground/70 text-sm">
              Engineering the Future with Artificial Intelligence
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-neon-blue">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-foreground/70 hover:text-neon-blue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-foreground/70 hover:text-neon-blue transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-foreground/70 hover:text-neon-blue transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-neon-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-neon-blue">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-glow transition-all duration-300"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-glow transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-glow transition-all duration-300"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-glow transition-all duration-300"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-glow transition-all duration-300"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neon-blue/20 pt-8 text-center">
          <p className="text-foreground/70 text-sm">
            © {currentYear} Yadav Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

