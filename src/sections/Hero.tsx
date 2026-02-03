import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, ChevronDown, Terminal, Sparkles } from 'lucide-react';
import { DecodingText } from '../components/TypingText';
import GlowButton from '../components/GlowButton';

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set('.hero-greeting', { opacity: 0, y: 20 });
      gsap.set('.hero-name', { opacity: 0, y: 30 });
      gsap.set('.hero-role', { opacity: 0, y: 20 });
      gsap.set('.hero-tagline', { opacity: 0, y: 20 });
      gsap.set('.hero-cta', { opacity: 0, y: 20 });
      gsap.set('.hero-social', { opacity: 0, x: -20 });
      gsap.set('.hero-image', { opacity: 0, rotateY: 90, z: -100 });
      gsap.set('.hero-status', { opacity: 0, scale: 0 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to('.hero-greeting', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.hero-role', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
      .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to('.hero-social', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.4')
      .to('.hero-image', {
        opacity: 1,
        rotateY: 0,
        z: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=1')
      .to('.hero-status', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Image tilt effect
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(imageRef.current, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleImageMouseLeave = () => {
    if (!imageRef.current) return;
    
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1 text-center lg:text-left">
            {/* Greeting */}
            <div className="hero-greeting flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-[#a0a0b0] font-mono text-sm tracking-wider">
                <DecodingText text="Hello, I'm" delay={600} />
              </span>
            </div>

            {/* Name */}
            <h1 className="hero-name text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white mb-4 tracking-tight">
              <DecodingText text="Roshan Panta" delay={800} />
            </h1>

            {/* Role */}
            <div className="hero-role mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-medium gradient-text">
                Associate Software QA Engineer
              </span>
            </div>

            {/* Tagline */}
            <p className="hero-tagline text-[#a0a0b0] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              I don't just test software — I think like users, challenge assumptions, 
              and protect product quality through automation, empathy, and engineering mindset.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <GlowButton href="#about" variant="primary" size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Explore My Work
              </GlowButton>
              <GlowButton href="#contact" variant="outline" size="lg">
                Get In Touch
              </GlowButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a
                href="https://github.com/Roshan2059"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group relative p-3 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#00f0ff]/50 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-[#a0a0b0] group-hover:text-[#00f0ff] transition-colors" />
                <span className="absolute inset-0 rounded-lg bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/roshan-panta-b87a93244/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group relative p-3 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#00f0ff]/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-[#a0a0b0] group-hover:text-[#00f0ff] transition-colors" />
                <span className="absolute inset-0 rounded-lg bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:roshan.panta.it@gmail.com"
                className="hero-social group relative p-3 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#00f0ff]/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-[#a0a0b0] group-hover:text-[#00f0ff] transition-colors" />
                <span className="absolute inset-0 rounded-lg bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="hero-image relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7000ff] blur-2xl opacity-30 animate-pulse" />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-[#00f0ff]/30 float">
                {/* Scan Line Effect */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-scan opacity-50" />
                </div>
                
                <img
                  src="public/profile.jpg"
                  alt="Roshan Panta"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/50 to-transparent" />
              </div>

              {/* Status Indicator */}
              <div className="hero-status absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a2e] border border-[#2a2a3e]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff9d] animate-pulse-glow" />
                <span className="text-xs text-[#a0a0b0] font-mono">Available</span>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -left-4 px-3 py-1.5 rounded-lg glass text-xs font-mono text-[#00f0ff] animate-float">
                QA Engineer
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-lg glass text-xs font-mono text-[#00ff9d] animate-float" style={{ animationDelay: '1s' }}>
                Automation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#a0a0b0] hover:text-[#00f0ff] transition-colors group"
      >
        <span className="text-xs font-mono">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-[#00f0ff]" />
      </button>
    </section>
  );
}

export default Hero;
