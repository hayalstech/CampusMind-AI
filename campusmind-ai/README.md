# CampusMind AI

**AI-powered study planning that turns your semester into a smart weekly schedule.**

## Features

- **Course Input System**: Add courses with difficulty levels and weekly hours
- **AI Study Plan Generator**: OpenAI-powered optimized weekly schedules
- **Weekly Calendar View**: Color-coded visual schedule
- **AI Study Modes**: Normal, Exam Prep, and Light modes
- **Progress Tracker**: Track completion with progress bars
- **Deadline Alerts**: Never miss important deadlines
- **Calendar Export**: Export to Google Calendar, Outlook, Apple Calendar (ICS)

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

1. Clone and install:
```bash
git clone https://github.com/hayalstech/CampusMind-AI.git
cd campusmind-ai
npm install
```

2. Create `.env.local` with your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- OpenAI API

## Pages
- `/` - Landing Page
- `/dashboard` - Study dashboard
- `/courses` - Course manager
- `/planner` - AI study planner
- `/calendar` - Weekly calendar
- `/profile` - User settings

---
Built with ❤️ for university students
