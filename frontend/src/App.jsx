import AppRouter from './routers/AppRouter';
import './App.css'
import { Toaster } from 'react-hot-toast';

function App() {
// production fix
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  )
}

export default App
