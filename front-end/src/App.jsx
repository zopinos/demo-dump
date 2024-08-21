import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Routes/Home';
import First from './components/Routes/First';

const App = () => {

  return (
    <Router>
      <div>
        <Link to='/'>home</Link>
        <Link to='/1'>firts thing</Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/1' element={<First />} />
      </Routes>

      <p>
        This is some text.
      </p>
    </Router>
  );
};

export default App;
