import React, {useEffect, useState} from 'react'
import {MdDelete} from "react-icons/md";
import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import {initialKeyResult} from "../constants/constants.ts";
import {insertOkrToDatabase} from "../db/okr-store.tsx";
import {Toast} from "./Toast";


type OKRInputFormProps = {
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  objectiveToBeUpdated: ObjectiveType | undefined,
}

export const OkrInputForm = ({
                               setObjectives,
                               setIsLoading,
                               objectiveToBeUpdated,
                             }: OKRInputFormProps) => {
  const [keyResults, setKeyResults] = useState<KeyResultsType[]>([initialKeyResult]);

  const [newObjective, setNewObjective] = useState<string>("");

  useEffect(() => {
    if (objectiveToBeUpdated !== undefined) {
      setKeyResults([...objectiveToBeUpdated.keyResults])
      setNewObjective(objectiveToBeUpdated.title)
    }
  },[objectiveToBeUpdated])

  //?API call
  const addObjective = async () => {
    setIsLoading(prev => !prev)

    const responseObjectives = await Toast(insertOkrToDatabase({
      id: "",
      title: newObjective,
      keyResults: keyResults
    }))
    setObjectives([...responseObjectives])
    setKeyResults([initialKeyResult])
    setNewObjective("")
    setIsLoading(prev => !prev)
  }

  const addKeyResult = () => {
    setKeyResults([...keyResults, initialKeyResult]);// how to have it initially empty and adding a value should lead to add kr to the list of kr
  }

  const deleteKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, ind) => ind !== index))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const name = e.target.name
    setKeyResults([...(keyResults.map((kr, idx) => {
      return idx === index ? {...kr, [name]: e.target.value} : kr
    }))]);
  };

  return (

    <div
      className="px-6 top-4 sticky max-w-screen-sm overflow-y-scroll h-screen mb-6 py-6 border-2 border-gray-100 h-fit bg-gray-50 rounded-lg shadow-md flex flex-col gap-4">
      <p className="text-2xl font-bold text-gray-800">Objective</p>
      <input
        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        type="text"
        value={newObjective}
        onChange={(e) => setNewObjective(e.target.value)}
        placeholder="Enter objective"
      />
      {keyResults.map((keyResult, index) => (
        <div
          key={index}
          className={`flex flex-col gap-4 my-4  border p-7 ${index % 2 === 0 ? `bg-blue-100` : `bg-blue-200`} rounded-lg shadow-sm`}
        >
          <input
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            placeholder="Title"
            value={keyResult.title}
            type="text"
            name={"title"}
            onChange={(e) => handleChange(e, index)}

          />
          <div className="flex gap-4">
            <input
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              placeholder="Initial Value"
              type="number"
              name="initialValue"
              value={keyResult.initialValue}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              placeholder="Current Value"
              name="currentValue"
              value={keyResult.currentValue}
              type="number"
              onChange={(e) => handleChange(e, index)}

            />
            <input
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              placeholder="Final Value"
              value={keyResult.finalValue}
              type="number"
              name={"finalValue"}
              onChange={(e) => handleChange(e, index)}

            />
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <input
              className="w-4/12 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              placeholder="Metrics"
              value={keyResult.metrics}
              type="text"
              name={"metrics"}
              onChange={(e) => handleChange(e, index)}

            />
            <button
              className="bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-md"
              onClick={() => deleteKeyResult(index)}
            >
              <MdDelete className="text-white text-xl"/>
            </button>
          </div>
        </div>
      ))}
      <div className="sticky flex gap-4 bottom-1">
        <button
          className="self-start bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white shadow-md"
          onClick={addKeyResult}
        >
          Add Key Result
        </button>
        <button
          className="self-start bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white shadow-md"
          onClick={addObjective}
        >
          Add Objective
        </button>
      </div>

    </div>

  )
}
