
import './App.css'
import Home from './pages/Home'
import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'

function App() {

  return (
    <>


      <ReactFlowProvider>
    <Home />
    </ReactFlowProvider>

    </>
  )
}

export default App
