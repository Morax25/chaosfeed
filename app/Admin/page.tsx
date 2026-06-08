"use client"

import { useState } from "react"
import { Trash2, AlertTriangle, ShieldAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const initialReports = [
  {
    reporter: "f5b191a9-1b6e-433e-a368-57ca82ed0564",
    postId: "1b206899-7b84-4822-bb64-c40122f10aee",
    content: "adarsh",
    category: "unknown",
    reasoning: "Gemini API unavailable — flagged for manual review.",
    timestamp: "2 mins ago",
  },
  {
    reporter: "f5b191a9-1b6e-433e-a368-57ca82ed0564",
    postId: "cd53c79d-bc91-4ec7-a7f1-fd95f79b702c",
    content: "dawd",
    category: "unknown",
    reasoning: "Gemini API unavailable — flagged for manual review.",
    timestamp: "5 mins ago",
  },
]

export default function ModerationPage() {
  const [reports, setReports] = useState(initialReports)

  const removePost = (postId: string) => {
    setReports((prev) => prev.filter((report) => report.postId !== postId))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <ShieldAlert className="h-6 w-6 text-red-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Moderation Queue</h1>
            <p className="text-sm text-zinc-500">
              Review reported posts and remove violations.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {reports.length === 0 ? (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShieldAlert className="mb-4 h-10 w-10 text-zinc-700" />
                <p className="text-lg font-medium text-zinc-300">
                  No reported posts
                </p>
                <p className="text-sm text-zinc-500">
                  Everything looks clean right now.
                </p>
              </CardContent>
            </Card>
          ) : (
            reports.map((report) => (
              <Card
                key={report.postId}
                className="border-zinc-800 bg-zinc-950 transition-all hover:border-zinc-700"
              >
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                        >
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Human Review
                        </Badge>

                        <Badge
                          variant="outline"
                          className="border-zinc-700 text-zinc-400"
                        >
                          {report.category}
                        </Badge>
                      </div>

                      <p className="text-xs text-zinc-500">
                        Reported {report.timestamp}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removePost(report.postId)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <p className="whitespace-pre-wrap break-words text-sm text-zinc-200">
                      {report.content}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 text-xs md:grid-cols-2">
                    <div>
                      <p className="mb-1 text-zinc-500">Reporter</p>
                      <p className="font-mono text-zinc-300">
                        {report.reporter}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-zinc-500">Post ID</p>
                      <p className="font-mono text-zinc-300">
                        {report.postId}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                    <p className="mb-1 text-xs text-zinc-500">
                      Moderation Reason
                    </p>

                    <p className="text-sm text-zinc-300">
                      {report.reasoning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
