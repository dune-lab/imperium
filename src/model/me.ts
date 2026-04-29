export type UserData = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  createdAt: string;
};

export type StudentData = {
  id: string;
  name: string;
  email: string;
  userId: string;
  createdAt: string;
} | null;

export type JourneyData = {
  id: string;
  studentId: string;
  currentStep: string;
  status: string;
  createdAt: string;
} | null;

export type Me = {
  user: UserData;
  student: StudentData;
  journey: JourneyData;
};
