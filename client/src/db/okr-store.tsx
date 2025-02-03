import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import {v4 as uuid} from 'uuid'
import axios from "axios";

const initialOkrs: ObjectiveType[] = [
  {
    id: uuid(),
    title: "obj1",
    keyResults: [
      {
        title: "asdsad",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metric: ""
      },
      {
        title: "ewrewrwe",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metric: ""
      },
      {
        title: "asdasdasd",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metric: ""
      },
      {
        title: "sadasdas",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metric: ""
      },
    ]
  }
]

const db = new Map<string, ObjectiveType>();

initialOkrs.forEach((objective: ObjectiveType) => {
  db.set(objective.id, objective)
})

const HEADER = {
  headers: {"Content-Type": 'application/json'}
}

export async function deleteOkrFromDatabase(objective: ObjectiveType): Promise<void> {
  objective.keyResults.map(async (kr) => {
    await axios.delete('http://localhost:3000/key-result', {data: {id: kr.id}})
  })

  const response = await axios.delete('http://localhost:3000/objective', {data: {objectiveId: objective.id}})
  console.log({response})
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     db.delete(id)
  //     console.log(db)
  //     resolve()
  //   }, 3000)
  // })
}

export async function getSuggestions(query: string): Promise<string[]> {
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/gpt-3.5-turbo',
    {
      messages: [
        { role: 'user', content: `Give me suggestions based on this input: ${query}` },
      ],
      max_tokens: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUGGESTION_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const suggestions = response.data.choices.map((choice: any) => choice.message.content.trim());
  return suggestions;
}


export async function insertOkrToDatabase(okr: ObjectiveType): Promise<ObjectiveType[]> {
  const okrToDb = {
    title: okr.title
  }
  console.log({okr})
  const response = await axios.post('http://localhost:3000/objective', JSON.stringify(okrToDb), {
    headers: {"Content-Type": 'application/json'}
  })

  console.log(response.data)
  const objectiveId = response.data.id;
  const keyResultsToDb = okr.keyResults.map((kr) => ({
    title: kr.title,
    initialValue: +kr.initialValue,
    currentValue: +kr.currentValue,
    finalValue: +kr.finalValue,
    metric: kr.metric,
    objectiveId
  }))
  const krResponse = await axios.post('http://localhost:3000/key-result', JSON.stringify(keyResultsToDb), {
    headers: {"Content-Type": 'application/json'}
  })
  console.log(krResponse)
}

export function addKeyResultToDatabase(id: string, kr: KeyResultsType): Promise<ObjectiveType[]> {
  // set timeout here
  return new Promise((resolve) => {
    setTimeout(() => {
      db.get(id)?.keyResults.push(kr);
      console.log(db)
      resolve(Array.from(db.values()))
    }, 3000)
  })
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
  // console.log('me log ho raha hu')
  // return new Promise((resolve)=>{
  //   setTimeout(()=>{
  //     resolve(Array.from(db.values()).filter((obj) => {
  //       return {
  //         title: obj.title,
  //         keyResults: obj.keyResults
  //       }
  //     }))
  //   },3000)
  // })
}