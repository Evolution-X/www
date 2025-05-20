import { motion } from 'framer-motion'
import React from 'react'
import evoloading from '../../assets/gifs/evoloading.gif'
import evolution from '../../assets/icons/evolution.svg'
import useMerch from './hooks/useMerch'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

const MerchPage = () => {
  const { merchData, loading, error } = useMerch()

  if (loading) {
    return <img className='mx-auto' src={evoloading} alt='Loading...' />
  }

  if (error) {
    return <p className='text-center'>{error}</p>
  }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
    >
      <div className='inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <img className='h-7 sm:h-10 lg:h-12' src={evolution} alt='Logo' />
        <span className='evoxhighlight'>Merch</span>
      </div>

      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        className='mx-auto grid gap-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
      >
        {merchData?.map((item, index) => (
          <div
            key={index}
            className='relative flex h-80 w-64 flex-col justify-end rounded-3xl text-left shadow-[0px_0px_38.5px_14px_#0060ff20] duration-300 hover:scale-105 hover:shadow-[0px_0px_38.5px_14px_#0060ff50]'
          >
            <img
              className='absolute h-80 w-64 transform rounded-3xl object-cover transition-all duration-500 ease-in-out hover:scale-110'
              alt={item.name}
              src={item.imageUrl}
            />
            <div className='z-20 rounded-b-3xl bg-black/50 px-4 py-4 transition-all duration-300 hover:bg-black/70'>
              <p className='font-[Prod-bold] text-xl text-white'>{item.name}</p>
              {item.price && (
                <div className='text-sm text-gray-300'>{`$${item.price}`}</div>
              )}
              <div className='mt-2'>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block rounded-full bg-[#0060ff] px-6 py-2 text-white transition-all duration-300 hover:bg-[#004bb5]'
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MerchPage
