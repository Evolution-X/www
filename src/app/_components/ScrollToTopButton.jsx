'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

import upIconSvg from '../../assets/icons/upIcon.svg'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsVisible(window.scrollY > 100)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className='fixed bottom-8 right-8 z-[1000] flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#0060ff] p-3 opacity-100 shadow-md transition-opacity duration-300'
      >
        <img src={upIconSvg.src} alt='Scroll to top' width={28} height={28} />
      </div>
    )
  )
}

export default ScrollToTopButton
