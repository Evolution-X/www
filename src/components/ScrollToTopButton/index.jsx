import React, { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return isVisible && (
    <svg
      onClick={scrollToTop}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="ScrollToTopButton"
      height="50"
      width="50"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        cursor: 'pointer',
        zIndex: '1000',
      }}
    >
      <path
        d="M12 22c-1.36665 0 -2.65835 -0.2625 -3.875 -0.7875 -1.21665 -0.525 -2.27915 -1.24165 -3.1875 -2.15 -0.908335 -0.90835 -1.625 -1.97085 -2.15 -3.1875C2.2625 14.65835 2 13.36665 2 12c0 -1.38335 0.2625 -2.68335 0.7875 -3.9 0.525 -1.21665 1.241665 -2.275 2.15 -3.175 0.90835 -0.9 1.97085 -1.6125 3.1875 -2.1375C9.34165 2.2625 10.63335 2 12 2c1.38335 0 2.68335 0.2625 3.9 0.7875 1.21665 0.525 2.275 1.2375 3.175 2.1375 0.9 0.9 1.6125 1.95835 2.1375 3.175C21.7375 9.31665 22 10.61665 22 12c0 1.36665 -0.2625 2.65835 -0.7875 3.875 -0.525 1.21665 -1.2375 2.27915 -2.1375 3.1875 -0.9 0.90835 -1.95835 1.625 -3.175 2.15C14.68335 21.7375 13.38335 22 12 22Z"
        stroke-width="0.5"
        fill="#0060ff"
      />
      <path
        d="M11.25 15.7h1.5v-4.55l1.85 1.85 1.05 -1.05 -3.65 -3.65 -3.65 3.65 1.05 1.05 1.85 -1.85v4.55Z"
        fill="#ffffff"
      />
    </svg>
  )
}

export default ScrollToTopButton
