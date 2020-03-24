export type SchoolsQuery = {
  staffPoints: boolean
  _id: string
  schoolName: string | null
  schoolType: string
  aboutSchoolFunds: string
  mobileNumber: number
  schoolDescription: string
  schoolAchievement: string
};
export type SchoolIdQuery = {
  id: string
};

export type SchoolSummaryFragment = {
  staffPoints: boolean
  _id: string
  schoolName: string | null
  schoolType: string
  aboutSchoolFunds: string
  mobileNumber: number
  schoolDescription: string
  schoolAchievement: string
};