export interface Exercise {
  id: number;
  subject: string;
  name: string;
  deadline: string;
  priority: Priority;
  excerciseStatus: ExcerciseStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export enum ExcerciseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type ExerciseFilter =
  | "ALL"
  | "PENDING"
  | "OVERDUE"
  | "COMPLETED";
export type createExercise = Omit<Exercise, "createdAt" | "id" | 'updatedAt'|'excerciseStatus'>;
