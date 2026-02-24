import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 1800,
  loop = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'done'>('typing');
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex] ?? '';

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    if (phase === 'typing') {
      if (charIndex <= currentWord.length) {
        setDisplayText(currentWord.slice(0, charIndex));
        timeoutRef.current = setTimeout(() => {
          setCharIndex((c) => c + 1);
        }, typingSpeed + Math.random() * 30 - 15);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => {
        if (!loop && wordIndex === words.length - 1) {
          setPhase('done');
        } else {
          setPhase('deleting');
        }
      }, pauseDuration);
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        timeoutRef.current = setTimeout(() => {
          setCharIndex((c) => c - 1);
        }, deletingSpeed);
      } else {
        const nextIndex = (wordIndex + 1) % words.length;
        setWordIndex(nextIndex);
        setCharIndex(0);
        setPhase('typing');
      }
    }

    return clear;
  }, [charIndex, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, loop]);

  const isTyping = phase === 'typing';
  const isDeleting = phase === 'deleting';

  return { displayText, isTyping, isDeleting, phase };
}
