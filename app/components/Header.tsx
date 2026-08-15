'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Início', href: '#home' },
  { label: 'Acadêmico', href: '#academico' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Recomendações', href: '#avaliacoes' },
];

const HEADER_HEIGHT = 64;

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [previousSection, setPreviousSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + HEADER_HEIGHT + 80;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.replace('#', '');
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection((prev) => {
            if (prev !== id) {
              setPreviousSection(prev);
            }
            return id;
          });
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        const top = (target as HTMLElement).offsetTop - HEADER_HEIGHT - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="text-lg md:text-xl font-bold text-primary tracking-tight"
        >
          Râmerson Rodrigues
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href="/curriculo.pdf"
            download
            className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold rounded-full bg-primary-container text-text-primary hover:bg-inverse-primary transition-colors"
          >
            Currículo
          </a>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border-subtle">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`relative px-4 py-3 rounded text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-primary" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
