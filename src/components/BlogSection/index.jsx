import React from "react"
import share from "../../assets/share.svg"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import evoloading from "../../assets/evoloading.gif"

export default function BlogSection() {
  const { blogId } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [isCopied, setIsCopied] = useState(false)

  const fetchBlog = async () => {
    const url = `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/udc/blogs/${blogId}.json`
    try {
      const response = await fetch(url)
      const fetchedBlog = await response.json()
      return fetchedBlog
    } catch (error) {
      console.error(`Error fetching data for ${blogId}:`, error)
      return null // Return null in case of an error
    }
  }

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text)
    }
  }
  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(window.location.href)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const device = await fetchBlog()
      // const vanilla = await fetchVanillaDevice()
      setData(device)
      // setVanilla(vanilla)
      setLoading(false)
    }
    fetchData()
  }, [blogId]) // Add codename as a dependency to refetch when it changes

  return (
    <>
      {loading && (
        <img
          className="mx-auto my-auto w-4/5 lg:w-2/5"
          src={evoloading}
          alt="loading ..."
        />
      )}
      {!loading && (
        <div className="mx-4 sm:-mt-10 lg:-mb-20 xl:mx-20 2xl:-mt-24">
          <div className="flex flex-col gap-10 rounded-3xl border border-[#2a2828] bg-[#070505] p-8 xl:p-16">
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-[1.1rem] text-white md:flex-row">
                <span>{data.date}&nbsp; •&nbsp;&nbsp; </span>
                <span className="font-[Prod-Light]">Author: {data.author}</span>
              </div>
              <div
                className="relative cursor-pointer"
                onClick={handleCopyClick}
              >
                <img src={share} className="size-7" alt="share" />
                <span
                  className={`absolute -right-2 top-0 rounded-full bg-green-400 px-2 py-1 text-black duration-200 ${isCopied ? "opacity-100" : "opacity-0"}`}
                >
                  Copied!
                </span>
              </div>
            </div>
            <div className="mt-6 text-3xl text-white lg:text-5xl">
              {data.title}
            </div>
            <div className="flex flex-col gap-6">
              {/* <div className="flex h-44 items-center justify-center rounded-2xl bg-white py-16">
            <div className="text-3xl text-[#363232]/50">Image if any...</div>
          </div> */}
              <div className="px-2 text-xl text-white">{data.content}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
