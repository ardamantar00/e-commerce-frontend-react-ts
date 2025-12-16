import './App.css'
import Spinner from './components/Spinner'
import RouterConfig from './config/RouterConfig'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import type { RootState } from './redux/store'
function App() {
const {currentUser} = useSelector((state : RootState)=>state.app)

  return (
    <div>
      {currentUser &&  <Navbar/>}
      <RouterConfig/>
      <ToastContainer autoClose = {2500} style={{fontSize: "14px"}}/>
      <Spinner/>
    </div>
  )
}

export default App
