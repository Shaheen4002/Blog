import  {BrowserRouter as Router ,Routes , Route } from "react-router-dom"
import { NavBar} from "./Components/Navbar"
import { Register } from "./Pages/Register"
import { Login } from "./Pages/Login"
import Home from "./Pages/Home"
import SinglePost from "./Pages/SinglePost"
import {ProtectedRoute} from "./Components/ProtectedRoute"
import AuthProvider from "./Context/Auth/AuthProvidor"
import Footer from "./Components/Footer"
import Profile from "./Pages/Profile"
import CreatePost from "./Pages/CreatePost"
import EditPostForm from "./Pages/Edit"
import MyProfile from "./Pages/myProfile"

const App = () => {

  return(
    <>
    <AuthProvider>
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element= {<Home />}/>
      <Route path="/register" element = {<Register />}/>
      <Route path="/login" element = {<Login />}/>
      <Route element = {<ProtectedRoute />}>
        <Route path="/posts/:id" element = {<SinglePost/>} />
        <Route path ="/posts/edit/:id" element ={<EditPostForm/>} />
        <Route path ="/users/:id" element = {<Profile />} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/myProfile" element ={<MyProfile />}/>
      </Route>
    </Routes>
    <Footer/>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
