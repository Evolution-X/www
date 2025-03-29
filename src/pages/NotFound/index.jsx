import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
}

const NotFound = () => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]"
    >
      <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
        <span className="evoxhighlight">Page</span> Not Found
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-4"
      >
        <p className="text-xl mb-6">The page you are looking for does not exist or has been moved.</p>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#0060ff] text-white font-semibold rounded-full hover:bg-[#004bb5] transition-all duration-300"
          >
            Go to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default NotFound
