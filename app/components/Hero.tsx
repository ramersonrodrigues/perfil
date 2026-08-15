'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const phrases = [
    'produtos digitais com propósito',
    'sistemas que escalam',
    'experiências que conectam',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentIndex];
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
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
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
  }, [currentText, isDeleting, isPaused, currentIndex, phrases]);

  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center py-20 relative">
      <div className="max-w-3xl relative z-10 px-4 md:px-6">
        <p className="text-sm text-primary font-medium mb-5 tracking-wide">
          Portfólio
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-text-primary leading-snug mb-6">
          <span className="block mb-1">Construo</span>
          <span className="text-primary min-w-[3ch]">{currentText}</span>
          <span className="inline-block w-px h-7 md:h-8 bg-primary ml-1 animate-pulse" />
        </h1>

        <p className="text-base md:text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
          Engenheiro de Software com foco em soluções robustas, interfaces limpas
          e experiências que entregam valor real para produtos e pessoas.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#projetos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-container text-text-primary text-sm font-semibold hover:bg-inverse-primary transition-colors"
          >
            Ver projetos
          </a>
          <a
            href="#home"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border-subtle text-text-primary text-sm font-semibold hover:bg-surface-elevated transition-colors"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  );
}
