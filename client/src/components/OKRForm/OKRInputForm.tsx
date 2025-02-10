import React, {useEffect, useState} from 'react'
import {KeyResultsType, ObjectiveType} from "../../types/OKRTypes.ts";
import {initialKeyResult} from "../../constants/constants.ts";
import {generateKeyResults, insertOkrToDatabase, updateOkrToDatabase} from "../../db/okr-store.tsx";
import {Toast} from "../Toast";
import toast from "react-hot-toast";
import {RiDeleteBin6Line} from "react-icons/ri";
import {ObjectiveInput} from "./ObjectiveInput.tsx";
// import {ObjectiveInput} from

type OKRInputFormProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  objectiveToBeUpdated: ObjectiveType | undefined,
  getAllOkrs: () => void,
  setObjectiveToBeUpdated: React.Dispatch<React.SetStateAction<ObjectiveType | undefined>>
}

export const OkrInputForm = ({
                               setIsLoading,
                               objectiveToBeUpdated,
                               getAllOkrs,
                               setObjectiveToBeUpdated
                             }: OKRInputFormProps) => {
  const [keyResults, setKeyResults] = useState<KeyResultsType[]>([initialKeyResult]);

  const [newObjective, setNewObjective] = useState<string>("");

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!newObjective.trim()) {
      newErrors["objective"] = "Objective title is required.";
      valid = false;
    }

    keyResults.forEach((kr, index) => {
      if (!kr.title.trim()) {
        newErrors[`kr-title-${index}`] = "Key Result title is required.";
        valid = false;
      }
      if (kr.initialValue === null || kr.initialValue === "") {
        newErrors[`kr-initial-${index}`] = "Initial Value is required.";
        valid = false;
      }
      if (kr.currentValue === null || kr.currentValue === "") {
        newErrors[`kr-current-${index}`] = "Current Value is required.";
        valid = false;
      }
      if (kr.finalValue === null || kr.finalValue === "") {
        newErrors[`kr-final-${index}`] = "Final Value is required.";
        valid = false;
      }
      if (!kr.metric.trim()) {
        newErrors[`kr-metrics-${index}`] = "Metrics field is required.";
        valid = false;
      }
    });
    return valid;
  }

  useEffect(() => {
    if (objectiveToBeUpdated !== undefined) {
      setKeyResults([...objectiveToBeUpdated.keyResults])
      setNewObjective(objectiveToBeUpdated.title)
    }
  }, [objectiveToBeUpdated])

  // API call
  const addObjective = async () => {
    setIsLoading(prev => !prev)

    if (objectiveToBeUpdated !== undefined) {
      await Toast(updateOkrToDatabase(
        objectiveToBeUpdated.id,
        newObjective,
        keyResults
      ))
      getAllOkrs()
      setObjectiveToBeUpdated(undefined)
      setKeyResults([initialKeyResult])
      setNewObjective("")
      setIsLoading(prev => !prev)
      return;
    }

    await Toast(insertOkrToDatabase({
      id: "",
      title: newObjective,
      keyResults: keyResults
    }))

    getAllOkrs();
    setKeyResults([initialKeyResult])
    setNewObjective("")
    setIsLoading(prev => !prev)
  }

  const addKeyResult = () => {
    setKeyResults([...keyResults, initialKeyResult]);
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

  const handleGenerateKeyResults = async () => {
    if (newObjective === "") {
      toast("Please enter objective!")
      return
    }
    const generatedKeyResults = await Toast(generateKeyResults(
      newObjective), {
      loading: 'Loading',
      success: 'successfully generated key results?!',
      error: "Unknown error occured!"
    })
    console.log(generatedKeyResults)
    setKeyResults([...generatedKeyResults]);
  }

  return (
    <div className=" min-h-screen overflow-y-auto bg-gray-50  flex  justify-center gap-12 ">
      <div className=" p-10 flex flex-col gap-10">
        <p className="text-2xl  font-bold w-full flex items-center justify-center text-gray-900">Objective Form</p>
        <div className="">
          <ObjectiveInput handleGenerateKeyResults={handleGenerateKeyResults} newObjective={newObjective} setNewObjective={setNewObjective}></ObjectiveInput>

          <div
            className="w-full mt-10 flex flex-col gap-4 px-10 pt-5 pb-10 w-full bg-gray-100 shadow-md shadow-gray-500 rounded-md border border-gray-400">
            <h2 className="text-2xl font-semibold leading-none">Key Results</h2>
            {keyResults.map((keyResult, index) => (
              <div key={index}
                   className={`flex flex-col gap-4 border-gray-500    p-7 bg-gray-300 rounded-lg `}>
                <div className="w-full relative flex flex-col">
                  <label htmlFor={`title-${index}`}
                         className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Title</label>
                  <input
                    id={`title-${index}`}
                    className="w-full py-3 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-900 bg-gray-100 shadow-sm"
                    placeholder="Title"
                    value={keyResult.title}
                    type="text"
                    name="title"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-full relative flex flex-col">
                    <label htmlFor={`initial-value-${index}`}
                           className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Initial
                      Value</label>
                    <input
                      id={`initial-value-${index}`}
                      className="w-full py-3 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-900 bg-gray-100 shadow-sm"
                      placeholder="Initial Value"
                      type="number"
                      name="initialValue"
                      value={keyResult.initialValue}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="w-full relative flex flex-col">
                    <label htmlFor={`current-value-${index}`}
                           className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Current
                      Value</label>
                    <input
                      id={`current-value-${index}`}
                      className="w-full py-3 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-900 bg-gray-100 shadow-sm"
                      placeholder="Current Value"
                      type="number"
                      name="currentValue"
                      value={keyResult.currentValue}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="w-full relative flex flex-col ">
                    <label htmlFor={`final-value-${index}`}
                           className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Final
                      Value</label>
                    <input
                      id={`final-value-${index}`}
                      className="w-full py-3 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-900 bg-gray-100 shadow-sm"
                      placeholder="Final Value"
                      type="number"
                      name="finalValue"
                      value={keyResult.finalValue}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>

                <div className="flex flex-row w-full items-center justify-between">
                  <div className="w-4/12 relative flex flex-col ">
                    <label htmlFor={`metric-${index}`}
                           className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Metrics</label>
                    <input
                      id={`metric-${index}`}
                      className="w-full py-3 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-900 bg-gray-100 shadow-sm"
                      placeholder="Metrics"
                      value={keyResult.metric}
                      type="text"
                      name="metric"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-md shadow-gray-500"
                    onClick={() => deleteKeyResult(index)}
                  >
                    <RiDeleteBin6Line className="text-white text-xl"/>
                  </button>
                </div>
              </div>
            ))}
            <div className="sticky flex gap-4 bottom-0 px-8 py-4">
              {!objectiveToBeUpdated && <button
                  className="self-start bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white shadow-md"
                  onClick={addKeyResult}
              >
                  Add Key Result
              </button>}
              <button
                className="self-start bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white shadow-md transition duration-300 ease-out"
                onClick={addObjective}
              >
                {objectiveToBeUpdated ? "Update " : "Add "} Objective
              </button>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
