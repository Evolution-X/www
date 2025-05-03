import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Navbar from './layout/Navbar'
import ScrollToTopButton from './layout/ScrollToTopButton'
import HomePage from './pages/HomePage/HomePage'
import DevicesPage from './pages/DevicesPage/DevicesPage'
import Device from './pages/DevicesPage/components/Device'
import TeamPage from './pages/TeamPage/TeamPage'
import BlogPage from './pages/BlogPage/BlogPage'
import Blog from './pages/BlogPage/components/Blog'
import MerchPage from './pages/MerchPage/MerchPage'
import StatsPage from './pages/StatsPage/StatsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import Footer from './layout/Footer'
import './assets/fonts/style.css'

function App() {
  return (
    <div className='flex min-h-screen flex-col tracking-wide text-white antialiased'>
      <BrowserRouter>
        <ScrollToTopButton />
        <Navbar />
        <div className='flex-1 lg:mx-auto lg:min-w-[64rem] lg:max-w-[90rem]'>
          <div className='mb-14 mt-7 sm:mb-14 sm:mt-14 lg:mb-28 2xl:mt-28'>
            <main className='flex flex-col gap-12 sm:gap-20 xl:gap-28'>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path='/team' element={<TeamPage />} />
                <Route path='/devices' element={<DevicesPage />} />
                <Route
                  path='/devices/:codename'
                  element={<Device />}
                />
                <Route path='/blog' element={<BlogPage />} />
                <Route path='/blog/:blogId' element={<Blog />} />
                <Route path='/merch' element={<MerchPage />} />
                <Route path='/stats' element={<StatsPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
