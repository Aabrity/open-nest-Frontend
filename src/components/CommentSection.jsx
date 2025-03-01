

import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast'; 

export default function CommentSection({ listingId }) {
  // State and Redux access
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || comment.length > 200) {
      toast.error(comment.trim() ? 'Comment exceeds 200 characters.' : 'Comment cannot be empty.');
      return;
    }
    try {
      const newComment = { comment };
      setComment('');
      const res = await fetch(`/api/comments/add/${listingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
        credentials: 'include', 
      });
      if (!res.ok) throw new Error('Failed to post comment');
      const data = await res.json();
      setComments([data, ...comments]);
      toast.success('Comment posted successfully!'); 
    } catch (error) {
      toast.error(error.message || 'Something went wrong.'); 
    }
  };

  // Fetch comments on component mount and listingId change
  useEffect(() => {
    const controller = new AbortController();
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/get/${listingId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error(error.message); 
        }
      }
    };

    if (listingId) fetchComments();
    return () => controller.abort(); 
  }, [listingId]);

  // Handle comment deletion
  const handleDelete = async () => {
    setShowModal(false);
    const prevComments = [...comments];
    setComments(comments.filter((comment) => comment._id !== commentToDelete));

    try {
      const res = await fetch(`/api/comments/delete/${commentToDelete}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies for authentication
      });
      if (!res.ok) throw new Error('Failed to delete comment');
      toast.success('Comment deleted successfully!'); 
    } catch (error) {
      toast.error(error.message || 'Failed to delete comment.'); 
      setComments(prevComments); 
    }
  };

  // Render the component
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {/* Display user info or sign-in message */}
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img className='h-5 w-5 object-cover rounded-full' src={currentUser.avatar} alt='' />
          <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to='/sign-in'>Sign In</Link>
        </div>
      )}

      {/* Comment input form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>Submit</Button>
          </div>
        </form>
      )}

      {/* Display comments or "No comments" message */}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'><p>{comments.length}</p></div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}