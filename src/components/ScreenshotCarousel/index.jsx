import React, { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

const ScreenshotCarousel = () => {
  const [preloadedImages, setPreloadedImages] = useState([])
  const swiperRef = useRef(null)

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/screenshots/screenshots.json"
        )
        const data = await response.json()

        const imageUrls = data.map(
          (screenshot) =>
            `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/screenshots/images/${screenshot}.webp`
        )

        const imagePromises = imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => resolve(url)
            img.onerror = reject
          })
        })

        const loadedImages = await Promise.all(imagePromises)
        setPreloadedImages(loadedImages)
      } catch (error) {
        console.error("Error fetching screenshots:", error)
      }
    }
    fetchScreenshots()
  }, [])

  useEffect(() => {
    if (swiperRef.current && preloadedImages.length > 2) {
      swiperRef.current.swiper.slideTo(2)
    }
  }, [preloadedImages])

  return (
    <section id="screenshots" className="scroll-margin py-12 text-center">
      <div className="flex justify-center flex-col items-center">
        <Swiper
          ref={swiperRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          spaceBetween={0}
          slideToClickedSlide={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full max-w-2xl"
        >
          {preloadedImages.map((url, index) => (
            <SwiperSlide key={index} className="relative w-48 h-auto transition-transform">
              <div className="relative">
                <img
                  src={url}
                  alt={`Screenshot ${index + 1}`}
                  className="rounded-lg shadow-lg object-cover transition-all duration-300 swiper-slide-img"
                />
                <div className="absolute inset-0 bg-[#0060ff] opacity-30 mix-blend-lighten transition-opacity duration-300 hidden swiper-slide-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-6"></div>
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
