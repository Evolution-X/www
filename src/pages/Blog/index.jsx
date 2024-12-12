import { Link } from "react-router-dom"
import evolution from "../../assets/evolution.svg"
import { useState, useEffect } from "react"
import evoloading from "../../assets/evoloading.gif"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
}

export default function Blog() {
  const [loading, setLoading] = useState(true)
  const [blogIds, setBlogIds] = useState([])
  const [blogsList, setBlogsList] = useState([])

  // Fetch the list of blogs
  const fetchBlogIds = async () => {
    const url =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/blogs/blogs.json"

    try {
      const response = await fetch(url)
      const blogsNo = await response.json()
      return blogsNo
    } catch (error) {
      console.error("Error fetching blog IDs:", error)
      return []
    }
  }

  // Fetch individual blog data
  const fetchBlog = async () => {
    const data = await Promise.all(
      blogIds.map(async (blog) => {
        const durl = `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/blogs/posts/${blog}.json`
        try {
          const fetchedBlog = await fetch(durl)
          const fetchedBlogData = await fetchedBlog.json()
          return fetchedBlogData
        } catch (error) {
          console.error(`Error fetching data for Blog ${blog}:`, error)
          return null
        }
      })
    )
    return data
  }

  // Check if all backgrounds are loaded
  const checkAllBackgroundsLoaded = (blogsList) => {
    return new Promise((resolve, reject) => {
      let loadedBackgroundsCount = 0
      const totalBackgrounds = blogsList.length

      blogsList.forEach((blog) => {
        const background = new Image()
        background.src = `https://github.com/Evolution-X/www_gitres/blob/main/blogs/post_backgrounds/${blog?.background}.png?raw=true`
        background.onload = () => {
          loadedBackgroundsCount++
          if (loadedBackgroundsCount === totalBackgrounds) {
            resolve()
          }
        }
        background.onerror = () => {
          reject(new Error(`Failed to load background ${blog?.background} for blog ${blog}`))
        }
      })
    })
  }

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogIds()
      setBlogIds(data)
    }
    loadBlogs()
  }, [])

  useEffect(() => {
    const loadBlogData = async () => {
      if (blogIds.length > 0) {
        const data = (await fetchBlog()).sort((a, b) => new Date(b.date) - new Date(a.date))
        setBlogsList(data)
      }
    }
    loadBlogData()
  }, [blogIds])

  useEffect(() => {
    const loadBackgrounds = async () => {
      if (blogsList.length > 0) {
        try {
          await checkAllBackgroundsLoaded(blogsList)
          setLoading(false)
        } catch (error) {
          console.error("Error loading backgrounds:", error)
        }
      }
    }
    loadBackgrounds()
  }, [blogsList])

  return (
    <>
      {loading && (
        <img className="mx-auto" src={evoloading} alt="Loading..." />
      )}
      {!loading && blogsList && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]"
        >
          <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
            <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="Logo" />
            <span className="text-[#afbdf3]">Blog</span>
          </div>

          <div className="flex w-full flex-col gap-10 rounded-3xl bg-black px-2 py-8 lg:px-14 lg:pb-16">
            <div className="inline-flex h-9 items-center font-[Prod-bold]">
              <hr className="w-9 rotate-90 border-2 border-[#6487fb]" />
              <p className="text-2xl">
                <span className="text-[#6487fb]">LATEST</span> POSTS
              </p>
            </div>
            {/* Blog component */}
            <div className="posts mx-3 grid gap-6 sm:grid-cols-2 lg:gap-16 xl:mx-16">
              {blogsList.map((blog, index) => (
                <Link to={`/blog/${blog.blogId}`} key={index}>
                  <div className="relative flex h-[240px] flex-col rounded-3xl ring ring-slate-500/10 duration-100 ease-linear hover:scale-105">
                    <img
                      src={`https://github.com/Evolution-X/www_gitres/blob/main/blogs/post_backgrounds/${blog?.background}.png?raw=true`}
                      alt="Post Background"
                      className="absolute h-full w-full rounded-3xl"
                    />
                    <div className="z-40 inline-flex flex-grow flex-col justify-between p-8">
                      <div className="inline-flex gap-3">
                        <img
                          src={`https://avatars.githubusercontent.com/${blog?.github}`}
                          alt={`${blog?.author}'s avatar`}
                          className="rounded-full h-12 w-12"
                        />
                        <div className="inline-flex flex-col text-xl">
                          <p>{blog?.author}</p>
                          <p>{blog?.date}</p>
                        </div>
                      </div>
                      <p className="pl-2 text-2xl font-bold tracking-wider">
                        {blog.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
