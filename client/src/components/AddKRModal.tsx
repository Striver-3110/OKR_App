import React, {useState} from "react";
import {initialKeyResult} from "../constants/constants.ts";
import {KeyResultsType} from "../types/OKRTypes.ts";

type AddKrModalProp = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  addKeyResult:( kr: KeyResultsType) => void,
}

const AddKrModal = ({setIsOpen,addKeyResult}: AddKrModalProp) => {

  const [newKr, setNewKr] = useState(initialKeyResult);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setNewKr({...newKr, [name]: e.target.value});
  }

  const handleCancel = () => {
    setIsOpen((prev: boolean) => !prev);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`flex flex-col gap-4 my-4 border px-10 py-6 bg-gray-300 rounded-lg shadow-md shadow-gray-500`}
      >
          <div className="flex w-full justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        <input
          className="w-full py-3 px-4 border border-gray-900 rounded-lg focus:outline-none bg-white shadow-sm shadow-gray-500"
          placeholder="Title"
          value={newKr.title}
          type="text"
          name={"title"}
          onChange={(e) => handleChange(e)}

        />
        <div className="flex gap-4">
          <input
            className="w-full py-3 px-4 border border-gray-900 rounded-lg focus:outline-none bg-white shadow-sm shadow-gray-500"
            placeholder="Initial Value"
            type="number"
            name="initialValue"
            value={newKr.initialValue}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="w-full py-3 px-4 border border-gray-900 rounded-lg focus:outline-none bg-white shadow-sm shadow-gray-500"
            placeholder="Current Value"
            name="currentValue"
            value={newKr.currentValue}
            type="number"
            onChange={(e) => handleChange(e)}

          />
          <input
            className="w-full py-3 px-4 border border-gray-900 rounded-lg focus:outline-none bg-white shadow-sm shadow-gray-500"
            placeholder="Final Value"
            value={newKr.finalValue}
            type="number"
            name={"finalValue"}
            onChange={(e) => handleChange(e)}

          />
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <input
            className="w-4/12 py-3 px-4  border border-gray-900 rounded-lg focus:outline-none bg-white shadow-sm shadow-gray-500"
            placeholder="Metric"
            value={newKr.metric}
            type="text"
            name={"metric"}
            onChange={(e) => handleChange(e)}

          />

          <button
            className="bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-md"
            onClick={() => addKeyResult(newKr)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddKrModal
