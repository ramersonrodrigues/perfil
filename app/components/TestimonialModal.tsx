'use client';

import { useTestimonialModal } from '../hooks/useTestimonialModal';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const {
    name,
    setName,
    role,
    setRole,
    company,
    setCompany,
    message,
    setMessage,
    avatarPreview,
    originalImage,
    displaySize,
    position,
    scale,
    isCropping,
    fileInputRef,
    handleAvatarChange,
    handleScaleChange,
    startDrag,
    moveDrag,
    endDrag,
    generateCroppedAvatar,
    handleRemoveAvatar,
    handleCloseCrop,
    handleSubmit,
  } = useTestimonialModal(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/90 backdrop-blur-md"
      onClick={isCropping ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-md bg-surface-container rounded-2xl border border-border-subtle shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h3 className="text-xl font-semibold text-text-primary">
            {isCropping ? 'Ajustar foto' : 'Deixar recomendação'}
          </h3>
          <button
            onClick={isCropping ? handleCloseCrop : onClose}
            className="w-10 h-10 rounded-full bg-surface-elevated text-text-primary flex items-center justify-center hover:bg-primary hover:text-bg-deep transition-colors border border-border-subtle"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isCropping ? (
          <div className="p-5 flex flex-col items-center gap-4">
            <p className="text-sm text-text-secondary text-center">
              Arraste e ajuste o zoom para posicionar o rosto
            </p>
            <div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg cursor-grab active:cursor-grabbing bg-surface-base"
              onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
              onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={endDrag}
            >
              {originalImage && (
                <img
                  src={originalImage}
                  alt="Ajustar imagem"
                  draggable={false}
                  className="absolute select-none pointer-events-none object-contain"
                  style={{
                    left: position.x,
                    top: position.y,
                    width: displaySize.width * scale,
                    height: displaySize.height * scale,
                  }}
                />
              )}
            </div>

            {/* Zoom controls */}
            <div className="w-full max-w-[16rem] flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleScaleChange(scale - 0.2)}
                disabled={scale <= 1}
                className="w-9 h-9 rounded-full bg-surface-elevated text-text-primary flex items-center justify-center border border-border-subtle hover:bg-primary hover:text-bg-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Diminuir zoom"
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
              <input
                type="range"
                min="1"
                max="5"
                step="0.05"
                value={scale}
                onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <button
                type="button"
                onClick={() => handleScaleChange(scale + 0.2)}
                disabled={scale >= 5}
                className="w-9 h-9 rounded-full bg-surface-elevated text-text-primary flex items-center justify-center border border-border-subtle hover:bg-primary hover:text-bg-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Aumentar zoom"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>

            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleCloseCrop}
                className="flex-1 px-5 py-2.5 rounded-lg bg-surface-elevated text-text-primary text-sm font-medium border border-border-subtle hover:bg-primary hover:text-bg-deep transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={generateCroppedAvatar}
                className="flex-1 px-5 py-2.5 rounded-lg bg-primary-container text-text-primary text-sm font-semibold hover:bg-inverse-primary transition-colors"
              >
                Cortar e usar
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <span className="block text-sm font-medium text-text-primary mb-1.5">
                Foto de perfil
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border-subtle bg-surface-base flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Preview do avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-text-secondary text-2xl">
                      person
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-surface-elevated text-text-primary text-sm font-medium border border-border-subtle hover:bg-primary hover:text-bg-deep transition-colors"
                  >
                    Escolher foto
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-4 py-2 rounded-lg text-text-secondary text-sm font-medium hover:text-primary transition-colors"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome completo"
                className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1.5">
                  Cargo
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  placeholder="Ex: Product Manager"
                  className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-1.5">
                  Empresa
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  placeholder="Ex: RocketApps"
                  className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                Mensagem
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Escreva sua recomendação..."
                className="w-full px-4 py-2.5 bg-surface-base border border-border-subtle rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary-container text-text-primary font-semibold hover:bg-inverse-primary transition-colors"
              >
                Enviar recomendação
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
