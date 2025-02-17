import React from "react";

type ObjectiveInputProp = {
  newObjective: string,
  setNewObjective: React.Dispatch<React.SetStateAction<string>>,
  handleGenerateKeyResults: () => void
}

export const ObjectiveInput = ({newObjective, setNewObjective, handleGenerateKeyResults}: ObjectiveInputProp ) => {
  return (
    <>
      <div
        className="w-full flex flex-col gap-4 px-10 py-4 w-full bg-gray-300  rounded-md border border-gray-400 z-0">

        <div className="w-full relative flex flex-row gap-6">
          <label htmlFor="objective"
                 className=" absolute -top-[10px] ml-4 px-1 py-[2px] rounded-md bg-[#5698A7] text-gray-50 text-sm">Objective</label>
          <input
            id="objective"
            className="w-full py-3 px-4 rounded-lg text-gray-900 focus:outline-none bg-gray-100  border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600 text-gray-900 "
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="Enter objective"
          />
          <div className=" flex justify-end relative p-2 bg-transparent z-10">
            <button
              onClick={() => handleGenerateKeyResults()}
              id="ai-animate-btn"
              className="bg-gradient-to-r from-[#143D60] to-[#27667B] px-4 py-2 rounded-full relative text-white ">
              Generate Key Results
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
