import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, User } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <LayoutDashboard className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <div>
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
