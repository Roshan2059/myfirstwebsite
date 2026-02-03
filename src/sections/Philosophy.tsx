import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  Route, 
  AlertTriangle, 
  Layers, 
  Search, 
  GitMerge,
  Terminal,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTerm, setHoveredTerm] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.philosophy-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-header',
            start: 'top 85%',
          },
        }
      );

      // Term cards animation
      gsap.fromTo(
        '.term-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.terms-grid',
            start: 'top 80%',
          },
        }
      );

      // Quote animation
      gsap.fromTo(
        '.philosophy-quote',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.philosophy-quote',
            start: 'top 85%',
          },
        }
      );

      // Background code scroll
      gsap.to('.bg-code', {
        y: -100,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const qaTerms = [
    {
      term: 'Shift-Left Testing',
      icon: <ArrowRight className="w-5 h-5" />,
      description: 'Integrating testing early in the development lifecycle to catch defects sooner and reduce fix costs.',
      color: '#00f0ff',
    },
    {
      term: 'User Journey Validation',
      icon: <Route className="w-5 h-5" />,
      description: 'Testing complete user workflows to ensure seamless experiences across all touchpoints.',
      color: '#7000ff',
    },
    {
      term: 'Risk-Based Testing',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Prioritizing test efforts based on business impact and probability of failure.',
      color: '#00ff9d',
    },
    {
      term: 'Automation Pyramid',
      icon: <Layers className="w-5 h-5" />,
      description: 'Strategic balance of unit, integration, and E2E tests for optimal coverage.',
      color: '#00f0ff',
    },
    {
      term: 'Exploratory Testing',
      icon: <Search className="w-5 h-5" />,
      description: 'Simultaneous learning, test design, and execution to uncover unexpected issues.',
      color: '#7000ff',
    },
    {
      term: 'CI/CD Testing',
      icon: <GitMerge className="w-5 h-5" />,
      description: 'Automated quality gates integrated into the continuous integration pipeline.',
      color: '#00ff9d',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Code Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="bg-code absolute inset-0 font-mono text-[#00f0ff] text-xs leading-relaxed whitespace-pre">
{`describe('Quality Assurance', () => {
  it('should prevent bugs before production', () => {
    const test = new TestStrategy();
    test.implementShiftLeft();
    expect(bugsInProduction).toBe(0);
  });

  it('should validate user journeys', () => {
    const journey = new UserFlow();
    journey.navigateThroughApp();
    expect(journey.errors).toBeEmpty();
  });

  it('should automate repetitive tests', () => {
    const automation = new TestAutomation();
    automation.runRegressionSuite();
    expect(automation.coverage).toBeGreaterThan(90);
  });
});

// Risk-Based Testing Strategy
const riskMatrix = {
  high: ['payment', 'authentication'],
  medium: ['search', 'filtering'],
  low: ['styling', 'animations']
};

// CI/CD Pipeline Integration
pipeline {
  stage('Unit Tests') { sh 'npm test' }
  stage('Integration') { sh 'npm run test:integration' }
  stage('E2E Tests') { sh 'npm run test:e2e' }
  stage('Deploy') { sh 'deploy to production' }
}`}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="philosophy-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#00f0ff] text-sm font-mono mb-4">
            <Terminal className="w-4 h-4" />
            QA Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
            My <span className="gradient-text">Approach</span> to Quality
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            Principles and methodologies that guide my quality assurance practice
          </p>
        </div>

        {/* Quote */}
        <div className="philosophy-quote glass-strong rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto mb-16 text-center">
          <div className="text-6xl text-[#00f0ff]/20 font-serif mb-4">"</div>
          <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-6">
            I believe in <span className="text-[#00f0ff]">preventing bugs</span>, not just finding them. 
            My approach integrates quality from the first line of code to the final user click.
          </blockquote>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00ff9d]" />
            <span className="text-[#a0a0b0] text-sm">Quality First Mindset</span>
          </div>
        </div>

        {/* QA Terms Grid */}
        <div className="terms-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qaTerms.map((item, index) => (
            <div
              key={index}
              className="term-card group relative p-6 rounded-xl bg-[#0a0a14] border border-[#1a1a2e] hover:border-[#00f0ff]/30 transition-all duration-300 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredTerm(index)}
              onMouseLeave={() => setHoveredTerm(null)}
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${item.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <h3 className="text-white font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {item.term}
                </h3>

                <p
                  className={`text-sm text-[#a0a0b0] leading-relaxed transition-all duration-300 ${
                    hoveredTerm === index ? 'opacity-100 max-h-20' : 'opacity-70 max-h-0 overflow-hidden md:opacity-70 md:max-h-20'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Terminal-style decoration */}
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#a0a0b0]/30">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 text-center">
          <p className="text-[#a0a0b0] text-sm max-w-xl mx-auto">
            Every testing decision is driven by a commitment to delivering exceptional user experiences 
            and maintaining the highest standards of software quality.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
