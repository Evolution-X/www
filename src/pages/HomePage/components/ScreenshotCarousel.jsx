import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import useScreenshots from '../hooks/useScreenshots'

const ScreenshotCarousel = () => {
  const { screenshotUrls, isLoading, error } = useScreenshots()
  const swiperRef = useRef(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading && screenshotUrls) {
      setIsDataLoaded(true)
      if (swiperRef.current && screenshotUrls.length > 2) {
        swiperRef.current.swiper.slideTo(2)
      }
    }
  }, [isLoading, screenshotUrls, swiperRef])

  if (isLoading) {
    return (
      <section id='screenshots' className='scroll-margin py-12 text-center'>
        <p>Loading screenshots...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section id='screenshots' className='scroll-margin py-12 text-center'>
        <p className='text-red-500'>Error loading screenshots.</p>
      </section>
    )
  }

  if (!isDataLoaded || screenshotUrls.length === 0) {
    return null
  }

  return (
    <section id='screenshots' className='scroll-margin py-12 text-center'>
      <div className='flex flex-col items-center justify-center'>
        <Swiper
          ref={swiperRef}
          effect='coverflow'
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true
          }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          modules={[EffectCoverflow, Pagination]}
          className='w-full max-w-2xl'
        >
          {screenshotUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className='relative h-auto w-48 transition-transform'
            >
              <div className='relative'>
                <img
                  src={url}
                  alt={`Screenshot ${index + 1}`}
                  className='swiper-slide-img rounded-lg object-cover shadow-lg transition-all duration-300'
                />
                <div className='swiper-slide-overlay absolute inset-0 hidden bg-[#0060ff] opacity-30 mix-blend-lighten transition-opacity duration-300'></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='custom-pagination mt-6'></div>
      </div>

      <style>
        {`
          .swiper-slide {
            transform-origin: center center;
            transition: transform 0.4s ease;
          }

          .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.65);
            z-index: 0;
          }

          .swiper-slide-active {
            transform: scale(1);
            z-index: 10;
          }

          .swiper-slide:not(.swiper-slide-active) .swiper-slide-img {
            filter: brightness(0.7) blur(0.5px);
          }

          .swiper-slide:not(.swiper-slide-active) .swiper-slide-overlay {
            display: block;
            border-radius: 12px;
          }

          .custom-pagination .swiper-pagination-bullet {
            background: #0060ff !important;
            width: 12px;
            height: 12px;
            margin: 0 5px;
            opacity: 0.6;
          }

          .custom-pagination .swiper-pagination-bullet-active {
            opacity: 1;
          }
        `}
      </style>
    </section>
  )
}

export default ScreenshotCarousel
