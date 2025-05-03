import React from 'react'
import { cn } from './utils.ts'

export const Meteors = ({
  number,
  className
}: {
  number?: number
  className?: string
}) => {
  const meteors = new Array(number || 20).fill(true)
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={'meteor' + idx}
          className={cn(
            'absolute left-1/2 top-1/2 h-1 w-1 rotate-[90deg] animate-meteor-effect bg-white/60 shadow-[0_0_0_1px_#ffffff10]',
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className
          )}
          style={{
            top: 200,
            left: Math.floor(Math.random() * (-350 - -550) + 0) + 'px',
            animationDelay: Math.random() * (1.4 - 0.7) + 0.4 + 's',
            animationDuration: Math.random() * (0.8 - 0.2) + 0.6 + 's'
          }}
        ></span>
      ))}
    </>
  )
}
