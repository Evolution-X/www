import React, { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules"
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
            `https://github.com/Evolution-X/www_gitres/blob/main/screenshots/${screenshot}.png?raw=true`
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
    if (swiperRef.current && preloadedImages.length > 0) {
      const swiperInstance = swiperRef.current.swiper

      swiperInstance.slideTo(3)
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
          slidesPerView={3}
          loop={true}
          initialSlide={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: true,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="w-full max-w-5xl"
        >
          {preloadedImages.map((url, index) => (
            <SwiperSlide key={index} className="relative w-72 h-auto">
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
          .swiper-slide:not(.swiper-slide-active) .swiper-slide-img {
            border-radius: 12px;
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
