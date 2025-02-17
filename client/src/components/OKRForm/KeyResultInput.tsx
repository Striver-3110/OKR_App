import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri";
import {KeyResultsType, ObjectiveType} from "../../types/OKRTypes";

type KeyResultInputProp = {
  keyResults : KeyResultsType[],
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void,
  deleteKeyResult: (index: number) => void,
  objectiveToBeUpdated: ObjectiveType | undefined,
  addKeyResult: () => void,
}

const KeyResultInput = ({
                          keyResults,
                          handleChange,
                          deleteKeyResult,
                          objectiveToBeUpdated,
                          addKeyResult,
                        }: KeyResultInputProp) => {
  return (
    <>
      <div
        className="w-full mt-10 flex flex-col gap-4 px-10 pt-5 pb-10 w-full bg-gray-300  rounded-md border border-gray-400">
        <h2 className="text-2xl font-semibold text-[#143D60] leading-none">Key Results</h2>
        {keyResults.map((keyResult, index) => (
          <div key={index}
               className={`flex flex-col gap-4 border-gray-500    p-7 bg-[#EBEDF0] rounded-lg `}>
            <div className="w-full relative flex flex-col">
              <label htmlFor={`title-${index}`}
                     className="absolute -top-[10px] ml-4 bg-[#5698A7] px-1 py-[2px] rounded-md text-gray-50 text-sm">Title</label>
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
                       className="absolute -top-[10px] ml-4 bg-[#5698A7] text-gray-50 px-1 py-[2px] rounded-md  text-sm">Initial
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
                       className="absolute -top-[10px] ml-4 bg-[#5698A7] px-1 py-[2px] rounded-md text-gray-50 text-sm">Current
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
                       className="absolute -top-[10px] ml-4 bg-[#5698A7] px-1 py-[2px] rounded-md text-gray-50 text-sm">Final
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
                       className="absolute -top-[10px] ml-4 bg-[#5698A7] px-1 py-[2px] rounded-md text-gray-50 text-sm">Metrics</label>
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
                className="bg-[#E74C3C] hover:bg-red-500 p-3 rounded-full shadow-md shadow-gray-500"
                onClick={() => deleteKeyResult(index)}
              >
                <RiDeleteBin6Line className="text-white text-xl"/>
              </button>
            </div>
          </div>
        ))}
        <div className="sticky flex gap-4 bottom-0 px-8 py-4">
          {!objectiveToBeUpdated && <button
              className="self-start bg-[#27667B] hover:bg-blue-600 px-4 py-2 rounded-md text-white shadow-md"
              onClick={addKeyResult}
          >
              Add Key Result
          </button>}
        </div>
      </div>

    </>
  )
}
export default KeyResultInput
