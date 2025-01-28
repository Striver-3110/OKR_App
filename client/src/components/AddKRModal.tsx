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
        className={`flex flex-col gap-4 my-4 border px-10 py-6 bg-blue-200 rounded-lg shadow-sm`}
      >
        <input
          className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          placeholder="Title"
          value={newKr.title}
          type="text"
          name={"title"}
          onChange={(e) => handleChange(e)}

        />
        <div className="flex gap-4">
          <input
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            placeholder="Initial Value"
            type="number"
            name="initialValue"
            value={newKr.initialValue}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            placeholder="Current Value"
            name="currentValue"
            value={newKr.currentValue}
            type="number"
            onChange={(e) => handleChange(e)}

          />
          <input
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            placeholder="Final Value"
            value={newKr.finalValue}
            type="number"
            name={"finalValue"}
            onChange={(e) => handleChange(e)}

          />
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <input
            className="w-4/12 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            placeholder="Metrics"
            value={newKr.metrics}
            type="text"
            name={"metrics"}
            onChange={(e) => handleChange(e)}

          />
          <button
            className="bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
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
