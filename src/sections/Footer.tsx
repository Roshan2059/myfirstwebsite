import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  Terminal,
  ArrowUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/Roshan2059', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/roshan-panta-b87a93244/', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@roshanpanta.com.np', label: 'Email' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative py-12 lg:py-16 border-t border-[#1a1a2e]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#00f0ff]/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            {/* Logo / Brand */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Terminal className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-xl font-bold font-display text-white">Roshan Panta</span>
              </div>
              <p className="text-sm text-[#a0a0b0]">QA Engineer & Quality Advocate</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-[#a0a0b0] hover:text-[#00f0ff] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center text-[#a0a0b0] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a3e] to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#a0a0b0] text-center sm:text-left">
              © {currentYear} Roshan Panta. Built with{' '}
              <Heart className="w-4 h-4 inline text-[#00ff9d]" /> and lots of{' '}
              <span className="text-[#00f0ff]">testing</span>.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#a0a0b0]/50 font-mono">
                roshanpanta.com.np
              </span>
              
              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center text-[#a0a0b0] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all duration-300 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
