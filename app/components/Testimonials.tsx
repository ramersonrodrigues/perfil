'use client';

import { useRef, useState } from 'react';
import TestimonialModal from './TestimonialModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testimonials = [
    {
      name: 'Carlos Almeida',
      role: 'Product Manager',
      company: 'RocketApps',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC08QlDEaUjM-7TWzh_piSrRSRgR1HB7DuqIO_PLRYQfnSVK2MR3fm6mj4yg6NKFoyQbmJ6Y1rOrmockC-DE7zBl1SLXuQ_n9CUXYt2HPhqO5LcKK6tcoSTnVEOoI620rRrY0vkfEIEqa5lvzQvp_Efjj2wsTgqzq2BJijaGKRuC7dqnxCJCu3Qm31DYCJ0eX1fXZg8IjsD-LAOUWbxePeBX6L4cIacaJnv89Nyuy0laLjHCEfGcsU',
      text: 'Um profissional excepcional! A dedicação e a qualidade técnica entregues superaram todas as expectativas da nossa equipe.',
    },
    {
      name: 'Fernanda Lima',
      role: 'Software Engineer',
      company: 'Cloudify',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbLI-6ksd3r2ScRv57eGGvNxg6xdit74wP6BLjxmAtR9C_gz7-WvYiCPLkoIb73gNsyj-lGju2DPYzzdxPpLf-2yHKEusB4TSnkT5EmCy1x7rgLpzyM9CxHHXvKXTnwkMybXx-PW6qORJKlzlb-Yi8Bqe0uObS5DgDhcDHoMPV0QndaiyiISGMQMKXm7CUrEQ4MyBfXBT6NJwMgtSp68zRpNIwKumuzcg1GfZYs8mPO_TLNF5_rsY',
      text: 'Sempre inovador e atento aos detalhes. O código é limpo, documentado e extremamente eficiente. Recomendo de olhos fechados.',
    },
    {
      name: 'Ricardo Santos',
      role: 'CTO',
      company: 'DataPulse',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgGmkgAX8TAk4rz8s6PuTUbHzOHJ0Y2WggUjMJQZIq6WiU0M42lH4Ezb6da2K70gE1MCAa_QNeY0-IkIeSUIyUk59eCgmmuhPiOgcpCiwzlyeZYLpcUk_kJLJdx75vJNHyb0iNfyiDe0ELBL715uwuWnMVJNHoaW1pioMLjz-T2GDRKwajeOpkGUUkXW4Q2o2Nu9WxaXulmkYXzGriF-qnI8bkQcr6XLB2dcjS10TTTW3AjC-QnP8',
      text: 'Liderança técnica formidável! Conduziu projetos complexos com maestria, garantindo entregas pontuais e com alto padrão de qualidade.',
    },
    {
      name: 'Ana Paula Costa',
      role: 'UX Lead',
      company: 'DesignFlow',
      image: 'https://api.dicebear.com/10.x/lorelei/svg?seed=Ana+Paula+Costa',
      text: 'Excelente capacidade de traduzir necessidades de usuários em interfaces elegantes e funcionais. Sua atenção aos detalhes de UX faz toda a diferença nos projetos.',
    },
    {
      name: 'Marcos Oliveira',
      role: 'Tech Lead',
      company: 'InnovateTech',
      image: 'https://api.dicebear.com/10.x/lorelei/svg?seed=Marcos+Oliveira',
      text: 'Profissional versátil com domínio técnico impressionante. Sempre entrega soluções escaláveis e bem arquitetadas, além de ser um ótimo mentor para o time.',
    },
  ];

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
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
                <p className="text-text-secondary italic">"{testimonial.text}"</p>
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
            onClick={() => swiperRef.current?.slideTo(index)}
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
