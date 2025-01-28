import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import {v4 as uuid} from 'uuid'

const initialOkrs: ObjectiveType[] = [
  {
    id: uuid(),
    title: "obj1",
    keyResults:[
      {
        title: "asdsad",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metrics: ""
      },
      {
        title: "ewrewrwe",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metrics: ""
      },
      {
        title: "asdasdasd",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metrics: ""
      },
      {
        title: "sadasdas",
        initialValue: 0,
        currentValue: 0,
        finalValue: 0,
        metrics: ""
      },
    ]
  }
]

const db = new Map<string, ObjectiveType>();

initialOkrs.forEach((objective: ObjectiveType)=>{
  db.set(objective.id, objective)
})

export function deleteOkrFromDatabase(id: string): Promise<void>{
  return new Promise((resolve) => {
    setTimeout(() => {
      db.delete(id)
      console.log(db)
      resolve()
    },3000)
  })
}


export function insertOkrToDatabase(okr: ObjectiveType): Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = uuid()
      db.set(id, {...okr, id: id})
      resolve(Array.from(db.values()))
    },3000)
  })
}

export function addKeyResultToDatabase(id:string, kr: KeyResultsType):Promise<ObjectiveType[]>{
  // set timeout here
  return new Promise((resolve)=>{
    setTimeout(()=>{
      db.get(id)?.keyResults.push(kr);
      console.log(db)
      resolve(Array.from(db.values()))
    },3000)
  })
}

export function getOkrsFromDatabase (): Promise<ObjectiveType[]> {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(Array.from(db.values()).filter((obj) => {
        return {
          title: obj.title,
          keyResults: obj.keyResults
        }
      }))
    },3000)
  })
}