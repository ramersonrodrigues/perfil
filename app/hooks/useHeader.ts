'use client';

import { useState, useEffect } from 'react';
import { navItems } from '../data/navItems';

const HEADER_HEIGHT = 64;

export function useHeader() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + HEADER_HEIGHT + 80;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.replace('#', '');
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(id);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return {
    navItems,
    activeSection,
    isMobileMenuOpen,
    handleClick,
    toggleMobileMenu,
  };
}
