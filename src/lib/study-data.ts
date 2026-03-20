export interface Resource {
  title: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  resources: Resource[];
}

export interface StudyDay {
  day: number;
  tasks: Task[];
}

export interface StudyPlan {
  id: string;
  subject: string;
  title: string;
  examDate: string;
  days: StudyDay[];
  createdAt: string;
}

// Mock data matching the dashboard screenshot
export const mockStudyPlan: StudyPlan = {
  id: "1",
  subject: "COMPUTER SCIENCE",
  title: "Computer Science Fundamentals: A 2-Hour Intensive Introduction",
  examDate: "19/3/2026",
  createdAt: new Date().toISOString(),
  days: [
    {
      day: 1,
      tasks: [
        {
          id: "t1",
          title: "Core Concepts & Computational Thinking",
          description: "Learn the definition of computer science, the basics of algorithms, and binary representation. Focused on understanding how computers solve problems rather than just coding.",
          duration: "30m",
          completed: true,
          locked: false,
          resources: [
            { title: "Crash Course Computer Science (YouTube) - Episodes 1 through 4", url: "https://youtube.com" },
            { title: "Introduction to Algorithms - Cormen, Chapter 1 (The Role of Algorithms in Computing)", url: "https://mitpress.mit.edu" },
          ],
        },
        {
          id: "t2",
          title: "Programming Logic & Data Structures",
          description: "Study the fundamental building blocks of software: variables, loops, conditionals, and linear data structures like Arrays and Linked Lists.",
          duration: "40m",
          completed: true,
          locked: false,
          resources: [
            { title: "GeeksforGeeks - Data Structures Basics", url: "https://geeksforgeeks.org" },
            { title: "Harvard CS50x - Week 1: C Programming Lecture", url: "https://cs50.harvard.edu" },
          ],
        },
        {
          id: "t3",
          title: "Problem Solving Practice",
          description: "Apply logic by solving simple algorithmic problems. Focus on writing pseudo-code first, then translating it into a language like Python.",
          duration: "30m",
          completed: false,
          locked: true,
          resources: [
            { title: "LeetCode - 'Two Sum' or 'Reverse String' easy-level problems", url: "https://leetcode.com" },
            { title: "Python.org - Official Beginners Guide", url: "https://python.org" },
          ],
        },
        {
          id: "t4",
          title: "Review and Roadmap Planning",
          description: "Review the concepts learned today and map out the specializations in the field: AI, Systems, Web Development, or Theory.",
          duration: "20m",
          completed: false,
          locked: true,
          resources: [
            { title: "Roadmap.sh - Computer Science Roadmap", url: "https://roadmap.sh" },
          ],
        },
      ],
    },
  ],
};

export function getProgress(plan: StudyPlan): number {
  const allTasks = plan.days.flatMap((d) => d.tasks);
  if (allTasks.length === 0) return 0;
  const completed = allTasks.filter((t) => t.completed).length;
  return Math.round((completed / allTasks.length) * 100);
}

export function getCompletedCount(plan: StudyPlan): string {
  const allTasks = plan.days.flatMap((d) => d.tasks);
  const completed = allTasks.filter((t) => t.completed).length;
  return `${completed}/${allTasks.length}`;
}

export function getHoursDone(plan: StudyPlan): string {
  const allTasks = plan.days.flatMap((d) => d.tasks);
  const completedTasks = allTasks.filter((t) => t.completed);
  let totalMinutes = 0;
  completedTasks.forEach((t) => {
    const match = t.duration.match(/(\d+)/);
    if (match) totalMinutes += parseInt(match[1]);
  });
  const hours = (totalMinutes / 60).toFixed(1);
  return `${hours}h`;
}
