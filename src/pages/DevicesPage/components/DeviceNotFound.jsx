import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCodenames from '../hooks/useCodenames'
import Fuse from 'fuse.js'
import evoloading from '../../../assets/gifs/evoloading.gif'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

const DeviceNotFound = ({ codename }) => {
  const { codenames, loading, error } = useCodenames()
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (codename && codenames && codenames.length > 0) {
      const fuse = new Fuse(codenames, {
        threshold: 1.0
      })
      const results = fuse.search(codename)
      setSuggestions(results.slice(0, 3).map((result) => result.item))
    } else {
      setSuggestions([])
    }
  }, [codename, codenames])

  if (loading) {
    return (
      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
      >
        <img className='mx-auto h-32 w-32' src={evoloading} alt='Loading...' />
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
      >
        <div className='inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
          <span className='evoxhighlight'>Device</span> Not Found
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
    >
      <div className='inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <span className='evoxhighlight'>Device</span> Not Found
      </div>

      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        className='flex flex-col items-center justify-center gap-4 text-center'
      >
        <p className='mb-6 text-xl'>
          Sorry, we couldn't find device information for{' '}
          <span className='evoxhighlight font-semibold'>{codename}</span>.
        </p>
        {suggestions.length > 0 && (
          <p className='mb-4 text-lg'>
            Did you mean one of the following?
            <div className='flex flex-col items-center'>
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  to={`/devices/${suggestion}`}
                  className='text-[#0060ff] hover:underline'
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </p>
        )}

        <motion.div variants={variants} initial='hidden' animate='visible'>
          <Link
            to='/devices'
            className='inline-block rounded-full bg-[#0060ff] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#004bb5]'
          >
            Browse Devices
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default DeviceNotFound
