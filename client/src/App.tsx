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
  const [currentObjectiveId, setCurrentObjectiveId] = useState<string>("")
  const [objectiveToBeUpdated, setObjectiveToBeUpdated] = useState<ObjectiveType | undefined>(undefined)


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)

  const addKeyResult = async (keyResult: KeyResultsType) => {
    setIsOpen(prev => !prev)
    await Toast(addKeyResultToDatabase(
      currentObjectiveId, keyResult), {
      loading: 'Loading',
      success: 'successfully added kr?!',
      error: "error while adding kr"
    })
    const responseObjectives = await Toast(getOkrsFromDatabase());

    setObjectives(responseObjectives)
    // objectives[currentObjectiveId].keyResults.push(keyResult)
    // setObjectives([...objectives])
    // setIsOpen(prev => !prev)
  }

  const getAllOkrs = async () => {
    setIsLoading(prev => !prev)
    const responseOkrsFromDatabase = await Toast(getOkrsFromDatabase());
    console.log(responseOkrsFromDatabase)
    // console.log(responseOkrsFromDatabase)
    setObjectives([...responseOkrsFromDatabase])
    setIsLoading(prev => !prev)
  }

  useEffect(() => {
    getAllOkrs()
  }, [])


  return (
    <div className="w-screen h-screen flex  overflow-y-hidden ">

      <OkrInputForm
        objectiveToBeUpdated={objectiveToBeUpdated}
        setIsLoading={setIsLoading}
        setObjectives={setObjectives}
        getAllOkrs={getAllOkrs}
      />
      <OkrDisplay
        setObjectiveToBeUpdated={setObjectiveToBeUpdated}
        getAllOkrs={getAllOkrs}
        objectives={objectives}
        setIsOpen={setIsOpen}
        setCurrentObjectiveId={setCurrentObjectiveId}
        isLoading={isLoading}/>
      {isOpen &&
          <AddKrModal
              addKeyResult={addKeyResult}
              setIsOpen={setIsOpen}/>}
      <Toaster/>
    </div>
  );
}

export default App;