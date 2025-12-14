import './App.css'
import Spinner from './components/Spinner'
import RouterConfig from './config/RouterConfig'
import {ToastContainer} from 'react-toastify'
function App() {


  return (
    <div>
      <RouterConfig/>
      <ToastContainer autoClose = {2500} style={{fontSize: "14px"}}/>
      <Spinner/>
    </div>
  )
}

export default App
