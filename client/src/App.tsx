import {useEffect, useState} from "react";
import {OkrInputForm} from "./components/OKRInputForm.tsx";
import {KeyResultsType, ObjectiveType} from "./types/OKRTypes.ts";
import {OkrDisplay} from "./components/OKRDisplay.tsx";
import AddKrModal from "./components/AddKRModal.tsx";
import {addKeyResultToDatabase, getOkrsFromDatabase} from "./db/okr-store.tsx"
import {Toaster} from 'react-hot-toast';
import {Toast} from './components/Toast.ts'
import './App.css'



function App() {

  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState<number>(0)


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)

  const addKeyResult = async (keyResult: KeyResultsType) => {
    setIsOpen(prev => !prev)
    await Toast(addKeyResultToDatabase(currentObjectiveIndex, keyResult),{
      loading: 'Loading',
      success:'successfully added kr?!',
      error:"error while adding kr"
    })
    const responseObjectives = await Toast(getOkrsFromDatabase());

    setObjectives(responseObjectives)
    // objectives[currentObjectiveIndex].keyResults.push(keyResult)
    // setObjectives([...objectives])
    // setIsOpen(prev => !prev)
  }

  useEffect(() => {
    (async () => {
      setIsLoading(prev => !prev)
      const responseOkrsFromDatabase = await Toast(getOkrsFromDatabase());
      setObjectives([...responseOkrsFromDatabase])
      setIsLoading(prev => !prev)
    })()
  }, [])


  return (

    <div className="px-6 pt-3 min-w-full flex  gap-4">
      <OkrInputForm
        setIsLoading={setIsLoading}
        setObjectives={setObjectives}
        objectives={objectives}
      />
      <OkrDisplay objectives={objectives} setIsOpen={setIsOpen}
                  setCurrentObjectiveIndex={setCurrentObjectiveIndex} isLoading={isLoading}/>
      {isOpen && <AddKrModal addKeyResult={addKeyResult} setIsOpen={setIsOpen}/>}
      <Toaster/>
    </div>
  );
}

export default App ;