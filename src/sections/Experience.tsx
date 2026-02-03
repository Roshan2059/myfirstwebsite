import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Building2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.exp-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.exp-header',
            start: 'top 85%',
          },
        }
      );

      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
          },
        }
      );

      // Experience cards animation
      gsap.fromTo(
        '.exp-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
          },
        }
      );

      // Timeline nodes animation
      gsap.fromTo(
        '.timeline-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      role: 'Associate Software QA Engineer',
      company: 'Hamro Patro',
      location: 'Nepal',
      period: 'June 2025 – Present',
      type: 'Full-time',
      description: 'Leading quality assurance efforts for Nepal\'s most popular digital platform serving millions of users daily.',
      responsibilities: [
        'Perform functional, regression, and smoke testing for web and mobile applications',
        'Collaborate with developers in agile sprints to ensure timely delivery',
        'Write and execute comprehensive test cases covering edge cases',
        'Validate user stories and acceptance criteria',
        'Implement automated test scripts using Playwright',
        'Conduct API testing using Postman and REST Assured',
        'Participate in daily standups and sprint planning meetings',
      ],
      skills: ['Playwright', 'Postman', 'Agile', 'Regression Testing', 'API Testing'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="exp-header text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#00f0ff] text-sm font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            Journey
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-[#a0a0b0] max-w-2xl mx-auto">
            My career path in quality assurance and software testing
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1">
            <div
              ref={lineRef}
              className="w-full h-full rounded-full origin-top"
              style={{
                background: 'linear-gradient(180deg, #00f0ff 0%, #7000ff 100%)',
              }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline Node */}
                <div className="timeline-node absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00f0ff] border-4 border-[#05050a] z-10 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />

                {/* Card */}
                <div className={`exp-card ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                  <div className="glass rounded-2xl p-6 lg:p-8 border-gradient group hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-5 h-5 text-[#00f0ff]" />
                          <span className="text-[#00f0ff] text-sm font-mono">{exp.type}</span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold font-display text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-[#a0a0b0]">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1 text-sm text-[#a0a0b0]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#a0a0b0] mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00ff9d]" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li
                            key={respIndex}
                            className="flex items-start gap-2 text-sm text-[#a0a0b0]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-2 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education / Certification Hint */}
        <div className="mt-16 text-center">
          <p className="text-[#a0a0b0] text-sm">
            Continuously learning and expanding my expertise in quality assurance
          </p>
        </div>
      </div>
    </section>
  );
}

export default Experience;
