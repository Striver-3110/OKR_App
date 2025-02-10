import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import {IoMdAdd} from "react-icons/io";
import React from "react";
import {deleteKeyResultFromDatabase, deleteOkrFromDatabase} from "../db/okr-store";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BiSolidEdit} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";

type OKRDisplayProps = {
  objectives: ObjectiveType[],
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentObjectiveId: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
  getAllOkrs: () => void,
  setObjectiveToBeUpdated: React.Dispatch<React.SetStateAction<ObjectiveType | undefined>>
}

export const OkrDisplay = ({
                             getAllOkrs,
                             objectives,
                             setIsOpen,
                             setCurrentObjectiveId,
                             isLoading,
                             setObjectiveToBeUpdated
                           }: OKRDisplayProps) => {
  const handleOpenModal = (id: string) => {
    setIsOpen((prev) => !prev)
    setCurrentObjectiveId(id);
  }
  const handleDeleteOkr = async (objective: ObjectiveType) => {
    await deleteOkrFromDatabase(objective);
    getAllOkrs();
  }

  const handleDeleteKeyResult = async (id: string) => {
    await deleteKeyResultFromDatabase(id);
    getAllOkrs()
  }

  const handleUpdateOkr = async (objective: ObjectiveType) => {
    setObjectiveToBeUpdated(objective)
  }


  // const handleEditKeyResult = async (keyResult: KeyResultsType) => {
  //   // setObjectiveToBeUpdated(objective)
  //
  // }
  //
  // const handleCompleteKeyResult = (id: string) => {
  //   // to do
  // }


  return (
    <>
      <div
        className="border-2  min-h-screen border-gray-100 bg-gray-200 text-gray-50 flex flex-col gap-10 items-center justify-center ">
        <h1
          className="text-2xl font-bold text-gray-900 pt-9 px-8 flex items-center  justify-center">Objectives</h1>
        {!isLoading && objectives.length > 0 ? (
          objectives.map((objective, index) => (
            <div
              key={index}
              className="bg-gray-100 w-[70%] border pb-10 border-gray-400 rounded-md flex flex-col gap-4 shadow-md shadow-gray-500 mb-12"
            >
              {/* Header Section */}
              <div className="px-6 py-4  bg-gray-300 bg-opacity-70 rounded-t-md flex items-center justify-between border-gray-700">
                <div className="font-semibold text-xl sm:text-2xl text-gray-950">{objective.title}</div>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 p-2 sm:p-3 rounded-full text-lg sm:text-2xl shadow-md shadow-gray-500"
                    onClick={() => handleDeleteOkr(objective)}
                  >
                    <RiDeleteBin6Line className="text-white" />
                  </button>
                  <Link to={"/okrInputForm"}>
                    <button
                      className="p-2 sm:p-3 bg-blue-500 rounded-full text-white text-lg sm:text-2xl shadow-md shadow-gray-500"
                      onClick={() => handleUpdateOkr(objective)}
                    >
                      <BiSolidEdit className="text-white" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Key Results Title */}
              <div className="text-lg text-gray-700 font-medium flex justify-between px-6 sm:px-10 py-2">
                <div className="text-gray-900 text-lg sm:text-xl">Key Results</div>
                <button
                  className="bg-slate-500 px-2 py-2 rounded-full text-lg sm:text-2xl text-white flex items-center justify-center gap-2"
                  onClick={() => handleOpenModal(objective.id)}
                >
                  <IoMdAdd className="text-white" />
                </button>
              </div>

              {/* Key Results Grid */}
              <div className="px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {objective.keyResults.map((keyResult: KeyResultsType, index) => (
                  <div key={index} className="p-5 bg-gray-100 border border-gray-700 shadow rounded-lg">
                    {/* Key Result Title */}
                    <div className="flex items-center p-2 rounded-md bg-gray-300 text-gray-950 justify-between mb-1">
                      <h5 className="text-lg leading-none text-gray-950 truncate w-4/5">
                        {index + 1}. {keyResult.title.length > 20 ? keyResult.title.substring(0, 20) + "..." : keyResult.title}
                      </h5>
                      <button className="text-red-600 text-lg" onClick={() => handleDeleteKeyResult(keyResult.id)}>
                        <MdDelete />
                      </button>
                    </div>

                    {/* Key Result Details */}
                    <div className="flow-root text-sm px-4">
                      <ul role="list" className="divide-y divide-gray-300">
                        {[
                          { icon: "🚀", label: "Initial value", value: keyResult.initialValue },
                          { icon: "📊", label: "Current value", value: keyResult.currentValue },
                          { icon: "🎯", label: "Final value", value: keyResult.finalValue },
                          { icon: "📏", label: "Metrics", value: keyResult.metric },
                        ].map((item, i) => (
                          <li key={i} className="py-1 sm:py-2 flex justify-between">
                            <span className="text-gray-950">{item.icon} {item.label}</span>
                            <span className="font-semibold text-gray-950">{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (isLoading ?
            (<></>) : (
              <span className="text-gray-500 italic w-full  flex items-center justify-center">No objectives to be displayed!</span>)
        )}

      </div>

    </>
  )
}
