"use client"

import { MessageSquare } from "lucide-react"

export default function Discussion() {
  return (
    <div className="text-center py-12">
      <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Discussion Forum</h2>
      <p className="text-muted-foreground">Coming soon - Connect with other developers</p>
    </div>
  )
}