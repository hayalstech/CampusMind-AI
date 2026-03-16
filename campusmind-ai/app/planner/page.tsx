"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Settings,
  Sparkles,
  MoreHorizontal,
  Clock,
  Wand2,
  Target,
  Zap,
  Sun,
  Download
} from "lucide-react"

interface GeneratedSession {
  day: string
  sessions: {
    time: string
    course: string
    duration: string
  }[]
}

export default function PlannerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [studyMode, setStudyMode] = useState<'normal' | 'exam' | 'light'>('normal')
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedSession[] | null>(null)
  
  // Form state
  const [weekdayHours, setWeekdayHours] = useState({ start: "18:00", end: "22:00" })
  const [weekendHours, setWeekendHours] = useState({ start: "09:00", end: "13:00" })

  const courses = [
    { name: "Structural Analysis", difficulty: "Hard", hours: 6 },
    { name: "Fluid Mechanics", difficulty: "Medium", hours: 4 },
    { name: "Surveying", difficulty: "Easy", hours: 3 },
    { name: "Transportation Engineering", difficulty: "Medium", hours: 5 },
  ]

  const generatePlan = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Demo generated plan
    const demoPlan: GeneratedSession[] = [
      {
        day: "Monday",
        sessions: [
          { time: "18:00 - 19:30", course: "Structural Analysis", duration: "1.5h" },
          { time: "20:00 - 21:00", course: "Fluid Mechanics", duration: "1h" },
        ]
      },
      {
        day: "Tuesday",
        sessions: [
          { time: "18:00 - 19:00", course: "Transportation Engineering", duration: "1h" },
          { time: "19:30 - 20:30", course: "Surveying", duration: "1h" },
        ]
      },
      {
        day: "Wednesday",
        sessions: [
          { time: "18:00 - 19:00", course: "Fluid Mechanics", duration: "1h" },
          { time: "19:30 - 21:00", course: "Structural Analysis", duration: "1.5h" },
        ]
      },
      {
        day: "Thursday",
        sessions: [
          { time: "18:00 - 19:30", course: "Transportation Engineering", duration: "1.5h" },
          { time: "20:00 - 21:00", course: "Surveying", duration: "1h" },
        ]
      },
      {
        day: "Friday",
        sessions: [
          { time: "18:00 - 19:30", course: "Structural Analysis", duration: "1.5h" },
          { time: "20:00 - 21:00", course: "Fluid Mechanics", duration: "1h" },
        ]
      },
      {
        day: "Saturday",
        sessions: [
          { time: "09:00 - 11:00", course: "Structural Analysis", duration: "2h" },
          { time: "11:30 - 12:30", course: "Transportation Engineering", duration: "1h" },
        ]
      },
      {
        day: "Sunday",
        sessions: [
          { time: "09:00 - 10:30", course: "Fluid Mechanics", duration: "1.5h" },
          { time: "11:00 - 12:00", course: "Surveying", duration: "1h" },
        ]
      },
    ]
    
    setGeneratedPlan(demoPlan)
    setIsGenerating(false)
  }

  const exportToCalendar = () => {
    // Create ICS file content
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//CampusMind AI//Study Schedule//EN\n"
    
    generatedPlan?.forEach((day, dayIndex) => {
      day.sessions.forEach(session => {
        const uid = `${Date.now()}-${dayIndex}-${session.course.replace(/\s/g, '')}`
        icsContent += `BEGIN:VEVENT\n`
        icsContent += `UID:${uid}@campusmind.ai\n`
        icsContent += `SUMMARY:Study - ${session.course}\n`
        icsContent += `DESCRIPTION:AI-generated study session for ${session.course}\n`
        icsContent += `DTSTART:${session.time.split(' - ')[0].replace(':', '')}\n`
        icsContent += `DTEND:${session.time.split(' - ')[1].replace(':', '')}\n`
        icsContent += `END:VEVENT\n`
      })
    })
    
    icsContent += "END:VCALENDAR"
    
    // Download the file
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'study-schedule.ics'
    a.click()
    window.URL.revokeObjectURL(url)
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
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
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
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">AI Study Planner</h1>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {/* Study Mode Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Select Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant={studyMode === 'normal' ? 'default' : 'outline'}
                  className={`h-auto py-6 flex flex-col items-center gap-2 ${studyMode === 'normal' ? 'bg-blue-600' : ''}`}
                  onClick={() => setStudyMode('normal')}
                >
                  <Target className="w-6 h-6" />
                  <span className="font-semibold">Normal Mode</span>
                  <span className="text-xs opacity-80">Balanced workload</span>
                </Button>
                <Button 
                  variant={studyMode === 'exam' ? 'default' : 'outline'}
                  className={`h-auto py-6 flex flex-col items-center gap-2 ${studyMode === 'exam' ? 'bg-red-600' : ''}`}
                  onClick={() => setStudyMode('exam')}
                >
                  <Zap className="w-6 h-6" />
                  <span className="font-semibold">Exam Prep</span>
                  <span className="text-xs opacity-80">Intensive focus</span>
                </Button>
                <Button 
                  variant={studyMode === 'light' ? 'default' : 'outline'}
                  className={`h-auto py-6 flex flex-col items-center gap-2 ${studyMode === 'light' ? 'bg-green-600' : ''}`}
                  onClick={() => setStudyMode('light')}
                >
                  <Sun className="w-6 h-6" />
                  <span className="font-semibold">Light Mode</span>
                  <span className="text-xs opacity-80">Relaxed pace</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Your Available Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Weekdays (Mon-Fri)</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-xs text-slate-500">Start Time</Label>
                      <Input 
                        type="time" 
                        value={weekdayHours.start}
                        onChange={(e) => setWeekdayHours({...weekdayHours, start: e.target.value})}
                      />
                    </div>
                    <span className="pt-5">to</span>
                    <div className="flex-1">
                      <Label className="text-xs text-slate-500">End Time</Label>
                      <Input 
                        type="time" 
                        value={weekdayHours.end}
                        onChange={(e) => setWeekdayHours({...weekdayHours, end: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base font-medium">Weekends (Sat-Sun)</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-xs text-slate-500">Start Time</Label>
                      <Input 
                        type="time" 
                        value={weekendHours.start}
                        onChange={(e) => setWeekendHours({...weekendHours, start: e.target.value})}
                      />
                    </div>
                    <span className="pt-5">to</span>
                    <div className="flex-1">
                      <Label className="text-xs text-slate-500">End Time</Label>
                      <Input 
                        type="time" 
                        value={weekendHours.end}
                        onChange={(e) => setWeekendHours({...weekendHours, end: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{course.name}</p>
                        <p className="text-sm text-slate-500">{course.hours} hours/week</p>
                      </div>
                      <Badge 
                        variant={course.difficulty === 'Hard' ? 'destructive' : course.difficulty === 'Medium' ? 'secondary' : 'default'}
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link href="/courses">
                  <Button variant="outline" className="w-full mt-4">
                    Manage Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Generate Button */}
          <div className="mt-6 text-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              onClick={generatePlan}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  AI is generating your schedule...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Study Plan
                </>
              )}
            </Button>
          </div>

          {/* Generated Plan */}
          {generatedPlan && (
            <Card className="mt-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your AI-Generated Study Schedule</CardTitle>
                <Button variant="outline" onClick={exportToCalendar}>
                  <Download className="w-4 h-4 mr-2" />
                  Export to Calendar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedPlan.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white dark:bg-slate-800">
                      <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white">{day.day}</h3>
                      <div className="space-y-2">
                        {day.sessions.map((session, sIndex) => (
                          <div key={sIndex} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                            <div>
                              <p className="font-medium text-sm text-slate-900 dark:text-white">{session.course}</p>
                              <p className="text-xs text-slate-500">{session.time}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {session.duration}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={generatePlan}
                    disabled={isGenerating}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Save to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
