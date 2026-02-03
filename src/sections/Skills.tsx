import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  TestTube, 
  Zap, 
  Shield, 
  Users, 
  MessageSquare, 
  GitBranch,
  Workflow,
  Brain,
  Eye
} from 'lucide-react';
import SkillBar from '../components/SkillBar';
import { CircularSkill } from '../components/SkillBar';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.skills-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-header',
            start: 'top 85%',
          },
        }
      );

      // Category cards animation
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );

      // Circular skills animation
      gsap.fromTo(
        '.circular-skill',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.circular-skills',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technicalSkills = [
    { name: 'Playwright (JavaScript)', percentage: 90, color: 'cyan' as const, icon: <Code2 className="w-4 h-4" /> },
    { name: 'Selenium (Java)', percentage: 85, color: 'cyan' as const, icon: <Code2 className="w-4 h-4" /> },
    { name: 'API Testing (Postman)', percentage: 95, color: 'purple' as const, icon: <TestTube className="w-4 h-4" /> },
    { name: 'Performance Testing (JMeter)', percentage: 80, color: 'purple' as const, icon: <Zap className="w-4 h-4" /> },
    { name: 'Security Testing (Burp Suite)', percentage: 75, color: 'green' as const, icon: <Shield className="w-4 h-4" /> },
  ];

  const professionalSkills = [
    { name: 'User-Empathetic Testing', percentage: 95, color: 'cyan' as const, icon: <Users className="w-4 h-4" /> },
    { name: 'Exploratory Testing', percentage: 90, color: 'purple' as const, icon: <Eye className="w-4 h-4" /> },
    { name: 'Feature Recommendation', percentage: 85, color: 'green' as const, icon: <Brain className="w-4 h-4" /> },
    { name: 'Communication', percentage: 90, color: 'cyan' as const, icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Agile/Scrum', percentage: 85, color: 'purple' as const, icon: <Workflow className="w-4 h-4" /> },
    { name: 'Team Collaboration', percentage: 88, color: 'green' as const, icon: <GitBranch className="w-4 h-4" /> },
  ];

  const keyCompetencies = [
    { name: 'Test Automation', percentage: 88, color: 'cyan' as const },
    { name: 'Manual Testing', percentage: 92, color: 'purple' as const },
    { name: 'Bug Analysis', percentage: 90, color: 'green' as const },
    { name: 'Test Strategy', percentage: 85, color: 'cyan' as const },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="skills-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#00f0ff] text-sm font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
            Skills & <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            My technical toolkit and professional capabilities that drive quality assurance excellence
          </p>
        </div>

        {/* Key Competencies - Circular Skills */}
        <div className="circular-skills grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-3xl mx-auto">
          {keyCompetencies.map((skill, index) => (
            <div key={index} className="circular-skill flex justify-center">
              <CircularSkill
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="skill-category glass rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Technical Skills</h3>
                <p className="text-sm text-[#a0a0b0]">Automation & Testing Tools</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {technicalSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                  delay={index * 0.1}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <div className="skill-category glass rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7000ff]/20 to-[#7000ff]/5 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#7000ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Professional Skills</h3>
                <p className="text-sm text-[#a0a0b0]">Soft Skills & Methodologies</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {professionalSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                  delay={index * 0.1}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            'STLC',
            'SDLC',
            'Test Strategy',
            'Regression Suite',
            'Smoke Tests',
            'Bug Lifecycle',
            'Severity vs Priority',
            'Risk-Based Testing',
            'Automation Pyramid',
            'CI/CD Testing',
            'Shift-Left Testing',
            'User Journey Validation',
          ].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#a0a0b0] text-sm font-mono hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
