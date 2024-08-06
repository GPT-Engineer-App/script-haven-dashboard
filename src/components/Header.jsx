import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, User, Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Link } from "react-router-dom"
import { navItems } from "../nav-items"

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <LayoutDashboard className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-xl font-semibold">Script Sandbox</h1>
          </Link>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="mx-2 text-sm font-medium">
              {item.title}
            </Link>
          ))}
        </nav>
        <div>
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="mr-2">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
