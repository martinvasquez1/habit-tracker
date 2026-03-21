import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2Icon role="status" aria-label="Loading" className={cn("size-8 animate-spin stroke-primary", className)} {...props} />
    </div>
  )
}

export { Spinner }
