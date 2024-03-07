import {BrowserRouter , Routes , Route} from 'react-router-dom'
import MainLayout from './layouts/main-layout';
import { AddNewInventory, Inventory } from './screens';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout/>} />
          
          <Route path="/inventory" element={<MainLayout/>}>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="add" element={<AddNewInventory/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
