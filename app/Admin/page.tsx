"use client"

import { useEffect, useState } from "react"
import { Trash2, AlertTriangle, ShieldAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getModerationQueue, deleteModerationPost } from "@/actions/posts"

export default function ModerationPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModerationQueue()
        setReports(response)
      } catch (error) {
        console.error("Failed to fetch moderation queue:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (postId: string) => {
    try {
      setDeleting(postId)
      await deleteModerationPost(postId)
      // Remove from local state immediately
      setReports((prev) => prev.filter((r) => r.postId !== postId))
    } catch (error) {
      console.error("Failed to delete post:", error)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-red-500/30 border-t-red-500 animate-spin" />
          <p className="text-zinc-500 text-xs tracking-wide">loading queue</p>
        </div>
      </div>
    )
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
                        Reported{" "}
                        {new Date(report.timestamp * 1000).toLocaleString([], {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deleting === report.postId}
                      onClick={() => handleDelete(report.postId)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deleting === report.postId ? "Removing..." : "Remove"}
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
                    <p className="text-sm text-zinc-300">{report.reasoning}</p>
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
