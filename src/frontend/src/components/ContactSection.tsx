import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 gradient-text">
          Get In Touch
        </h2>
        <p className="text-center text-foreground/70 mb-10 sm:mb-12 md:mb-16 text-base sm:text-lg px-4">
          Let's build something amazing together
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-5 sm:space-y-6">
            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-neon-blue/30">
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 gradient-text">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shrink-0 shadow-glow">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-foreground/70">Email</p>
                    <p className="text-sm sm:text-base text-foreground font-medium">contact@yadavtech.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shrink-0 shadow-glow">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-foreground/70">Phone</p>
                    <a 
                      href="tel:7678643475" 
                      className="text-sm sm:text-base text-foreground font-medium hover:text-neon-blue transition-colors flex items-center min-h-[44px]"
                    >
                      +91 76786 43475
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neon-blue to-electric-purple flex items-center justify-center shrink-0 shadow-glow">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-foreground/70">Location</p>
                    <p className="text-sm sm:text-base text-foreground font-medium">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-electric-purple/30">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-electric-purple">Business Hours</h3>
              <div className="space-y-2 text-sm sm:text-base text-foreground/80">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-neon-blue/30 shadow-glow">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm sm:text-base text-foreground">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-space-black/50 border-neon-blue/30 focus:border-neon-blue h-11 sm:h-12 text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-space-black/50 border-neon-blue/30 focus:border-neon-blue h-11 sm:h-12 text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base text-foreground">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 bg-space-black/50 border-neon-blue/30 focus:border-neon-blue h-11 sm:h-12 text-base"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm sm:text-base text-foreground">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-2 bg-space-black/50 border-neon-blue/30 focus:border-neon-blue resize-none text-base"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-blue to-electric-purple hover:shadow-glow-lg transition-all duration-300 text-base sm:text-lg py-5 sm:py-6 min-h-[52px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
