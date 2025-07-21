import './App.css'
import { LanguageProvider } from './components/LanguageContext';


import { useEffect } from 'react';
import Router from './components/Router.jsx';

function App() {

  return (
    <>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </>
  )
}

export default App
