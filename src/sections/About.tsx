import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, Lightbulb, Shield } from 'lucide-react';
import { StatCard } from '../components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 85%',
          },
        }
      );

      // Paragraph animations
      gsap.fromTo(
        '.about-para',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
          },
        }
      );

      // Feature cards animation
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 5,
      rotateX: -y * 5,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Precision Testing',
      description: 'Meticulous attention to detail in every test case',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'User-Centric',
      description: 'Thinking like users to improve experience',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'Feature Advocacy',
      description: 'Recommending improvements beyond bugs',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Quality Guardian',
      description: 'Protecting product quality at every stage',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#00f0ff] text-sm font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            About Me
          </span>
          <h2 className="about-heading text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
            The <span className="gradient-text">Mindset</span> Behind the Code
          </h2>
        </div>

        {/* Main Content Card */}
        <div
          ref={cardRef}
          className="glass-strong rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto mb-16"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="about-content space-y-6">
            <p className="about-para text-lg sm:text-xl text-white leading-relaxed">
              I'm a QA Engineer who believes <span className="text-[#00f0ff] font-medium">quality is everyone's responsibility</span> — but I take it personally.
            </p>
            
            <p className="about-para text-[#a0a0b0] leading-relaxed">
              At <span className="text-white font-medium">Hamro Patro</span>, I work closely with developers, product managers, and designers to ensure every release meets high standards of functionality, usability, and performance.
            </p>
            
            <p className="about-para text-[#a0a0b0] leading-relaxed">
              My approach combines technical testing skills with user empathy. I don't just look for bugs — I look for ways to make the product better. From exploratory testing to automation frameworks, I bring a holistic view to quality assurance.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-3 -right-3 w-20 h-20 border border-[#00f0ff]/20 rounded-lg" />
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-[#7000ff]/20 rounded-lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          <StatCard
            value={2}
            suffix="+"
            label="Years Experience"
            description="In Software QA"
            delay={0}
          />
          <StatCard
            value={50}
            suffix="+"
            label="Projects Tested"
            description="Across multiple domains"
            delay={0.1}
          />
          <StatCard
            value={1000}
            suffix="+"
            label="Bugs Caught"
            description="And resolved"
            delay={0.2}
          />
          <StatCard
            value={99}
            suffix="%"
            label="Test Coverage"
            description="Average per project"
            delay={0.3}
          />
        </div>

        {/* Features Grid */}
        <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group p-6 rounded-xl bg-[#1a1a2e]/50 border border-[#2a2a3e] hover:border-[#00f0ff]/30 transition-all duration-300 card-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] mb-4 group-hover:bg-[#00f0ff]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-white font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-[#a0a0b0]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
