import './globals.css'
import localFont from 'next/font/local'
import Footer from './_components/Footer'
import ScrollToTopButton from './_components/ScrollToTopButton'
import Navbar from './_components/Navbar'
import { SITE } from '../constants'

export const metadata = {
  metadataBase: new URL(SITE)
}

export const productSans = localFont({
  src: [
    {
      path: '../assets/fonts/ProductSans-Thin.woff',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProductSans-Light.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProductSans-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProductSans-Medium.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProductSans-Bold.woff',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/ProductSans-Black.woff',
      weight: '900',
      style: 'normal'
    },

    {
      path: '../assets/fonts/ProductSans-Italic.woff',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../assets/fonts/ProductSans-ThinItalic.woff',
      weight: '100',
      style: 'italic'
    },
    {
      path: '../assets/fonts/ProductSans-LightItalic.woff',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../assets/fonts/ProductSans-MediumItalic.woff',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../assets/fonts/ProductSans-BoldItalic.woff',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../assets/fonts/ProductSans-BlackItalic.woff',
      weight: '900',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-productsans'
})

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={productSans.variable}>
      <body className='font-productsans flex min-h-screen flex-col tracking-wide text-white antialiased'>
        <ScrollToTopButton />
        <Navbar />
        <div className='flex-1 lg:mx-auto lg:min-w-[64rem] lg:max-w-[90rem]'>
          <main className='mb-14 mt-7 flex flex-col gap-12 sm:mb-14 sm:mt-14 sm:gap-20 lg:mb-28 xl:gap-28 2xl:mt-28'>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
