import Picture from "./components/Picture";
import Index from "./components/Index";
import './App.css';
import { Routes, Route } from 'react-router-dom';


function App() {
  

  return (
    <main>
      <Routes>
        <Route path="/" element={ <Index/> }/>
        <Route path="/pictures/:pictureId" element={ <Picture/> }/>
      </Routes>
    </main>
      
    
   
  )
}

export default App
