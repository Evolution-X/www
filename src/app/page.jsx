import React from 'react'
import HomePageClientPage from './_client/HomePageClientPage'
import { fetchLatestAndroidVersion, fetchScreenshots } from '../lib/dataService'
import { SITE } from '../constants'

export async function generateMetadata() {
  const title = 'Evolution X'
  const description =
    'Evolve your Android device — Pixel UI, customization & more. We are Evolution X!'

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

export default async function HomePage() {
  const [latestAndroidVersion, screenshotUrls] = await Promise.all([
    fetchLatestAndroidVersion(),
    fetchScreenshots()
  ])

  if (!latestAndroidVersion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center text-red-500">
        <p className="mb-4 text-xl font-bold">
          Failed to load Android version data. Please try again later.
        </p>
      </div>
    )
  }

  const isProduction = process.env.NODE_ENV === 'production'
  const imageUrl = isProduction ? `${SITE}/home.png` : `${SITE}/opengraph-image`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Evolution X',
    operatingSystem: 'Android',
    applicationCategory: 'OperatingSystem',
    softwareVersion: latestAndroidVersion,
    description:
      'Evolution X is a custom Android operating system offering Pixel UI, Customization, and more.',
    image: imageUrl,
    url: SITE,
    publisher: {
      '@type': 'Organization',
      name: 'Evolution X',
      url: SITE
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <HomePageClientPage
        initialLatestAndroidVersion={latestAndroidVersion}
        screenshotUrls={screenshotUrls}
      />
    </>
  )
}
