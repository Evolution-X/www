'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import shareSvg from '../../assets/icons/share.svg'

const ShareButton = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname) {
      setCurrentUrl(`${window.location.origin}${pathname}`)
    }
  }, [pathname])

  const copyTextToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleCopyClick = () => {
    if (currentUrl) {
      copyTextToClipboard(currentUrl)
        .then(() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 1500)
        })
        .catch((err) => {
          console.error('Error copying URL:', err)
        })
    } else {
      console.warn('Current URL not available to copy.')
    }
  }

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.75 }}
      className='relative cursor-pointer'
      onClick={handleCopyClick}
    >
      <img src={shareSvg.src} className='size-7' alt='share' />
      <span
        className={`absolute -right-2 top-0 rounded-full bg-[#0060ff] px-2 py-1 text-white duration-200 ${
          isCopied ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Copied!
      </span>
    </motion.div>
  )
}

export default ShareButton
