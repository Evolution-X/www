import { cn } from "../../libs/utils.ts"
import React from "react"

export const Meteors = ({
  number,
  className,
}: {
  number?: number
  className?: string
}) => {
  const meteors = new Array(number || 20).fill(true)
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "absolute left-1/2 top-1/2 h-1 w-1 rotate-[90deg] animate-meteor-effect bg-[#0060ff] shadow-[0_0_0_1px_#0060ff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#0060ff] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: 265,
            left: Math.floor(Math.random() * (-350 - -600) + 0) + "px",
            animationDelay: Math.random() * (1.6 - 0.8) + 0.5 + "s",
            animationDuration: Math.random() * (0.8 - 0.2) + 0.6 + "s",
          }}
        ></span>
      ))}
    </>
  )
}
