'use client';

import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { testimonials } from '../data/testimonials';

export function useTestimonials() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  const onSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const onSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return {
    testimonials,
    activeIndex,
    isModalOpen,
    setIsModalOpen,
    handlePrev,
    handleNext,
    handleSlideTo,
    onSwiper,
    onSlideChange,
  };
}
