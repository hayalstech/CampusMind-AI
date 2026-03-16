"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Settings,
  Sparkles,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  day: string
  startTime: string
  endTime: string
  color: string
  courseCode: string
  completed: boolean
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
]

const events: CalendarEvent[] = [
  { id: "1", title: "Structural Analysis", day: "Monday", startTime: "18:00", endTime: "19:30", color: "bg-blue-500", courseCode: "CIV301", completed: false },
  { id: "2", title: "Fluid Mechanics", day: "Monday", startTime: "20:00", endTime: "21:00", color: "bg-purple-500", courseCode: "MECH205", completed: true },
  { id: "3", title: "Transportation Eng.", day: "Tuesday", startTime: "18:00", endTime: "19:00", color: "bg-orange-500", courseCode: "CIV304", completed: false },
  { id: "4", title: "Surveying", day: "Tuesday", startTime: "19:30", endTime: "20:30", color: "bg-green-500", courseCode: "CIV202", completed: false },
  { id: "5", title: "Fluid Mechanics", day: "Wednesday", startTime: "18:00", endTime: "19:00", color: "bg-purple-500", courseCode: "MECH205", completed: false },
  { id: "6", title: "Structural Analysis", day: "Wednesday", startTime: "19:30", endTime: "21:00", color: "bg-blue-500", courseCode: "CIV301", completed: false },
  { id: "7", title: "Transportation Eng.", day: "Thursday", startTime: "18:00", endTime: "19:30", color: "bg-orange-500", courseCode: "CIV304", completed: false },
  { id: "8", title: "Surveying", day: "Thursday", startTime: "20:00", endTime: "21:00", color: "bg-green-500", courseCode: "CIV202", completed: false },
  { id: "9", title: "Structural Analysis", day: "Friday", startTime: "18:00", endTime: "19:30", color: "bg-blue-500", courseCode: "CIV301", completed: false },
  { id: "10", title: "Fluid Mechanics", day: "Friday", startTime: "20:00", endTime: "21:00", color: "bg-purple-500", courseCode: "MECH205", completed: false },
  { id: "11", title: "Structural Analysis", day: "Saturday", startTime: "09:00", endTime: "11:00", color: "bg-blue-500", courseCode: "CIV301", completed: false },
  { id: "12", title: "Transportation Eng.", day: "Saturday", startTime: "11:30", endTime: "12:30", color: "bg-orange-500", courseCode: "CIV304", completed: false },
  { id: "13", title: "Fluid Mechanics", day: "Sunday", startTime: "09:00", endTime: "10:30", color: "bg-purple-500", courseCode: "MECH205", completed: false },
  { id: "14", title: "Surveying", day: "Sunday", startTime: "11:00", endTime: "12:00", color: "bg-green-500", courseCode: "CIV202", completed: false },
]

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [eventList, setEventList] = useState(events)

  const toggleEventComplete = (eventId: string) => {
    setEventList(prev => prev.map(e => 
      e.id === eventId ? { ...e, completed: !e.completed } : e
    ))
  }

  const getEventsForDay = (day: string) => {
    return eventList.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

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
            <Button variant="ghost" className="w-full justify-start gap-3">
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
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <CalendarIcon className="w-5 h-5" />
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
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Study Calendar</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(prev => prev - 1)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                Week {currentWeek} - March 2024
              </span>
              <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(prev => prev + 1)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <Link href="/planner">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate New Plan
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Structural Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Fluid Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Surveying</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Transportation Eng.</span>
            </div>
          </div>

          {/* Weekly View */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day) => {
                  const dayEvents = getEventsForDay(day)
                  const isToday = day === "Monday" // Demo: assume Monday is today
                  
                  return (
                    <div key={day} className="min-h-[400px]">
                      <div className={`text-center py-2 mb-4 rounded-lg ${isToday ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <p className={`font-semibold ${isToday ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                          {day}
                        </p>
                        <p className="text-xs text-slate-500">
                          Mar {4 + weekDays.indexOf(day)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <div 
                            key={event.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              event.completed 
                                ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60' 
                                : 'bg-white dark:bg-slate-800'
                            }`}
                            onClick={() => toggleEventComplete(event.id)}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full mt-2 ${event.color}`} />
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${event.completed ? 'line-through' : ''}`}>
                                  {event.title}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                  <Clock className="w-3 h-3" />
                                  {event.startTime} - {event.endTime}
                                </div>
                                {event.completed && (
                                  <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Done
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {dayEvents.length === 0 && (
                          <p className="text-xs text-slate-400 text-center py-8">No sessions</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Sessions This Week</p>
                    <p className="text-2xl font-bold">{eventList.length}</p>
                  </div>
                  <CalendarIcon className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Completed Sessions</p>
                    <p className="text-2xl font-bold">{eventList.filter(e => e.completed).length}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Study Hours</p>
                    <p className="text-2xl font-bold">18.5</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
