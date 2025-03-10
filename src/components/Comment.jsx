
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'; 

// Comment component displays a single comment with user info and delete option
export default function Comment({ comment, onDelete }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  // Fetches user data based on the comment's user ID
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.user}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          toast.error('Failed to fetch user data.'); 
        }
      } catch (error) {
        toast.error('Failed to fetch user data.'); 
      }
    };
    getUser();
  }, [comment]);

  const handleDelete = async (commentId) => {
    try {
      await onDelete(commentId);
      toast.success('Comment deleted successfully!'); 
    } catch (error) {
      toast.error('Failed to delete comment.'); 
    }
  };

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.avatar}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.comment}</p>
        {/* Delete button, visible only to comment owner or admin */}
        {currentUser &&
          (currentUser._id === comment.user || currentUser.isAdmin) && (
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => handleDelete(comment._id)}
                className='text-gray-400 hover:text-red-500'
              >
                Delete
              </button>
            </div>
          )}
      </div>
    </div>
  );
}