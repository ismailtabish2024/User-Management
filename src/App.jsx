
import './App.css'
import UserList from './UserList'
import AddUser from './AddUser'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
     <div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </div>
     
    </>
)};

export default App
