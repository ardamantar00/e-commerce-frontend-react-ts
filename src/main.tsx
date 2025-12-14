import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  
<BrowserRouter>
     <Provider store={store}>
        <App />
      </Provider>
</BrowserRouter>
 
 

)
