"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Settings, 
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react"

// Demo data
const demoCourses = [
  { id: "1", name: "Structural Analysis", code: "CIV301", difficulty: "Hard", weeklyHours: 6, color: "bg-blue-500", completedHours: 4.5 },
  { id: "2", name: "Fluid Mechanics", code: "MECH205", difficulty: "Medium", weeklyHours: 4, color: "bg-purple-500", completedHours: 3 },
  { id: "3", name: "Surveying", code: "CIV202", difficulty: "Easy", weeklyHours: 3, color: "bg-green-500", completedHours: 2.5 },
  { id: "4", name: "Transportation Eng.", code: "CIV304", difficulty: "Medium", weeklyHours: 5, color: "bg-orange-500", completedHours: 2 },
]

const upcomingDeadlines = [
  { id: "1", title: "Structural Analysis Assignment", course: "CIV301", date: "2024-03-10", daysLeft: 3 },
  { id: "2", title: "Fluid Mechanics Quiz", course: "MECH205", date: "2024-03-12", daysLeft: 5 },
  { id: "3", title: "Surveying Field Report", course: "CIV202", date: "2024-03-15", daysLeft: 8 },
]

const todaysSchedule = [
  { id: "1", course: "Structural Analysis", time: "18:00-19:30", completed: false, color: "bg-blue-500" },
  { id: "2", course: "Fluid Mechanics", time: "20:00-21:00", completed: true, color: "bg-purple-500" },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-slate-900 dark:text-white">CampusMind</span>}
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Brain className="w-5 h-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </Button>
          </Link>
          <Link href="/planner">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Sparkles className="w-5 h-5" />
              {sidebarOpen && <span>AI Planner</span>}
            </Button>
          </Link>
          <Link href="/calendar">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Calendar className="w-5 h-5" />
              {sidebarOpen && <span>Calendar</span>}
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span>Courses</span>}
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span>Settings</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/planner">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Study Plan
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Today's Sessions</p>
                    <p className="text-2xl font-bold">2/4</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Progress</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Courses</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming Deadlines</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Study Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysSchedule.map((session) => (
                    <div 
                      key={session.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${session.completed ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-800'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${session.color}`} />
                        <div>
                          <p className={`font-medium ${session.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            {session.course}
                          </p>
                          <p className="text-sm text-slate-500">{session.time}</p>
                        </div>
                      </div>
                      {session.completed ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Done
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-slate-800"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{deadline.title}</p>
                        <p className="text-sm text-slate-500">{deadline.course}</p>
                      </div>
                      <Badge 
                        variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"}
                      >
                        {deadline.daysLeft} days left
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress by Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demoCourses.map((course) => {
                  const percentage = (course.completedHours / course.weeklyHours) * 100
                  return (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${course.color}`} />
                          <span className="font-medium text-slate-900 dark:text-white">{course.name}</span>
                        </div>
                        <span className="text-sm text-slate-500">
                          {course.completedHours}/{course.weeklyHours} hrs
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {percentage.toFixed(0)}% complete this week
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
