import postbg from "../../assets/postbg.png"
import avatar from "../../assets/avatar.png"
import { Link } from "react-router-dom"
import evolution from "../../assets/evolution.svg"
import { useState,useEffect } from "react"
import evoloading from "../../assets/evoloading.gif"

export default function Blog() {

  const [loading,setLoading]=useState(true)
  const [blogIds, setBlogIds]=useState([])
  const [blogsList, setBlogsList]=useState([])
  // Fetch the list of devices
  const fetchBlogIds = async () => {
    const url =
      "https://raw.githubusercontent.com/Prathamk07/evox/refs/heads/main/devices/blogs.json"

    try {
      const response = await fetch(url)
      const blogsNo = await response.json()
      return blogsNo
    } catch (error) {
      console.error("Error fetching devices:", error)
      return [] // Return an empty array on error
    } finally {
    }
  }
  
  // Fetch individual device data
  const fetchBlog = async () => {
    // Wait for all device data to be fetched
    const data = await Promise.all(
      blogIds.map(async (blog) => {
        const durl = `https://raw.githubusercontent.com/Prathamk07/evox/refs/heads/main/devices/resources/blogs/${blog}.json`
        try {
          const fetchedBlog = await fetch(durl)
          const fetchedBlogData = await fetchedBlog.json()
          console.log(fetchedBlogData)
          // await timeout(0)
          return fetchedBlogData
        } catch (error) {
          console.error(`Error fetching data for Blog ${blog}:`, error)
          return null// Handle errors for individual devices
        }
      }),
    )

    return data // Return the resolved data
  }

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogIds()
      setBlogIds(data) // Set state after fetching the device list
      console.log("Fetched devices:", data) // Log the fetched data
      }      
      loadBlogs() // Call the async function inside useEffect
    },[])

      // Fetch and set device data when the `devices` state updates
  useEffect(() => {
    const loadDeviceData = async () => {
      if (blogIds.length > 0) {
        const data = await fetchBlog()
        console.log("Fetched device data:", data) // Log fetched device data
        setBlogsList(data) // Set state with fetched device data
      }
    }

    loadDeviceData() // Call the async function when devices state changes
    // console.log(deviceList)
  }, [blogIds]) // Trigger when `devices` state changes

    useEffect(() => {
      console.log(blogsList)
      if (blogsList.length > 0) {
        setLoading(false)
      }
    }, [blogsList])
  

  return (
    <>
     {loading && (
        <img className="mx-auto" src={evoloading} alt="loading ..." />
      )}
      {(!loading && blogsList) && (
    <div className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16">
      <div className="inline-flex flex-col items-center justify-center">
        <p className="inline-flex flex-row items-baseline gap-4 text-4xl font-bold lg:text-6xl">
          <img className="h-7 sm:h-8 lg:h-11" src={evolution} alt="" />
          <span className="text-[#afbdf3]">Blog</span>
        </p>
      </div>
      <div className="flex w-full flex-col gap-10 rounded-3xl bg-black px-2 py-8 lg:px-14 lg:pb-16">
        <div className="inline-flex h-9 items-center">
          <hr className="w-9 rotate-90 border-2 border-[#6487fb]" />
          <p className="text-2xl font-semibold">
            <span className="text-[#6487fb]">LATEST</span> POSTS
          </p>
        </div>
        {/* Blog component */}
        <div className="posts mx-3 grid gap-6 sm:grid-cols-2 lg:gap-16 xl:mx-16">
          {blogsList.map((blog, index) => (
              <Link to={`/blog/${blog.blogId}`} key={index}>
                <div
                  className="relative flex h-[240px] flex-col items-center justify-center rounded-3xl p-8 ring ring-slate-500/10 duration-100 ease-linear hover:scale-105"
                  key={index}
                  >
                  <img
                    src={postbg}
                    alt="postbg"
                    fill
                    className="absolute z-0 h-full w-full rounded-3xl object-cover"
                    />
                  <div className="z-40 inline-flex flex-grow flex-col justify-between">
                    <div className="inline-flex gap-3">
                      <img src={avatar} alt="postbg" />
                      <div className="inline-flex flex-col">
                        <p className="text-xl">{blog?.author}</p>
                        <p className="text-xl">{blog?.date}</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">
                      {blog.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>  
    )}
  </>
  )
}
