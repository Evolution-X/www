'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import evolutionSvg from '../../../assets/icons/evolution.svg'
import { getGradientBackgroundStyles } from '../../../lib/gradients'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

const BlogClientPage = ({ blogsList }) => {
  if (!blogsList || blogsList.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0f172a] text-white'>
        <p className='text-white'>No blog posts found.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
    >
      <div className='font-productsans inline-flex flex-col items-baseline gap-2 text-center text-4xl font-bold sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <img
          className='h-7 sm:h-10 lg:h-12'
          src={evolutionSvg.src}
          alt='Evolution X Logo'
        />
        <span className='evoxhighlight'>Blog</span>
      </div>

      <div className='flex w-full flex-col gap-10 rounded-3xl border-2 border-[#0060ff] bg-[#0f172a] px-2 py-8 lg:px-14 lg:pb-16'>
        <div className='font-productsans inline-flex h-9 items-center font-bold'>
          <hr className='w-9 rotate-90 border-2 border-[#0060ff]' />
          <p className='text-2xl'>
            <span className='evoxhighlight'>LATEST</span> POSTS
          </p>
        </div>

        <div className='posts mx-3 grid gap-6 sm:grid-cols-2 lg:gap-16 xl:mx-16'>
          {blogsList.map((blog, index) => (
            <Link href={`/blog/${blog.blogId}`} key={index}>
              <div
                className='middleshadow relative flex h-[240px] flex-col rounded-3xl duration-100 ease-linear hover:scale-105 hover:shadow-[0px_0px_38.5px_14px_#0060ff50]'
                style={getGradientBackgroundStyles()}
              >
                <div className='z-40 inline-flex flex-grow flex-col justify-between p-8'>
                  <div className='inline-flex gap-3'>
                    <img
                      src={`https://avatars.githubusercontent.com/${blog?.github}`}
                      alt={`${blog?.author}'s avatar`}
                      className='h-12 w-12 rounded-full'
                    />
                    <div className='inline-flex flex-col text-xl'>
                      <p>{blog?.author}</p>
                      <p>
                        {new Date(blog?.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className='pl-2 text-2xl font-bold tracking-wider'>
                    {blog.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BlogClientPage
