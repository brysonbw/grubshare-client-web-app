import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment-timezone';
import { Buffer } from 'buffer';
import { useParams } from 'react-router-dom';
import AddComment from '../../components/AddComment';
import { useNavigate } from 'react-router-dom';
import CommentCell from '../../components/CommentCell';
import { AuthContext } from "../../context/AuthContext";

function DetailPost() {
  let { id } = useParams()
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [postDetail, setPostDetail] = useState({
    image: []
});
const { auth } = useContext(AuthContext);

const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get(`https://grubshare-api.herokuapp.com/api/post/${id}`).then((response) => {
      setLoading(false)
      setPostDetail(response.data);
      setError(null)
    }).catch(function (error) {
      if (error.response || error.request) {
        setLoading(false)
        setError('Could not fetch data')
      }
    })

    axios.get(`https://grubshare-api.herokuapp.com/api/comment/${id}`).then((response) => {
      setLoading(false)
      setComments(response.data);
      setError(null)
    }).catch(function (error) {
      if (error.response || error.request) {
        setLoading(false)
        setError('Could not fetch data')
      }
    })
  }, []);

  if (loading) {
    return <div className='mx-auto text-xl text-center mt-6'>Loading...</div>
   }

   if (error) {
    return <div className='mx-auto text-xl text-center mt-6'>Error: {error}</div>
  }


  const deletePost = (id) => {
    axios
      .delete(`https://grubshare-api.herokuapp.com/api/post/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        navigate('/');
      });
  };


    return (
      <div className='md:container md:mx-auto p-5'>
       {/* Post Card */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 mb-10">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-70 w-full object-cover md:h-full md:w-48" src={`data:image;base64, ${Buffer.from(postDetail.image, "binary").toString('base64')}`} alt="user-post-food-img"/>
    </div>
    <div className="p-8">
      <div>
    <button className='py-1 px-3 mb-1 rounded-full text-white bg-red-400 hover:bg-red-500' onClick={() => navigate(-1)}>Back</button>
      </div>
      <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{postDetail.title}</h1>
      <p className="mt-2 text-gray-800">{postDetail.description}</p>
      <p className="mt-2 text-xs font-semibold text-red-400">ingredients:</p>
      <p className="text-gray-800">{postDetail.ingredients}</p>
      <p className="mt-2 text-xs font-semibold text-red-400">meal:</p>
      <p className="text-gray-800">{postDetail.meal}</p>
      <div className="mt-2 tracking-wide text-sm text-red-400 font-semibold">
        <p><Moment format={'LL'}>{postDetail.createdAt}</Moment></p>
</div>
               {auth.id === postDetail.authorId && (<svg onClick={() => {
                  deletePost(postDetail.id);
                }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-2 stroke-gray-500 hover:stroke-red-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>)}
    </div>
  </div>
</div>
<div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 mb-10">
<AddComment id={id} setComments={setComments} comments={comments} />
<CommentCell comments={comments} setComments={setComments} />
</div>
        </div>
    )
}

export default DetailPost
