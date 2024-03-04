import {BrowserRouter , Routes , Route} from 'react-router-dom'
import MainLayout from './layouts/main-layout';
import { Inventory } from './screens';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/inventory" element={<Inventory />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
