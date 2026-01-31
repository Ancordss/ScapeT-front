import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      ref={ref}
      className={cn(
        "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-300 hover:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 [&::-webkit-slider-thumb]:hover:w-5 [&::-webkit-slider-thumb]:hover:h-5 [&::-webkit-slider-thumb]:hover:shadow-lg [&::-webkit-slider-thumb]:hover:shadow-primary/50 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-300 [&::-moz-range-thumb]:hover:w-5 [&::-moz-range-thumb]:hover:h-5 [&::-moz-range-thumb]:hover:shadow-lg",
        className
      )}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }
