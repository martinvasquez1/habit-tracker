import { useTheme, Theme } from "@/components/theme-provider"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const items: { value: Theme; icon: any }[] = [
    { value: "system", icon: Monitor },
    { value: "light", icon: Sun },
    { value: "dark", icon: Moon },
  ]

  return (
    <div className="flex gap-2 *:flex-1 *:py-3">
      {items.map(({ value, icon: Icon }) => (
        <DropdownMenuItem
          key={value}
          className={`flex items-center justify-center w-full ${theme === value ? "bg-accent" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            setTheme(value)
          }}
        >
          <Icon />
        </DropdownMenuItem>
      ))}
    </div>

  );
}