import React, {useContext} from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function CommentCell({comments, setComments}) {
  const { auth } = useContext(AuthContext);
    const deleteComment = (id) => {
        axios
          .delete(`https://grubshare-api.herokuapp.com/api/comment/${id}`)
          .then(() => {
            setComments(
              comments.filter((val) => {
                return val.id !== id;
              })
            );
          });
      };

    return (
        <>
             <p className='mt-2 text-sm text-red-400 font-semibold'>Comments</p>
             {comments.map((comment, index) => (
              <div key={index}>
                 <p className="mt-3 text-sm text-red-400">{comment.username}</p>
                  <div className='flex flex-row'>
                  <p className="text-gray-800">{comment.content}</p>
                  {auth.username === comment.username && ( <svg onClick={() => {
                      deleteComment(comment.id);
                    }} xmlns="http://www.w3.org/2000/svg" className="h-4 w-6 mt-1 stroke-gray-500 hover:stroke-red-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>)}
                  </div>
                 <p className='text-xs text-gray-500'><Moment fromNow>{comment.createdAt}</Moment></p>
              </div>
    ))}
        </>   
    )
}

export default CommentCell
