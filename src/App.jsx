import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import NotFound from "./pages/NotFound"
import Downloads from "./pages/Downloads"
import Blog from "./pages/Blog"
import BlogSection from "./components/BlogSection"
import DownloadSection from "./components/DownloadSection"
import "./fonts/style.css"

function App() {
  return (
    <div className="flex min-h-screen flex-col tracking-wide text-white antialiased md:mx-64">
      <BrowserRouter>
        <Navbar />
        <div className="mb-14 mt-14 flex-1 md:mb-28 md:mt-28">
          <main className="flex flex-col gap-12 md:gap-28">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route
                path="/downloads/:codename"
                element={<DownloadSection />}
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogId" element={<BlogSection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
