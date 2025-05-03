import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UpIcon } from '../assets/icons/icons.tsx'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className='fixed bottom-8 right-8 z-[1000] cursor-pointer rounded-full bg-[#0060ff] p-3 opacity-100 shadow-md transition-opacity duration-300'
      >
        <UpIcon width={28} height={28} fill='#ffffff' />
      </div>
    )
  )
}

export default ScrollToTopButton
