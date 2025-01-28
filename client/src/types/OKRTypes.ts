type KeyResultsType = {
  title: string,
  initialValue: number,
  finalValue: number,
  currentValue: number,
  metrics: string
}

type ObjectiveType = {
  id:string,
  title: string,
  keyResults: KeyResultsType[]
}

export type {KeyResultsType, ObjectiveType};