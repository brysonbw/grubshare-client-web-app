import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        axios
          .get("https://grubshare-api.herokuapp.com/api/post/feed", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((response) => {
            setLoading(false)
            setPosts(response.data);
            setError(null)
          })
          .catch(function (error) {
            if (error.response || error.request) {
              setLoading(false)
              setError('Could not fetch data')
            }
          })
      } 
  }, []);

  if (loading) {
   return <div className='mx-auto text-xl text-center mt-6'>Loading...</div>
  }

  if (error) {
    return <div className='mx-auto text-xl text-center mt-6'>Error: {error}</div>
  }

  
    return (
        <div className='md:container md:mx-auto p-5'>
          <h1 className='text-center text-2xl text-red-400 mb-5 my-2'>Feed</h1>
          {/* Post Card */}
          {posts.map((post) => (
          <div key={post.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 mb-10">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-70 w-full object-cover md:h-full md:w-72" src={`data:image;base64, ${Buffer.from(post.image, "binary").toString('base64')}`} alt="user-post-food-img"/>
    </div>
    <div className="p-8">
      <div className="tracking-wide text-sm text-red-400 font-semibold">
        <Link to={`/profile/user/${post.authorId}`}><h2 className='hover:underline'>{post.author.username}</h2></Link>
      </div>
      <Link  to={`/detail/post/${post.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{post.title}</Link>
      <p className="mt-2 text-gray-800">{post.description}</p>
      <p className="mt-2 text-xs font-semibold text-red-400">ingredients:</p>
      <p className="text-gray-800">{post.ingredients}</p>
      <p className="mt-2 text-xs font-semibold text-red-400">meal:</p>
      <p className="text-gray-800">{post.meal}</p>
      <div className="mt-2 tracking-wide text-sm text-red-400 font-semibold">
        <p><Moment fromNow>{post.createdAt}</Moment></p>
        </div>
    </div>
  </div>
</div>
     ))}
      </div>
    )
}

export default Home