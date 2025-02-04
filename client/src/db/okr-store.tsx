import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import axios from "axios";


export async function deleteOkrFromDatabase(objective: ObjectiveType): Promise<void> {

  await Promise.all(
    objective.keyResults.map((kr) => {
      axios.delete('http://localhost:3000/key-result', {
        data: {id: kr.id}
      })
    })
  )
  await axios.delete('http://localhost:3000/objective', {
    data: {objectiveId: objective.id}
  })
}

export async function deleteKeyResultFromDatabase(id: string) {
  await axios.delete('http://localhost:3000/key-result', {
    data: {
      id: id
    }
  })
}

export async function insertOkrToDatabase(objective: ObjectiveType):Promise<void> {
  const objectiveResponse = await axios.post('http://localhost:3000/objective', {title: objective.title})
  console.log(objectiveResponse)
  const objectiveId = objectiveResponse.data.id;

  const keyResultToDatabase = objective.keyResults.map((kr) => ({
    objectiveId: objectiveId,
    title: kr.title,
    initialValue: kr.initialValue,
    currentValue: kr.currentValue,
    finalValue: kr.finalValue,
    metric: kr.metrics
  }))

  await axios.post('http://localhost:3000/key-result', keyResultToDatabase)
}

export function addKeyResultToDatabase(id: string, kr: KeyResultsType): Promise<ObjectiveType[]> {

}

export async function getOkrsFromDatabase(): Promise<ObjectiveType[]> {
  const response = await axios.get('http://localhost:3000/objective')
  // console.log(response.data)
  const objectives: ObjectiveType[] = response.data.map((objective) => ({
    id: objective.id,
    title:
    objective.title,
    keyResults:
      objective.key_result.map((kr) => ({
        id: kr.id,
        title: kr.title,
        initialValue: kr.initialValue,
        currentValue: kr.currentValue,
        finalValue: kr.finalValue,
        objectiveId: kr.objectiveId,
        metric: kr.metric,

      }))
  }))
  return objectives
}