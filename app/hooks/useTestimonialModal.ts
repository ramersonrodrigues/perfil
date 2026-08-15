'use client';

import { useEffect, useRef, useState } from 'react';

const CROP_SIZE = 256;

export function useTestimonialModal(isOpen: boolean, onClose: () => void) {
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

    const centerX = CROP_SIZE / 2;
    const centerY = CROP_SIZE / 2;

    const imageCenterX = centerX - position.x;
    const imageCenterY = centerY - position.y;

    const newX = centerX - imageCenterX * (clampedScale / scale);
    const newY = centerY - imageCenterY * (clampedScale / scale);

    const constrained = constrainPosition(newX, newY, clampedScale);

    setScale(clampedScale);
    setPosition(constrained);
  };

  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setPositionStart({ ...position });
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    const newPos = constrainPosition(positionStart.x + dx, positionStart.y + dy, scale);
    setPosition(newPos);
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const generateCroppedAvatar = () => {
    if (!originalImage) return;

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

      const scaleRatio = img.width / scaledW;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, role, company, message, avatar, avatarPreview });
    onClose();
  };

  const reset = () => {
    setName('');
    setRole('');
    setCompany('');
    setMessage('');
    setAvatar(null);
    setAvatarPreview(null);
    setOriginalImage(null);
    setIsCropping(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return {
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
  };
}
