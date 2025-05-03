import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const initialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

const ThermonuclearWarning = ({ onClose }) => {
  const navigate = useNavigate()
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const hasSeenThermo = localStorage.getItem('hasSeenThermonuclearWarning')
    setShouldShow(!hasSeenThermo)
  }, [])

  const handleGoBack = () => {
    navigate('/')
    onClose?.('goBack')
  }

  const handleGotIt = () => {
    localStorage.setItem('hasSeenThermonuclearWarning', 'true')
    setShouldShow(false)
    onClose?.('gotIt')
  }

  if (!shouldShow) {
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
    >
      <div
        className='w-full max-w-xl rounded-2xl border-4 border-dashed border-[#ff5e00] bg-[#0f172a] p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col gap-4'>
          <p className='font-[Prod-bold] text-xl text-[#ff5e00] lg:text-3xl'>
            Before you download and install!
          </p>
          <p className='font-[Prod-light] text-base lg:text-xl'>
            We are not responsible for bricked devices, dead SD cards,
            thermonuclear war, or the current economic crisis. Please do some
            research if you have any concerns about features included in this
            ROM before flashing it! YOU are choosing to make these
            modifications, and if you point your finger at us for messing up
            your device, we will{' '}
            <a
              href='https://null'
              target='_blank'
              rel='noopener noreferrer'
              className='evoxhighlight font-[Prod-bold]'
            >
              laugh
            </a>{' '}
            at you.
          </p>
          <div className='flex justify-end gap-2'>
            <button
              onClick={handleGoBack}
              className='rounded-md bg-[#ff5e00] px-4 py-2 text-white hover:bg-[#b33300]'
            >
              Go Back
            </button>
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

export default ThermonuclearWarning
