'use client';

import { useState, useEffect } from 'react';

import { heroPhrases } from '../data/heroPhrases';

export function useHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = heroPhrases[currentIndex];
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseDuration = 1800;

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === phrase) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % heroPhrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }
        return phrase.slice(0, prev.length + 1);
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentIndex]);

  return { currentText };
}
