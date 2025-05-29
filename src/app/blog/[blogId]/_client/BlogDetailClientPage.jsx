'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ShareButton from '../../../_components/ShareButton'

const BlogDetailClientPage = ({ blogPost }) => {
  const data = blogPost
  const formattedDate = new Date(data.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className='mx-4 sm:-mt-10 lg:-mb-20 xl:mx-20 2xl:-mt-24'
    >
      <div className='relative flex flex-col gap-10 rounded-3xl border-2 border-[#0060ff] bg-[#0f172a] p-8 xl:p-16'>
        <div className='absolute right-4 top-4'>
          <ShareButton />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col text-[1.1rem] text-white md:flex-row'>
            <span>{formattedDate}&nbsp; •&nbsp;&nbsp;</span>
            <span className='font-light'>Author: {data.author}</span>
          </div>
        </div>
        <div className='evoxhighlight mt-6 text-3xl lg:text-5xl'>
          {data.title}
        </div>
        <div className='flex flex-col gap-6'>
          <div className='px-2 text-xl text-white'>{data.content}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogDetailClientPage
