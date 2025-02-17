import {useEffect, useState} from "react";
import {OkrInputForm} from "./components/OKRForm/OKRInputForm.tsx";
import {KeyResultsType, ObjectiveType} from "./types/OKRTypes.ts";
import {addKeyResultToDatabase, getOkrsFromDatabase} from "./db/okr-store.tsx"
import {Toast} from './components/Toast.ts'
import './App.css'
import AboutPage from "./components/AboutPage";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {OkrDisplay} from "./components/OKRDisplay";
import AddKrModal from "./components/AddKRModal";
import {Toaster} from "react-hot-toast";
import Navbar from "./components/common/Navbar";

function App() {

  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [currentObjectiveId, setCurrentObjectiveId] = useState<string>("")
  const [objectiveToBeUpdated, setObjectiveToBeUpdated] = useState<ObjectiveType | undefined>(undefined)


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
    <div className="w-full min-h-screen -z-10">
      <div className="w-full min-h-screen ">
        {/* Navigation */}
        <nav className="sticky top-0 z-10 bg-gray-800 text-white p-4 flex justify-between items-center">

          <div className="text-2xl flex  font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            <Navbar/>
            OKR Manager
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/okrInputForm" className="text-white hover:text-gray-300 transition duration-300">
          <span className={`px-4 py-2 rounded-md hover:bg-gray-700 ${isActive('/okrInputForm') ? 'bg-gray-700' : ''}`}>
            OKR Form
          </span>
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition duration-300">
          <span className={`px-4 py-2 rounded-md hover:bg-gray-700 ${isActive('/about') ? 'bg-gray-700' : ''}`}>
            About
          </span>
            </Link>
            <Link to="/okrDisplay" className="text-white hover:text-gray-300 transition duration-300">
          <span className={`px-4 py-2 rounded-md hover:bg-gray-700 ${isActive('/okrDisplay') ? 'bg-gray-700' : ''}`}>
            OKR Display
          </span>
            </Link>
          </div>
        </nav>
        <div className="flex  -z-1">
          <div className="w-full">
          <Routes>
            <Route
              path="/okrInputForm"
              element={
                <OkrInputForm
                  objectiveToBeUpdated={objectiveToBeUpdated}
                  setObjectiveToBeUpdated={setObjectiveToBeUpdated}
                  setIsLoading={setIsLoading}
                  setObjectives={setObjectives}
                  getAllOkrs={getAllOkrs}
                />
              }
            />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/okrDisplay" element={
              <OkrDisplay
                setObjectiveToBeUpdated={setObjectiveToBeUpdated}
                getAllOkrs={getAllOkrs}
                objectives={objectives}
                setIsOpen={setIsOpen}
                setCurrentObjectiveId={setCurrentObjectiveId}
                isLoading={isLoading}
              />
            }/>

          </Routes>
          </div>
        </div>
        {isOpen && (
          <AddKrModal addKeyResult={addKeyResult} setIsOpen={setIsOpen} />
        )}
        <Toaster />
    </div>
</div>
)
  ;
}

export default App;