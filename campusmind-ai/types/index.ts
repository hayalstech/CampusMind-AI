export interface Course {
  id: string;
  name: string;
  code: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  weeklyHours: number;
  deadlines: Deadline[];
  examDates: ExamDate[];
  color: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface ExamDate {
  id: string;
  title: string;
  date: string;
}

export interface StudySession {
  id: string;
  courseId: string;
  day: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface UserPreferences {
  preferredStudyHours: {
    weekday: { start: string; end: string };
    weekend: { start: string; end: string };
  };
  examPreparationStyle: 'intensive' | 'balanced' | 'light';
  theme: 'light' | 'dark' | 'system';
  breakDuration: number;
}

export interface StudyPlan {
  id: string;
  weekStart: string;
  sessions: StudySession[];
  mode: 'normal' | 'exam' | 'light';
}

export interface ProgressData {
  courseId: string;
  completedHours: number;
  totalHours: number;
  percentage: number;
}
