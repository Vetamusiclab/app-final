export type LessonStatus = 'прошёл' | 'отменён';
export type Lesson = { id:string; date:string; time:string; subject:string; status:LessonStatus }
export const LESSON_RATE = 500;
export function calculateSalary(list: Lesson[]){
  const passed = list.filter(l => l.status==='прошёл').length;
  return { passed, total: passed*LESSON_RATE, rate: LESSON_RATE };
}
