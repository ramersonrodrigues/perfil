'use client';

import { useEffect, useRef, useState } from 'react';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CROP_SIZE = 256;

export default function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [positionStart, setPositionStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCropping) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, isCropping]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setOriginalImage(base64);
        const img = new Image();
        img.onload = () => {
          const imgAspect = img.width / img.height;

          let displayW, displayH;
          if (imgAspect > 1) {
            displayW = CROP_SIZE;
            displayH = displayW / imgAspect;
          } else {
            displayH = CROP_SIZE;
            displayW = displayH * imgAspect;
          }

          setDisplaySize({ width: displayW, height: displayH });
          setScale(1);
          setPosition({ x: (CROP_SIZE - displayW) / 2, y: (CROP_SIZE - displayH) / 2 });
          setIsCropping(true);
        };
        img.src = base64;
      };
      reader.readAsDataURL(file);
    }
  };

  const constrainPosition = (x: number, y: number, currentScale: number) => {
    const scaledW = displaySize.width * currentScale;
    const scaledH = displaySize.height * currentScale;

    const minX = CROP_SIZE - scaledW;
    const maxX = 0;
    const minY = CROP_SIZE - scaledH;
    const maxY = 0;

    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  const handleScaleChange = (newScale: number) => {
    const clampedScale = Math.max(1, Math.min(5, newScale));

    // Ponto central do círculo em coordenadas absolutas
    const centerX = CROP_SIZE / 2;
    const centerY = CROP_SIZE / 2;

    // Ponto que está no centro do círculo na imagem atual
    const imageCenterX = centerX - position.x;
    const imageCenterY = centerY - position.y;

    // Após o zoom, queremos que o mesmo ponto da imagem continue no centro
    const newX = centerX - imageCenterX * (clampedScale / scale);
    const newY = centerY - imageCenterY * (clampedScale / scale);

    const constrained = constrainPosition(newX, newY, clampedScale);

    setScale(clampedScale);
    setPosition(constrained);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPositionStart({ ...position });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const newPos = constrainPosition(positionStart.x + dx, positionStart.y + dy, scale);
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setPositionStart({ ...position });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    const newPos = constrainPosition(positionStart.x + dx, positionStart.y + dy, scale);
    setPosition(newPos);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const generateCroppedAvatar = async () => {
    if (!originalImage || !imageRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = CROP_SIZE;
      canvas.height = CROP_SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(CROP_SIZE / 2, CROP_SIZE / 2, CROP_SIZE / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const scaledW = displaySize.width * scale;
      const scaledH = displaySize.height * scale;

      const sourceW = img.width;
      const sourceH = img.height;

      const scaleRatio = sourceW / scaledW;

      const sourceX = -position.x * scaleRatio;
      const sourceY = -position.y * scaleRatio;
      const sourceSize = CROP_SIZE * scaleRatio;

      ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, CROP_SIZE, CROP_SIZE);

      const croppedBase64 = canvas.toDataURL('image/png');
      setAvatarPreview(croppedBase64);
      setIsCropping(false);
    };
    img.src = originalImage;
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    setOriginalImage(null);
    setIsCropping(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, role, company, message, avatar, avatarPreview });
    onClose();
  };

  const handleCloseCrop = () => {
    setIsCropping(false);
    if (!avatarPreview) {
      setAvatar(null);
      setOriginalImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {originalImage && (
                <img
                  ref={imageRef}
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
