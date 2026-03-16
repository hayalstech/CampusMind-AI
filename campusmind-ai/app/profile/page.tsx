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
  User,
  Moon,
  Sun,
  Bell,
  Clock,
  Save
} from "lucide-react"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [examPrepStyle, setExamPrepStyle] = useState<'intensive' | 'balanced' | 'light'>('balanced')
  const [breakDuration, setBreakDuration] = useState(15)
  const [notifications, setNotifications] = useState(true)

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
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
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
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Profile & Settings</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </header>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Demo Student</h3>
                  <p className="text-slate-500">Civil Engineering • 3rd Year</p>
                  <p className="text-sm text-slate-400">Joined March 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Demo Student" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="student@campusmind.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" defaultValue="Civil Engineering" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select id="year" defaultValue="3">
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year+</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Study Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Study Hours</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-sm font-medium mb-3">Weekdays (Mon-Fri)</p>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-xs text-slate-500">Start</Label>
                        <Input type="time" defaultValue="18:00" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-slate-500">End</Label>
                        <Input type="time" defaultValue="22:00" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-sm font-medium mb-3">Weekends (Sat-Sun)</p>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-xs text-slate-500">Start</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-slate-500">End</Label>
                        <Input type="time" defaultValue="13:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Exam Preparation Style</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={examPrepStyle === 'intensive' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${examPrepStyle === 'intensive' ? 'bg-red-600' : ''}`}
                    onClick={() => setExamPrepStyle('intensive')}
                  >
                    <span className="font-semibold">Intensive</span>
                    <span className="text-xs opacity-80">Long focused sessions</span>
                  </Button>
                  <Button 
                    variant={examPrepStyle === 'balanced' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${examPrepStyle === 'balanced' ? 'bg-blue-600' : ''}`}
                    onClick={() => setExamPrepStyle('balanced')}
                  >
                    <span className="font-semibold">Balanced</span>
                    <span className="text-xs opacity-80">Mix of study and breaks</span>
                  </Button>
                  <Button 
                    variant={examPrepStyle === 'light' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${examPrepStyle === 'light' ? 'bg-green-600' : ''}`}
                    onClick={() => setExamPrepStyle('light')}
                  >
                    <span className="font-semibold">Light</span>
                    <span className="text-xs opacity-80">Relaxed, frequent breaks</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="break">Break Duration Between Sessions</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="break" 
                    type="range" 
                    min="5" 
                    max="30" 
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <Badge variant="secondary">{breakDuration} minutes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${theme === 'light' ? 'bg-blue-600' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-semibold">Light</span>
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${theme === 'dark' ? 'bg-blue-600' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="font-semibold">Dark</span>
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'}
                    className={`h-auto py-4 flex flex-col gap-2 ${theme === 'system' ? 'bg-blue-600' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-semibold">System</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">Deadline Reminders</p>
                  <p className="text-sm text-slate-500">Get notified when deadlines are approaching</p>
                </div>
                <Button 
                  variant={notifications ? 'default' : 'outline'}
                  onClick={() => setNotifications(!notifications)}
                  className={notifications ? 'bg-blue-600' : ''}
                >
                  {notifications ? 'On' : 'Off'}
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">Study Session Reminders</p>
                  <p className="text-sm text-slate-500">Remind me 15 minutes before study sessions</p>
                </div>
                <Button variant="outline">Off</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Progress Report</p>
                  <p className="text-sm text-slate-500">Receive a summary every Sunday</p>
                </div>
                <Button variant="outline">Off</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
