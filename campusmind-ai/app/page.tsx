"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Calendar, 
  Target, 
  Clock, 
  Zap, 
  BarChart3, 
  ChevronRight,
  Sparkles,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">CampusMind AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Planning
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 px-4 py-2 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          <Sparkles className="w-4 h-4 mr-2" />
          Powered by OpenAI
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          AI-Powered Study Planning
          <br />
          <span className="text-blue-600">For University Students</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Upload your courses, deadlines, and exam dates. Our AI generates a personalized 
          weekly study schedule optimized for productivity and balanced workload.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              Start Planning
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo Schedule
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Smart Features for Smart Students
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Study Plan Generator</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our AI analyzes your courses, difficulty levels, and available hours to create 
                the perfect study schedule.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weekly Calendar View</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Visualize your study schedule with a color-coded calendar. Drag and drop 
                to make adjustments.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracker</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track your study completion with progress bars and weekly productivity scores 
                for each course.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Deadline & Exam Alerts</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Never miss a deadline. Get alerts for upcoming assignments and exams with 
                smart prioritization.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Optimization</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Regenerate better schedules with one click. Choose from normal, exam prep, 
                or light study modes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                View detailed charts showing study hours per subject, weekly trends, and 
                productivity insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-slate-800 rounded-3xl my-10">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Add Your Courses</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Enter course details, difficulty levels, and weekly study hours needed.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Set Your Availability</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Define your available study hours for weekdays and weekends.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Generates Plan</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Our AI creates a balanced weekly schedule considering all your constraints.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold mb-2">Track & Optimize</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Follow your schedule, mark tasks complete, and let AI optimize further.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Schedule Preview */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Sample AI-Generated Schedule
        </h2>
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Monday
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <span className="font-medium text-blue-900 dark:text-blue-300">Structural Analysis</span>
                    <span className="text-slate-600 dark:text-slate-400">18:00–19:30</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <span className="font-medium text-purple-900 dark:text-purple-300">Fluid Mechanics</span>
                    <span className="text-slate-600 dark:text-slate-400">20:00–21:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Tuesday
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <span className="font-medium text-green-900 dark:text-green-300">Transportation Eng.</span>
                    <span className="text-slate-600 dark:text-slate-400">18:00–19:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <span className="font-medium text-orange-900 dark:text-orange-300">Surveying</span>
                    <span className="text-slate-600 dark:text-slate-400">19:30–20:30</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-blue-600 border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Study Habits?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of students who use CampusMind AI to ace their exams and 
              maintain a healthy work-life balance.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
                Get Started Free
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-slate-900 dark:text-white">CampusMind AI</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            AI-powered study planning that turns your semester into a smart weekly schedule.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Built with OpenAI • Next.js • Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
