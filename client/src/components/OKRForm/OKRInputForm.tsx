import React, {useEffect, useState} from 'react'
import {KeyResultsType, ObjectiveType} from "../../types/OKRTypes.ts";
import {initialKeyResult} from "../../constants/constants.ts";
import {generateKeyResults, insertOkrToDatabase, updateOkrToDatabase} from "../../db/okr-store.tsx";
import {Toast} from "../Toast";
import toast from "react-hot-toast";
import {ObjectiveInput} from "./ObjectiveInput.tsx";
import KeyResultInput from "./KeyResultInput";

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
    <div className=" min-h-screen overflow-y-auto bg-gray-50  flex items-center justify-center gap-12 z-0">
      <div className="flex flex-col h-fit gap-10 bg-[#EBEDF0] px-8 py-8 shadow-md shadow-gray-500">
        <p
          className="text-transparent text-[#143D60] p-2  text-2xl md:text-3xl lg:text-4xl  font-bold w-full flex items-center justify-center text-gray-900">Objective
          Form</p>
        <div className="">
          <ObjectiveInput handleGenerateKeyResults={handleGenerateKeyResults} newObjective={newObjective}
                          setNewObjective={setNewObjective}></ObjectiveInput>
          <KeyResultInput
            keyResults={keyResults}
            handleChange={handleChange}
            deleteKeyResult={deleteKeyResult}
            objectiveToBeUpdated={objectiveToBeUpdated}
            addKeyResult={addKeyResult}
          />
        </div>
        <button
          className="self-start bg-[#C8DC68] hover:bg-[#B0C257] px-4 py-2 rounded-md text-white shadow-md transition self-end duration-300 ease-out"
          onClick={addObjective}
        >
          {objectiveToBeUpdated ? "Update " : "Add "} Objective
        </button>
      </div>


    </div>
  )
}
