import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

function TypingText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  showCursor = true,
  onComplete 
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const startTyping = () => {
      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };
      typeChar();
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="inline-block w-[3px] h-[1em] bg-[#00f0ff] ml-1 animate-pulse" />
      )}
    </span>
  );
}

interface DecodingTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function DecodingText({ 
  text, 
  delay = 0, 
  className = '',
  onComplete 
}: DecodingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iteration++;
        
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          onComplete?.();
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
}

export function ScrambleText({ 
  text, 
  className = '',
  scrambleOnHover = true 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length * 2;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 25);
  };

  return (
    <span 
      className={`${className} ${scrambleOnHover ? 'cursor-pointer' : ''}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}

export default TypingText;
