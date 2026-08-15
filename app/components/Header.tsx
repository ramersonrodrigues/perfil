'use client';

import { useHeader } from '../hooks/useHeader';

export default function Header() {
  const { navItems, activeSection, isMobileMenuOpen, handleClick, toggleMobileMenu } = useHeader();

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
          onClick={toggleMobileMenu}
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
