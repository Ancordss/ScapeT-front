import * as React from "react"
import { cn } from "@/lib/utils"

const Calendar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-3 bg-white dark:bg-gray-900 border border-primary/20 rounded-lg",
        className
      )}
      {...props}
    />
  )
})
Calendar.displayName = "Calendar"

export { Calendar }
