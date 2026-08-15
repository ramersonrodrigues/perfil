'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useProjectModal } from '../hooks/useProjectModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    images: string[];
    imageLabels: string[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useProjectModal({ isOpen, onClose });

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-container rounded-2xl border border-border-subtle shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h3 className="text-xl font-semibold text-text-primary">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-elevated text-text-primary flex items-center justify-center hover:bg-primary hover:text-bg-deep transition-colors border border-border-subtle"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Carousel with Custom Arrows */}
        <div className="relative p-5">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: '.modal-swiper-button-next',
              prevEl: '.modal-swiper-button-prev',
            }}
            pagination={{
              clickable: true,
            }}
            className="modal-swiper rounded-xl"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-video relative bg-surface-base rounded-xl overflow-hidden border border-border-subtle">
                  <img
                    src={image}
                    alt={project.imageLabels[index]}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="modal-swiper-button-prev absolute left-7 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm text-text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-bg-deep hover:scale-110 hover:shadow-[0_0_20px_rgba(130,87,229,0.5)] transition-all duration-300 border border-border-subtle z-10 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="modal-swiper-button-next absolute right-7 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm text-text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-bg-deep hover:scale-110 hover:shadow-[0_0_20px_rgba(130,87,229,0.5)] transition-all duration-300 border border-border-subtle z-10 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
