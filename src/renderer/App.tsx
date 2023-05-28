import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './components/Main/Main';
import GlobalStyle from './global.style';
import {useEffect} from 'react';

export default function App() {

  useEffect(() => {
    console.log('hello, world!')
  }, [])

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
