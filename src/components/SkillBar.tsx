import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: 'cyan' | 'purple' | 'green';
  delay?: number;
  icon?: React.ReactNode;
}

function SkillBar({
  name,
  percentage,
  color = 'cyan',
  delay = 0,
  icon,
}: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const colorClasses = {
    cyan: 'from-[#00f0ff] to-[#00c8d5]',
    purple: 'from-[#7000ff] to-[#9d4edd]',
    green: 'from-[#00ff9d] to-[#00d47a]',
  };

  const glowColors = {
    cyan: 'shadow-[0_0_15px_rgba(0,240,255,0.5)]',
    purple: 'shadow-[0_0_15px_rgba(112,0,255,0.5)]',
    green: 'shadow-[0_0_15px_rgba(0,255,157,0.5)]',
  };

  useEffect(() => {
    if (!barRef.current || !progressRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: barRef.current,
      start: 'top 85%',
      onEnter: () => {
        setIsVisible(true);
        gsap.fromTo(
          progressRef.current,
          { width: '0%' },
          {
            width: `${percentage}%`,
            duration: 1.2,
            delay,
            ease: 'power2.out',
          }
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [percentage, delay]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#a0a0b0] group-hover:text-[#00f0ff] transition-colors">{icon}</span>}
          <span className="text-white font-medium text-sm">{name}</span>
        </div>
        <span className="text-[#a0a0b0] text-sm font-mono">
          {isVisible ? percentage : 0}%
        </span>
      </div>
      <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]} ${glowColors[color]} transition-all duration-300`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}

interface CircularSkillProps {
  name: string;
  percentage: number;
  size?: number;
  color?: 'cyan' | 'purple' | 'green';
  delay?: number;
}

export function CircularSkill({
  name,
  percentage,
  size = 120,
  color = 'cyan',
  delay = 0,
}: CircularSkillProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    cyan: '#00f0ff',
    purple: '#7000ff',
    green: '#00ff9d',
  };

  useEffect(() => {
    if (!circleRef.current || !progressRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: circleRef.current,
      start: 'top 85%',
      onEnter: () => {
        setIsVisible(true);
        gsap.fromTo(
          progressRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset,
            duration: 1.5,
            delay,
            ease: 'power2.out',
          }
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [circumference, strokeDashoffset, delay]);

  return (
    <div ref={circleRef} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1a1a2e"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <circle
            ref={progressRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: `drop-shadow(0 0 8px ${colorClasses[color]})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold font-display text-white">
            {isVisible ? percentage : 0}%
          </span>
        </div>
      </div>
      <span className="mt-3 text-white text-sm font-medium text-center">{name}</span>
    </div>
  );
}

export default SkillBar;
