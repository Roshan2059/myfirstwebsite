import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.round(obj.value));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration, delay]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  delay?: number;
}

export function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  delay = 0,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl p-6 text-center card-lift group"
    >
      <div className="text-4xl md:text-5xl font-bold font-display gradient-text mb-2">
        <AnimatedCounter
          end={value}
          suffix={suffix}
          prefix={prefix}
          delay={delay}
        />
      </div>
      <div className="text-white font-medium mb-1">{label}</div>
      {description && (
        <div className="text-sm text-[#a0a0b0]">{description}</div>
      )}
    </div>
  );
}

export default AnimatedCounter;
