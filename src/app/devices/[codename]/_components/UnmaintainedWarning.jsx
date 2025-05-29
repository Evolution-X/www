'use client'

import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

const UnmaintainedWarning = ({ onClose, onAcknowledge, buildInfo }) => {
  const handleAcknowledge = () => {
    if (buildInfo) {
      const buildIdentifier = `${buildInfo.codename}-${buildInfo.version}-${buildInfo.build}`
      const stored = localStorage.getItem('acknowledgedUnmaintained')
      const acknowledged = stored ? JSON.parse(stored) : {}
      acknowledged[buildIdentifier] = true
      localStorage.setItem(
        'acknowledgedUnmaintained',
        JSON.stringify(acknowledged)
      )
    }

    onAcknowledge?.()
    onClose()
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variants}
      transition={{ duration: 0.3 }}
      className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50'
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className='w-full max-w-xl rounded-2xl border-4 border-dashed border-red-700 bg-[#0f172a] p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-productsans text-xl font-bold text-red-700 lg:text-3xl'>
                This version ({buildInfo?.codename} - {buildInfo?.version}) is
                no longer maintained!
              </p>
              <p className='font-productsans text-base font-light lg:text-2xl'>
                You may not receive future updates or bug fixes while on this
                version of the ROM. We recommend using a version that is
                currently{' '}
                <span className='evoxhighlight font-productsans font-bold'>
                  maintained
                </span>{' '}
                for continued support.
              </p>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              onClick={onClose}
              className='rounded-md bg-[#0060ff] px-4 py-2 text-white hover:bg-[#004bb5]'
            >
              Go Back
            </button>
            <button
              onClick={handleAcknowledge}
              className='rounded-md bg-red-700 px-4 py-2 text-white hover:bg-red-800'
            >
              Got it! Proceed
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default UnmaintainedWarning
