import React from 'react'
import Link from 'next/link'
import { SITE } from '../constants'

export async function generateMetadata() {
  const title = 'Page Not Found - Evolution X'
  const description =
    'The page you are looking for does not exist or has been moved.'

  const isProduction = process.env.NODE_ENV === 'production'
  const ogImageUrl = `${SITE}/home.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE,
      siteName: 'Evolution X',
      type: 'website',
      ...(isProduction && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      site: '@evolutionxrom',
      creator: '@evolutionxrom',
      title,
      description,
      ...(isProduction && {
        image: ogImageUrl
      })
    }
  }
}

const NotFoundPage = () => {
  return (
    <div className='mx-4 flex flex-col items-center justify-center gap-10 text-white md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'>
      <div className='font-productsans inline-flex flex-col items-baseline gap-2 text-center text-4xl font-bold sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <span className='evoxhighlight'>Page</span> Not Found
      </div>

      <div className='flex flex-col items-center justify-center gap-4 text-center'>
        <p className='mb-6 text-center text-xl'>
          The page you are looking for does not exist or has been moved.
        </p>

        <div>
          <Link
            href='/'
            className='inline-block rounded-full bg-[#0060ff] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#004bb5]'
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
