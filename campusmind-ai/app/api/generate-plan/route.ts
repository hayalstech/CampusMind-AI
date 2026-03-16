import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courses, preferences, mode, weekStart } = body;

    // Validate required fields
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json(
        { error: 'Courses array is required' },
        { status: 400 }
      );
    }

    // If no OpenAI API key, return demo schedule
    if (!openai) {
      console.log('No OpenAI API key found, returning demo schedule');
      const demoSchedule = generateDemoSchedule(courses, preferences, mode);
      return NextResponse.json({
        success: true,
        schedule: demoSchedule,
        weekStart,
        mode,
        generatedAt: new Date().toISOString(),
        demo: true,
      });
    }

    // Construct the prompt for OpenAI
    const prompt = `Create a balanced weekly study plan for a university student.

Courses:
${courses.map((c: any) => `- ${c.name} (${c.code}) – ${c.difficulty} – ${c.weeklyHours} hours per week`).join('\n')}

Available study time:
Weekdays (Mon-Fri): ${preferences?.weekday?.start || '18:00'} - ${preferences?.weekday?.end || '22:00'}
Weekends (Sat-Sun): ${preferences?.weekend?.start || '09:00'} - ${preferences?.weekend?.end || '13:00'}

Study Mode: ${mode || 'normal'}

Generate a structured weekly schedule that:
1. Balances workload across the week
2. Prioritizes harder courses appropriately
3. Respects the available time windows
4. Distributes ${courses.reduce((sum: number, c: any) => sum + c.weeklyHours, 0)} total study hours appropriately

Return the schedule as a JSON array with this structure:
[
  {
    "day": "Monday",
    "sessions": [
      {
        "startTime": "18:00",
        "endTime": "19:30",
        "courseId": "course-id",
        "courseName": "Course Name",
        "duration": 1.5
      }
    ]
  }
]

Only return the JSON, no other text.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert study planner assistant. Create optimal study schedules that balance workload and maximize learning efficiency.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      return NextResponse.json(
        { error: 'Failed to generate study plan' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let schedule;
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = responseContent.match(/```json\n?([\s\S]*?)\n?```/) || 
                        responseContent.match(/```\n?([\s\S]*?)\n?```/) ||
                        [null, responseContent];
      const jsonContent = jsonMatch[1] || responseContent;
      schedule = JSON.parse(jsonContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse study plan', rawResponse: responseContent },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      schedule,
      weekStart,
      mode,
      generatedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Error generating study plan:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Demo schedule generator for when OpenAI API key is not available
function generateDemoSchedule(courses: any[], preferences: any, mode: string) {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const schedule = [];
  
  for (const day of weekDays) {
    const isWeekend = day === "Saturday" || day === "Sunday";
    const sessions = [];
    
    // Simple round-robin assignment of courses to days
    const coursesForDay = courses.filter((_, index) => {
      const dayIndex = weekDays.indexOf(day);
      return index % 7 === dayIndex || (index + 3) % 7 === dayIndex;
    });
    
    let currentTime = isWeekend ? "09:00" : "18:00";
    
    for (const course of coursesForDay.slice(0, 2)) {
      const duration = mode === 'exam' ? 2 : mode === 'light' ? 1 : 1.5;
      const [hours, minutes] = currentTime.split(':').map(Number);
      const endHours = Math.floor(hours + duration);
      const endMinutes = minutes;
      const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
      
      sessions.push({
        startTime: currentTime,
        endTime: endTime,
        courseId: course.id || course.code,
        courseName: course.name,
        duration: duration,
      });
      
      // Add break
      const breakDuration = 0.5;
      const breakEndHours = Math.floor(endHours + breakDuration);
      const breakEndMinutes = endMinutes + (breakDuration % 1) * 60;
      currentTime = `${breakEndHours.toString().padStart(2, '0')}:${Math.round(breakEndMinutes).toString().padStart(2, '0')}`;
    }
    
    if (sessions.length > 0) {
      schedule.push({ day, sessions });
    }
  }
  
  return schedule;
}
