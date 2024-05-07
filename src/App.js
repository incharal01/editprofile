import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from './component/home';
import Edit from './component/Edit';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route path='/edit/:id' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
