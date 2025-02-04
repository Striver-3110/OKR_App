import {KeyResultsType, ObjectiveType} from "../types/OKRTypes.ts";
import {IoMdAdd} from "react-icons/io";
import React from "react";
import {deleteKeyResultFromDatabase, deleteOkrFromDatabase} from "../db/okr-store";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BiSolidEdit} from "react-icons/bi";


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

  const handleDeleteKeyResult = async (id) => {
    await deleteKeyResultFromDatabase(id);
    getAllOkrs()
  }

  const handleUpdateOkr = async (objective: ObjectiveType) => {
    setObjectiveToBeUpdated(objective)
  }


  const handleEditKeyResult = async (keyResult: KeyResultsType) => {
    // setObjectiveToBeUpdated(objective)

  }

  const handleCompleteKeyResult = (id: string) => {
    // to do
  }


  return (
    <>
      <div
        className="border-2 w-[55%] h-full overflow-y-scroll border-gray-100 bg-gray-50 shadow-md  flex flex-col gap-12 mb-12">
        <h1 className="text-2xl font-bold text-gray-800 ">Objectives</h1>
        {!isLoading && objectives.length > 0 ? (
          objectives.map((objective, index) => (
            <div key={index} className=" border pb-10 border-gray-100 bg-white flex flex-col gap-4 shadow-sm">
              <div
                className="px-8 py-4 top-0 sticky bg-blue-100 border-b-2 flex items-center justify-between">
                <div className="font-semibold text-xl text-gray-800">
                  {objective.title}
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 bg-red-500 rounded-full text-white"
                    onClick={() => handleDeleteOkr(objective)}><RiDeleteBin6Line/></button>
                  <button
                    className="p-2 bg-blue-500 rounded-full text-white"
                    onClick={() => handleUpdateOkr(objective)}><BiSolidEdit/></button>
                </div>
              </div>

              <div className="text-lg text-gray-700 font-medium flex justify-between px-10 py-2 ">
                <div className="">Key Results</div>
                <button className="bg-slate-500 px-2 py-1 rounded-md text-white flex items-center justify-center gap-2"
                        onClick={() => handleOpenModal(objective.id)}
                >
                  <span><IoMdAdd/></span>
                </button>
              </div>
              <div className="px-10 flex flex-row flex-wrap gap-4">
                {
                  objective.keyResults.map((keyResult, index) => {
                    return (
                      <div
                        className=" p-5 w-[calc(50%-8px)] bg-white border border-gray-200 rounded-lg shadow"
                        key={index}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-lg font-bold leading-none uppercase text-gray-900">
                            {index + 1}. {keyResult.title}
                          </h5>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDeleteKeyResult(keyResult.id)}>delete</button>
                            <button onClick={() => handleEditKeyResult(keyResult)}>edit</button>
                            <button onClick={() => handleCompleteKeyResult(keyResult.id)}>complete</button>
                          </div>
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
      {/*<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">*/}
      {/*  <div*/}
      {/*    className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">*/}
      {/*    <span*/}
      {/*      className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>*/}
      {/*    <div className="relative z-10 mx-auto max-w-md">*/}
      {/*      <span*/}
      {/*        className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">*/}
      {/*          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"*/}
      {/*               stroke="currentColor" className="h-10 w-10 text-white transition-all">*/}
      {/*          <path stroke-linecap="round" stroke-linejoin="round"*/}
      {/*                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>*/}
      {/*          </svg>*/}
      {/*      </span>*/}
      {/*      <div*/}
      {/*        className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">*/}
      {/*        <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share*/}
      {/*          online.</p>*/}
      {/*      </div>*/}
      {/*      <div className="pt-5 text-base font-semibold leading-7">*/}
      {/*        <p>*/}
      {/*          <a href="#" className="text-sky-500 transition-all duration-300 group-hover:text-white">Read the docs*/}
      {/*            &rarr;*/}
      {/*          </a>*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  )
}
