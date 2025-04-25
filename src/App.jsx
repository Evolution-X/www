import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Team from "./pages/Team"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Downloads from "./pages/Downloads"
import Blog from "./pages/Blog"
import Merch from "./pages/Merch"
import Stats from "./pages/Stats"
import NotFound from "./pages/NotFound"
import BlogSection from "./components/BlogSection"
import DownloadSection from "./components/DownloadSection"
import ScrollToTopButton from "./components/ScrollToTopButton"
import "./fonts/style.css"

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col tracking-wide text-white antialiased lg:mx-auto lg:min-w-[64rem] lg:max-w-[90rem]">
        <BrowserRouter>
          <Navbar />
          <div className="mb-14 mt-7 flex-1 sm:mb-14 sm:mt-14 lg:mb-28 2xl:mt-28">
            <main className="flex flex-col gap-12 sm:gap-20 xl:gap-28">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/team" element={<Team />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/downloads/:codename" element={<DownloadSection />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogId" element={<BlogSection />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
          <ScrollToTopButton />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
