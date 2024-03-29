// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Listings from './pages/Listings.jsx';
import Favorites from './pages/Favorites.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComparisonContextProvider } from './context/ComparisonContext.jsx';
import { FavoriteContextProvider } from './context/FavoriteContext.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#b4b5b5'
      }
    },
    typography: {
      button: {
        textTransform: 'none',
        fontWeight: 600
      },
      fontFamily: 'Manrope',
    },
  });

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

    <ComparisonContextProvider>
      <FavoriteContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/listings" element={<Listings/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      </FavoriteContextProvider>
    </ComparisonContextProvider>
  )
}

export default App
