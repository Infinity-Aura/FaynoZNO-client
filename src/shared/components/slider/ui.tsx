import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Box } from 'shared/ui/kit';

export const Slider: React.FC<{
  slidesContent: React.ReactElement[];
  onSlideChange?: (args: { page?: number; pageSize?: number }) => void;
  onSwiper?: (args: { page?: number; pageSize?: number }) => void;
  options?: {
    spaceBetween?: number;
    slidesPerView?: number;
    loop?: true;
  };
}> = ({
  slidesContent,
  onSlideChange,
  onSwiper,
  options = { spaceBetween: 50, slidesPerView: 3 },
}) => {
  return (
    <Swiper
      spaceBetween={options.spaceBetween}
      slidesPerView={options.slidesPerView}
      loop={options.loop}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      <Box sx={{ py: 10 }}>
        {slidesContent.map((item) => (
          <SwiperSlide key={item.key}>{item}</SwiperSlide>
        ))}
      </Box>
    </Swiper>
  );
};
