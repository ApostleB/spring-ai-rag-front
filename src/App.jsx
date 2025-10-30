import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Simple from "./components/Simple.jsx";
import Rag from "./components/Rag.jsx";

function App() {

  return (
      <BrowserRouter>
          <nav className="navbar">
              <Link to="simple">일반 호출</Link>
              <Link to="/rag">Rag 호출</Link>
          </nav>
          <Routes>
              <Route path="/simple" element={<Simple/>}/>
              <Route path="/rag" element={<Rag/>}/>
              <Route path="/" element={<div>404 페이지 요청 없음</div>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
