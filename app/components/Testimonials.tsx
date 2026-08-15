'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import TestimonialModal from './TestimonialModal';
import { useTestimonials } from '../hooks/useTestimonials';

export default function Testimonials() {
  const {
    testimonials,
    activeIndex,
    isModalOpen,
    setIsModalOpen,
    handlePrev,
    handleNext,
    handleSlideTo,
    onSwiper,
    onSlideChange,
  } = useTestimonials();

  return (
    <section id="avaliacoes" className="py-20 scroll-mt-24 mb-20">
      <div className="flex items-center justify-between w-full mb-8">
        <h2 className="text-3xl font-bold text-text-primary flex items-center gap-4">
          <span className="w-12 h-px bg-primary-container" />
          Recomendações
        </h2>
      </div>

      <div className="relative w-full px-4 md:px-12">
        <Swiper
          modules={[Autoplay]}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-surface-base p-8 rounded border border-border-subtle hover:border-primary-container transition-colors group h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    src={testimonial.image}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=8257e5&color=fff&size=256`;
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm">
                      <span className="text-primary-container">{testimonial.role}</span>
                      <span className="text-text-secondary"> na {testimonial.company}</span>
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm text-text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-bg-deep hover:scale-110 hover:shadow-[0_0_20px_rgba(130,87,229,0.5)] transition-all duration-300 border border-border-subtle z-10 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-surface-elevated/90 backdrop-blur-sm text-text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-bg-deep hover:scale-110 hover:shadow-[0_0_20px_rgba(130,87,229,0.5)] transition-all duration-300 border border-border-subtle z-10 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideTo(index)}
            aria-label={`Ir para slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-primary-container scale-110'
                : 'bg-surface-elevated hover:bg-primary-container/50'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-container text-text-primary font-bold px-6 py-2 rounded transition-colors hover:bg-inverse-primary"
        >
          Recomendar
        </button>
      </div>

      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
