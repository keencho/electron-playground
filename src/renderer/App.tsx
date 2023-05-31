import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './components/Main/Main';
import GlobalStyle from './global.style';

export default function App() {
  
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}
