"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Settings,
  Plus,
  Trash2,
  Edit3,
  MoreHorizontal,
  AlertCircle,
  Sparkles
} from "lucide-react"

interface Course {
  id: string
  name: string
  code: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  weeklyHours: number
  color: string
  deadlines: { id: string; title: string; date: string }[]
  examDates: { id: string; title: string; date: string }[]
}

const initialCourses: Course[] = [
  { 
    id: "1", 
    name: "Structural Analysis", 
    code: "CIV301", 
    difficulty: "Hard", 
    weeklyHours: 6, 
    color: "bg-blue-500",
    deadlines: [{ id: "1", title: "Assignment 3", date: "2024-03-10" }],
    examDates: [{ id: "1", title: "Midterm Exam", date: "2024-03-20" }]
  },
  { 
    id: "2", 
    name: "Fluid Mechanics", 
    code: "MECH205", 
    difficulty: "Medium", 
    weeklyHours: 4, 
    color: "bg-purple-500",
    deadlines: [{ id: "2", title: "Lab Report", date: "2024-03-12" }],
    examDates: []
  },
  { 
    id: "3", 
    name: "Surveying", 
    code: "CIV202", 
    difficulty: "Easy", 
    weeklyHours: 3, 
    color: "bg-green-500",
    deadlines: [],
    examDates: [{ id: "2", title: "Field Test", date: "2024-03-25" }]
  },
  { 
    id: "4", 
    name: "Transportation Engineering", 
    code: "CIV304", 
    difficulty: "Medium", 
    weeklyHours: 5, 
    color: "bg-orange-500",
    deadlines: [{ id: "3", title: "Project Proposal", date: "2024-03-15" }],
    examDates: [{ id: "3", title: "Quiz 2", date: "2024-03-18" }]
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    difficulty: "Medium" as 'Easy' | 'Medium' | 'Hard',
    weeklyHours: 4,
  })

  const handleAddCourse = () => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-red-500", "bg-teal-500"]
    const color = colors[courses.length % colors.length]
    
    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
      color,
      deadlines: [],
      examDates: [],
    }
    
    setCourses([...courses, course])
    setIsAddDialogOpen(false)
    setNewCourse({ name: "", code: "", difficulty: "Medium", weeklyHours: 4 })
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-slate-100 text-slate-700'
    }
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
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Calendar className="w-5 h-5" />
              {sidebarOpen && <span>Calendar</span>}
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
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
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Course Manager</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input 
                    id="name" 
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    placeholder="e.g., Structural Analysis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input 
                    id="code" 
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                    placeholder="e.g., CIV301"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select 
                      id="difficulty"
                      value={newCourse.difficulty}
                      onChange={(e) => setNewCourse({...newCourse, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Weekly Hours</Label>
                    <Input 
                      id="hours" 
                      type="number"
                      value={newCourse.weeklyHours}
                      onChange={(e) => setNewCourse({...newCourse, weeklyHours: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddCourse} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${course.color}`} />
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <p className="text-sm text-slate-500">{course.code}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Difficulty</span>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Weekly Hours</span>
                      <span className="font-medium">{course.weeklyHours} hrs</span>
                    </div>
                    
                    {(course.deadlines.length > 0 || course.examDates.length > 0) && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        {course.deadlines.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs text-slate-500 mb-1">Upcoming Deadlines</p>
                            {course.deadlines.map(d => (
                              <div key={d.id} className="flex items-center gap-2 text-sm">
                                <AlertCircle className="w-3 h-3 text-orange-500" />
                                <span className="text-slate-700 dark:text-slate-300">{d.title}</span>
                                <span className="text-xs text-slate-500">({d.date})</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {course.examDates.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Exams</p>
                            {course.examDates.map(e => (
                              <div key={e.id} className="flex items-center gap-2 text-sm">
                                <Calendar className="w-3 h-3 text-red-500" />
                                <span className="text-slate-700 dark:text-slate-300">{e.title}</span>
                                <span className="text-xs text-slate-500">({e.date})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
