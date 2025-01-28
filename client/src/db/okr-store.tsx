import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";


let dbIndex = 1;

type OKRType = ObjectiveType & {
  _id: number
}

const initialOkrs: OKRType[] = [
  {
    _id: dbIndex++,
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

const db = new Map<number, OKRType>();

initialOkrs.forEach((objective: OKRType, index: number)=>{
  db.set(index, objective)
})

export function insertOkrToDatabase(okr: ObjectiveType): Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.set(dbIndex, {...okr, _id: dbIndex++})
      resolve(Array.from(db.values()))
    },3000)
  })
}

export function addKeyResultToDatabase(index:number, kr: KeyResultsType):Promise<ObjectiveType[]>{
  // set timeout here
  return new Promise((resolve)=>{
    setTimeout(()=>{
      db.get(index)?.keyResults.push(kr);
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