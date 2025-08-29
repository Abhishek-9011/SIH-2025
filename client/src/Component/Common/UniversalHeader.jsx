"use client"

import { CheckCircle, Code, MessageSquare, Users, Brain } from "lucide-react"
import { ThemeToggle } from "@/Theme/theme-toggle"
import UserDropdown from "@/pages/UserDropdown"

export default function UniversalHeader({ tabs, activeTab, setActiveTab, problems }) {

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">MyCodeCraft</h1>
            <nav className="hidden md:flex space-x-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Solved: {problems.filter((p) => p.solved).length}</span>
            </div>
            <ThemeToggle />
            <UserDropdown username="CodeMaster" />
          </div>
        </div>
      </div>
    </header>
  )
}
