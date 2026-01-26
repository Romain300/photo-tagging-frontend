import Picture from "./components/Picture";
import Index from "./components/Index";
import './App.css';
import NotFound from "./components/404NotFound";
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";


function App() {
  

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={ <Index/> }/>
          <Route path="/pictures/:pictureId" element={ <Picture/> }/>
          <Route path="/404NotFound" element={ <NotFound/> }/>
          <Route path="*" element={ <NotFound/> }/>
        </Routes>
      </main>
      <Footer githubUrl="https://github.com/Romain300"/>
    </>
    
    
      
    
   
  )
}

export default App
