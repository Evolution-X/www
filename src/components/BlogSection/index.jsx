import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import share from "../../assets/share.svg"
import evoloading from "../../assets/evoloading.gif"

const BlogSection = () => {
  const { blogId } = useParams()
  const [data, setData] = useState(null)
  const [isCopied, setIsCopied] = useState(false)

  const fetchFile = async (url) => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch ${url}`)
      return await response.json()
    } catch {
      return null
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      const url = `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/blogs/posts/${blogId}.json`
      const blogData = await fetchFile(url)
      if (blogData) {
        setData(blogData)
      }
    }
    fetchBlog()
  }, [blogId])

  const copyTextToClipboard = async (text) => {
    try {
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(text)
      } else {
        document.execCommand("copy", true, text)
      }
    } catch {}
  }

  const handleCopyClick = () => {
    copyTextToClipboard(window.location.href)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1500)
      })
      .catch(() => {})
  }

  if (!data) {
    return <img className="mx-auto" src={evoloading} alt="Loading..." />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 sm:-mt-10 lg:-mb-20 xl:mx-20 2xl:-mt-24"
    >
      <div className="flex flex-col gap-10 rounded-3xl border-2 border-[#0060ff] bg-[#070505] p-8 xl:p-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-[1.1rem] text-white md:flex-row">
            <span>{data.date}&nbsp; •&nbsp;&nbsp;</span>
            <span className="font-[Prod-Light]">Author: {data.author}</span>
          </div>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.75 }}
            className="relative cursor-pointer"
            onClick={handleCopyClick}
          >
            <img src={share} className="size-7" alt="share" />
            <span
              className={`absolute -right-2 top-0 rounded-full bg-[#0060ff] px-2 py-1 text-white duration-200 ${isCopied ? "opacity-100" : "opacity-0"}`}
            >
              Copied!
            </span>
          </motion.div>
        </div>
        <div className="mt-6 text-3xl lg:text-5xl evoxhighlight">
          {data.title}
        </div>
        <div className="flex flex-col gap-6">
          <div className="px-2 text-xl text-white">{data.content}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogSection
