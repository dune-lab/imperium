import type { Me, UserData, StudentData, JourneyData } from '../model/me';

export function toMe(user: UserData, student: StudentData, journey: JourneyData): Me {
  return { user, student, journey };
}
