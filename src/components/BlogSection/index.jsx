import React from "react"
import share from "../../assets/share.svg"

export default function index() {
  return (
    <div className="mx-4 sm:-mt-10 lg:-mb-20 xl:mx-20 2xl:-mt-24">
      <div className="flex flex-col gap-10 rounded-3xl border border-[#2a2828] bg-[#070505] p-8 xl:p-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-[1.1rem] text-white lg:flex-row">
            <span>9 August 2024 • </span>
            <span className="font-[Prod-Light]">Author: Joey Huab</span>
          </div>
          <img src={share} className="size-7 cursor-pointer" alt="share" />
        </div>
        <div className="mt-6 text-3xl text-white lg:text-5xl">
          Our plans with Android 15 QPR1 update.
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex h-44 items-center justify-center rounded-2xl bg-white py-16">
            <div className="text-3xl text-[#363232]/50">Image if any...</div>
          </div>
          <div className="px-2 text-xl text-white">content </div>
        </div>
      </div>
    </div>
  )
}
