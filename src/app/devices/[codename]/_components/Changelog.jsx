'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import menuCloseSvg from '../../../../assets/icons/menuClose.svg'

const initialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

const Changelog = ({ initialChangelog, changelogError }) => {
  const [showChangelog, setShowChangelog] = useState(false)

  const toggleChangelog = useCallback(() => {
    setShowChangelog((prev) => !prev)
  }, [])

  useEffect(() => {
    if (showChangelog) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showChangelog])

  return (
    <>
      <button
        onClick={toggleChangelog}
        className='h-16 w-full rounded-full bg-[#0060ff] px-4 text-2xl text-white hover:bg-[#004bb5]'
        disabled={
          !initialChangelog &&
          changelogError?.message === 'No changelog available for this branch.'
        }
      >
        Changelog
      </button>

      <AnimatePresence>
        {showChangelog && (
          <motion.div
            className='fixed inset-0 z-50 flex flex-col bg-black/50 py-[6rem] md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]'
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowChangelog(false)
              }
            }}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={initialVariants}
            transition={{ duration: 0.3 }}
          >
            <div className='relative mx-[2rem] min-h-0 grow rounded-3xl border-4 border-dashed border-[#0060ff] bg-[#0f172a]'>
              <span
                onClick={toggleChangelog}
                className='absolute right-[-1rem] top-[-1rem] z-50 cursor-pointer rounded-full border-4 border-[#0060ff] bg-[#0060ff] p-2'
              >
                <img src={menuCloseSvg.src} alt='close' className='size-6' />
              </span>
              <div className='h-full overflow-y-scroll px-10 pt-5 lg:pt-[1rem]'>
                {changelogError ? (
                  <p className='text-red-500'>
                    Error fetching changelog:{' '}
                    {changelogError.message || 'Unknown error'}
                  </p>
                ) : initialChangelog ? (
                  <pre className='text-wrap text-[0.9rem] text-white xl:text-lg'>
                    {initialChangelog}
                  </pre>
                ) : (
                  <p className='text-white'>
                    No changelog available for this device and branch.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Changelog
