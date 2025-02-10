import React from "react";
import {KeyResultsType} from "../../types/OKRTypes";

type ObjectiveInputProp = {
  newObjective: string,
  setNewObjective: React.Dispatch<React.SetStateAction<string>>,
  handleGenerateKeyResults: () => KeyResultsType[]
}

export const ObjectiveInput = ({newObjective, setNewObjective, handleGenerateKeyResults}: ObjectiveInputProp ) => {
  return (
    <>
      <div
        className="w-full flex flex-col gap-4 px-10 py-4 w-full bg-gray-50 shadow-md shadow-gray-400 rounded-md border border-gray-400">

        <div className="w-full relative flex flex-row gap-6">
          <label htmlFor="objective"
                 className="absolute -top-[10px] ml-4 bg-gray-200 px-1 py-[2px] rounded-md text-gray-900 text-xs">Objective</label>
          <input
            id="objective"
            className="w-full py-3 px-4 rounded-lg text-gray-900 focus:outline-none bg-gray-300 shadow-sm border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600 text-gray-900 "
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="Enter objective"
          />
          <div className=" flex justify-end relative">
  <span className="absolute flex size-5 -top-[5px] -right-[8px]">
  <span
    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
    <span className="relative inline-flex size-5 rounded-full bg-green-500"></span>
    </span>
            <button
              onClick={() => handleGenerateKeyResults()}
              className="animate- bg-gradient-to-b from-sky-500 to-indigo-500 px-4 py-2 rounded-md text-white shadow-md ">
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
