import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Constants from '../../../constants'
import evolution from '../../../assets/icons/evolution.svg'

const DeviceCard = ({ device }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <div className='relative flex h-[32rem] w-[23rem] flex-col justify-between rounded-2xl border-2 border-[#0060ff] bg-[#0f172a] pb-6 shadow-[0px_0px_38.5px_14px_#0060ff20] duration-100 ease-in hover:scale-105 hover:shadow-[0px_0px_38.5px_18px_#0060ff50]'>
        <div className='flex flex-col items-center px-6 pt-6 text-center'>
          <img
            className='my-4 size-48 object-contain'
            src={device.imageUrl}
            alt={`${device.device}`}
          />
          {device.supportsLatest && (
            <motion.img
              src={Constants.LATEST_VERSION}
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 0.9, rotate: 5 }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 0.7,
                type: 'spring',
                damping: 5,
                stiffness: 30
              }}
              viewport={{ once: true }}
              className='absolute right-[-20px] top-[-30px] sm:right-[-30px]'
            />
          )}

          <div className='mt-4 flex flex-grow flex-col gap-2'>
            <p className='evoxhighlight text-xl lg:text-2xl'>
              <span className='ml-2 inline-flex items-center justify-center rounded-3xl bg-[#040214] px-3 py-1 text-base'>
                <span className='bg-gradient-to-r from-indigo-100 to-[#0060ff] bg-clip-text text-transparent'>
                  {device.codename}
                </span>
              </span>
            </p>

            <p className='whitespace-normal break-words font-[Prod-Medium] text-2xl text-white'>
              {device.oem} {device.device}
            </p>
          </div>
        </div>

        <div className='mt-auto px-6'>
          <Link
            to={`/devices/${device.codename}`}
            className='inline-flex h-14 w-full items-center justify-center rounded-full bg-[#0060ff] text-lg text-white transition-all duration-300 hover:bg-[#004bb5]'
          >
            <span className='mr-1'>Get</span>
            <img src={evolution} alt='Evolution X' className='h-4' />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default DeviceCard
