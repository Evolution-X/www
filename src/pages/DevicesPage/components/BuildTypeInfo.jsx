import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const initialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

const BuildTypeInfo = ({ onClose, shouldShow }) => {
  const [isVisible, setIsVisible] = useState(false)
  const localStorageKey = 'hasSeenBuildTypeInfo'

  useEffect(() => {
    const hasSeen = localStorage.getItem(localStorageKey)
    if (shouldShow && !hasSeen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [shouldShow])

  const handleGotIt = () => {
    localStorage.setItem(localStorageKey, 'true')
    setIsVisible(false)
    onClose?.('gotIt')
  }

  if (!isVisible) {
    return null
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={initialVariants}
      transition={{ duration: 0.3 }}
      className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50'
      style={{ pointerEvents: 'auto' }}
      onClick={handleGotIt}
    >
      <div
        className='w-full max-w-xl rounded-2xl border-4 border-dashed border-[#0060ff] bg-[#0f172a] p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col gap-4'>
          <p className='font-[Prod-bold] text-xl text-[#0060ff] lg:text-3xl'>
            Difference between Non-Vanilla and Vanilla
          </p>
          <div className='pl-4'>
            <p className='font-[Prod-bold] text-lg text-[#42a5f5]'>
              Non-Vanilla Build:
            </p>
            <ul className='list-disc pl-4 font-[Prod-light] text-base lg:text-xl'>
              <li>
                <span className='font-[Prod-bold] text-white'>Includes</span> a
                set of essential Google Apps pre-installed, which are{' '}
                <span className='font-[Prod-bold] text-white'>
                  closed-source
                </span>
                .
              </li>
              <li>
                Provides a more out-of-the-box experience if you rely on Google
                services.
              </li>
              <li>More Pixel Experience like.</li>
              <li>Larger size.</li>
            </ul>
            <p className='mt-2 font-[Prod-bold] text-lg text-[#ffca28]'>
              Vanilla Build:
            </p>
            <ul className='list-disc pl-4 font-[Prod-light] text-base lg:text-xl'>
              <li>
                <span className='font-[Prod-bold] text-white'>
                  Doesn't include
                </span>{' '}
                pre-installed Google Apps (like Play Store, etc.). Uses{' '}
                <span className='font-[Prod-bold] text-white'>open-source</span>{' '}
                alternatives for essential apps.
              </li>
              <li>
                Offers a clean slate, allowing you to install only the Google
                Apps you need, or no Google apps at all.
              </li>
              <li>Less Pixel Experience like.</li>
              <li>
                Smaller size and potentially more control over your device and
                privacy.
              </li>
            </ul>
          </div>
          <div className='flex justify-end'>
            <button
              onClick={handleGotIt}
              className='rounded-md bg-[#0060ff] px-4 py-2 text-white hover:bg-[#004bb5]'
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BuildTypeInfo
