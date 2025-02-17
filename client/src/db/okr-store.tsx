import { KeyResultsType, ObjectiveType } from "../types/OKRTypes.ts";
import axios from "axios";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

export async function generateKeyResults(objective: string) {
  console.log({ objective });
  const generateKeyResultsResponse = await axios.post(`${SERVER_IP}/gen-ai/generate-key-results`, { objective });
  return generateKeyResultsResponse.data.keyResults;
}

export async function deleteOkrFromDatabase(objective: ObjectiveType): Promise<void> {
  await Promise.all(
    objective.keyResults.map((kr) =>
      axios.delete(`${SERVER_IP}/key-result`, { data: { id: kr.id } })
    )
  );
  await axios.delete(`${SERVER_IP}/objective`, { data: { objectiveId: objective.id } });
}

export async function updateOkrToDatabase(objectiveId: string, title: string, keyResults: KeyResultsType[]) {
  await axios.put(`${SERVER_IP}/objective`, { id: objectiveId, title });

  await Promise.all(
    keyResults.map((kr) =>
      axios.put(`${SERVER_IP}/key-result`, {
        id: kr.id,
        title: kr.title,
        initialValue: kr.initialValue,
        currentValue: kr.currentValue,
        finalValue: kr.finalValue,
        metric: kr.metric,
      })
    )
  );

}

export async function deleteKeyResultFromDatabase(id: string) {
  await axios.delete(`${SERVER_IP}/key-result`, { data: { id } });
}

export async function insertOkrToDatabase(objective: ObjectiveType): Promise<void> {
  const objectiveResponse = await axios.post(`${SERVER_IP}/objective`, { title: objective.title });
  console.log(objectiveResponse);
  const objectiveId = objectiveResponse.data.id;

  const keyResultToDatabase = objective.keyResults.map((kr) => ({
    objectiveId,
    title: kr.title,
    initialValue: Number(kr.initialValue),
    currentValue: Number(kr.currentValue),
    finalValue: Number(kr.finalValue),
    metric: kr.metric,
  }));
  console.log(keyResultToDatabase);
  await axios.post(`${SERVER_IP}/key-result`, keyResultToDatabase);
}

export async function addKeyResultToDatabase(objectiveId: string, kr: KeyResultsType): Promise<void> {
  await axios.post(`${SERVER_IP}/key-result`, {
    title: kr.title,
    initialValue: Number(kr.initialValue),
    currentValue: Number(kr.currentValue),
    finalValue: Number(kr.finalValue),
    metric: kr.metric,
    objectiveId,
  });
}

export async function getOkrsFromDatabase(): Promise<ObjectiveType[]> {
  const response = await axios.get(`${SERVER_IP}/objective`);
  const objectives: ObjectiveType[] = response.data.map((objective) => ({
    id: objective.id,
    title: objective.title,
    keyResults: objective.key_result.map((kr) => ({
      id: kr.id,
      title: kr.title,
      initialValue: kr.initialValue,
      currentValue: kr.currentValue,
      finalValue: kr.finalValue,
      objectiveId: kr.objectiveId,
      metric: kr.metric,
    })),
  }));
  return objectives;
}
