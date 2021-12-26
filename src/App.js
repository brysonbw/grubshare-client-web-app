import './index.css';
import { BrowserRouter as 
  Router,
  Routes,
  Route, 
  useNavigate
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import CreatePost from './pages/createpost/CreatePost';
import DetailPost from './pages/detailpost/DetailPost'
import CommentCell from './components/CommentCell';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import Profile from './pages/profile/Profile';


function App() {
  const { auth, setAuth } = useContext(AuthContext)


  useEffect(() => {
    axios.get('https://grubshare-api.herokuapp.com/api/auth/me', {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        setAuth({ ...auth, isLoggedIn: false });
      } else {
       setAuth({
        email: response.data.email,
        username: response.data.username,
        id: response.data.id,
        isLoggedIn: true 
        })
      }
    })
}, []);


  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
          {!auth.isLoggedIn && <Route path="/" element={<Redirect to="/login" />}/>}
          {auth.isLoggedIn && <Route path="/" element={<Home />}/>}

       {auth.isLoggedIn && <Route path="/login" element={<Redirect to="/" />}/>}
          {!auth.isLoggedIn && <Route path="/login" element={<Login />}/>}

          {auth.isLoggedIn && <Route path="/signup" element={<Redirect to="/" />}/>}
          {!auth.isLoggedIn && <Route path="/signup" element={<Signup />}/>}
      <Route path="/create/post" element={<CreatePost  />}/>
      <Route path="/post/comments" element={<CommentCell />}/>
      <Route path="/detail/post/:id" element={<DetailPost />}/>
      <Route path="/profile/user/:id" element={<Profile />}/>
      <Route path="*"  element={<PageNotFound />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
