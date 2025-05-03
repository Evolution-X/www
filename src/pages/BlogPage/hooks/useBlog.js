import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useBlog = (blogId = null) => {
  const [data, setData] = useState(null)
  const [blogsList, setBlogsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFile = async (url) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`)
      }
      return await response.json()
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
      return null
    }
  }

  useEffect(() => {
    const fetchSingleBlog = async (id) => {
      setLoading(true)
      setError(null)
      const url = `${Constants.BLOG_POSTS}${id}.json`
      const blogData = await fetchFile(url)
      if (blogData) {
        setData({
          ...blogData,
          backgroundUrl: `${Constants.BLOG_POST_BACKGROUNDS}${blogData.background}.webp`
        })
      }
      setLoading(false)
    }

    const fetchAllBlogs = async () => {
      setLoading(true)
      setError(null)
      const blogIds = await fetchFile(Constants.BLOGS)

      if (blogIds) {
        const blogs = await Promise.all(
          blogIds.map(async (id) => {
            const blogUrl = `${Constants.BLOG_POSTS}${id}.json`
            const blogData = await fetchFile(blogUrl)
            return blogData
              ? {
                  ...blogData,
                  backgroundUrl: `${Constants.BLOG_POST_BACKGROUNDS}${blogData.background}.webp`
                }
              : null
          })
        )
        setBlogsList(
          blogs
            .filter(Boolean)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      setLoading(false)
    }

    if (blogId) {
      fetchSingleBlog(blogId)
    } else {
      fetchAllBlogs()
    }
  }, [blogId])

  return { data, blogsList, loading, error }
}

export default useBlog
