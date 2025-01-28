import {ObjectiveType} from "../types/OKRTypes.ts";
import {IoMdAdd} from "react-icons/io";
import React from "react";
import {deleteOkrFromDatabase} from "../db/okr-store";

type OKRDisplayProps = {
  objectives: ObjectiveType[],
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentObjectiveId: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
  getAllOkrs: () => void,
}


export const OkrDisplay = ({
                             getAllOkrs,
                             objectives,
                             setIsOpen,
                             setCurrentObjectiveId,
                             isLoading
                           }: OKRDisplayProps) => {
  const handleOpenModal = (id: string) => {
    setIsOpen((prev) => !prev)
    setCurrentObjectiveId(id);
  }
  const handleDeleteOkr = async (id: string) => {
    console.log(id)
    await deleteOkrFromDatabase(id);
    getAllOkrs();
  }


  return (
    <>
      <div
        className="border-2 w-[55%] h-full overflow-y-auto border-gray-100 bg-gray-50 rounded-lg shadow-md px-6 py-6 flex flex-col gap-12 mb-12">
        <h1 className="text-2xl font-bold text-gray-800 ">Objectives</h1>
        {!isLoading && objectives.length > 0 ? (
          objectives.map((objective, index) => (
            <div key={index} className="border pb-10 border-gray-300 bg-white flex flex-col gap-4 rounded-lg shadow-sm">
              <div
                className="pl-8 py-4 bg-blue-100 border-b-2 font-semibold text-xl text-gray-800 rounded-t-lg">
                {objective.title}
              </div>
              <button onClick={() => handleDeleteOkr(objective.id)}>delete</button>
              <div className="text-lg text-gray-700 font-medium flex justify-between px-10 py-2 ">
                <div className="">Key Results</div>
                <button className="bg-slate-500 px-2 py-1 rounded-md text-white flex items-center justify-center gap-2"
                        onClick={() => handleOpenModal(objective.id)}
                >
                  <span><IoMdAdd/></span>
                </button>
              </div>
              <div className="px-10 flex flex-wrap gap-4">
                {
                  objective.keyResults.map((keyResult, index) => {
                    return (
                      <div
                        className="w-full p-5 bg-white border border-gray-200 rounded-lg shadow"
                        key={index}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-lg font-bold leading-none uppercase text-gray-900">
                            {index + 1}. {keyResult.title}
                          </h5>
                          <button></button>
                        </div>
                        <div className="flow-root text-sm">
                          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-300">
                            <li className="py-1 sm:py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">😊</div>
                                <div className="flex-1 min-w-0 ms-2">
                                  <p className="text-sm font-medium text-gray-900 truncate">initial value</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  {keyResult.initialValue}
                                </div>
                              </div>
                            </li>
                            <li className="py-1 sm:py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">😊</div>
                                <div className="flex-1 min-w-0 ms-2">
                                  <p className="text-sm font-medium text-gray-900 truncate">current value</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  {keyResult.currentValue}
                                </div>
                              </div>
                            </li>
                            <li className="py-1 sm:py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">😊</div>
                                <div className="flex-1 min-w-0 ms-2">
                                  <p className="text-sm font-medium text-gray-900 truncate">final value</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  {keyResult.finalValue}
                                </div>
                              </div>
                            </li>
                            <li className="py-1 sm:py-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">😊</div>
                                <div className="flex-1 min-w-0 ms-2">
                                  <p className="text-sm font-medium text-gray-900 truncate">metrics</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  {keyResult.metrics}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })
                }
              </div>

            </div>
          ))
        ) : (isLoading ?
            (<>Loading...</>) : (<span className="text-gray-500 italic">No objectives yet!</span>)
        )}
      </div>
    </>
  )
}
