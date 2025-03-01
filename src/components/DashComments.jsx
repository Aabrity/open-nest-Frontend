// import { Modal, Table, Button } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// import { HiTrash } from "react-icons/hi";

// export default function DashComments() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [comments, setComments] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [commentIdToDelete, setCommentIdToDelete] = useState('');
  
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(`/api/comments/getcomments`);
//         const data = await res.json();
//         if (res.ok) {
//           setComments(data.comments);
//           if (data.comments.length < 9) setShowMore(false);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     if (currentUser.isAdmin) fetchComments();
//   }, [currentUser._id]);
  
//   const handleShowMore = async () => {
//     const startIndex = comments.length;
//     try {
//       const res = await fetch(`/api/comments/getcomments?startIndex=${startIndex}`);
//       const data = await res.json();
//       if (res.ok) {
//         setComments((prev) => [...prev, ...data.comments]);
//         if (data.comments.length < 9) setShowMore(false);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleDeleteComment = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(`/api/comments/delete/${commentIdToDelete}`, { method: 'DELETE' });
//       if (res.ok) {
//         setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
    
//     <div className='bg-white overflow-x-auto p-3 w-full dark:bg-gray-800'>
//       <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Comments Table</h2>
//       {currentUser.isAdmin && comments.length > 0 ? (
//         <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
//           <Table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
//             <Table.Head className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
//               <Table.HeadCell>Date</Table.HeadCell>
//               <Table.HeadCell>Comment content</Table.HeadCell>
//               <Table.HeadCell>Listing ID</Table.HeadCell>
//               <Table.HeadCell>User ID</Table.HeadCell>
//               <Table.HeadCell>Delete</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className='divide-y'>
//               {comments.map((comment) => (
//                 <Table.Row key={comment._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                   <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
//                   <Table.Cell>{comment.comment}</Table.Cell>
//                   <Table.Cell>{comment.listing}</Table.Cell>
//                   <Table.Cell>{comment.user}</Table.Cell>
//                   <Table.Cell>
//                     <button
//                       onClick={() => {
//                         setShowModal(true);
//                         setCommentIdToDelete(comment._id);
//                       }}
//                       className='text-red-500 hover:text-red-700 p-2 rounded-full'>
//                       <HiTrash className='w-6 h-6' />
//                     </button>
//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//           {showMore && (
//             <button onClick={handleShowMore} className='w-full text-blue-500 font-semibold py-4 text-center'>
//               Show more
//             </button>
//           )}
//         </div>
//       ) : (
//         <p className='text-center text-gray-500 dark:text-gray-400'>You have no comments yet!</p>
//       )}
//       <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
//         <Modal.Header />
//         <Modal.Body>
//           <div className='text-center'>
//             <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
//             <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
//               Are you sure you want to delete this comment?
//             </h3>
//             <div className='flex justify-center gap-4'>
//               <Button color='failure' onClick={handleDeleteComment}>
//                 Yes, I'm sure
//               </Button>
//               <Button color='gray' onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { HiTrash } from "react-icons/hi";

export default function DashComments() {
  // Access current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // State for comments, showMore button, modal visibility, and comment ID to delete
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  // Fetch comments on component mount if user is admin
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchComments();
  }, [currentUser._id]); // Re-fetch when currentUser changes

  // Fetch more comments when "Show more" button is clicked
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comments/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete a comment
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/comments/delete/${commentIdToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Render the component
  return (
    <div className='bg-white overflow-x-auto p-3 w-full dark:bg-gray-800'>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Comments Table</h2>
      {/* Conditional rendering: show table if user is admin and comments exist */}
      {currentUser.isAdmin && comments.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <Table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <Table.Head className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Listing ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {comments.map((comment) => (
                <Table.Row key={comment._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{comment.comment}</Table.Cell>
                  <Table.Cell>{comment.listing}</Table.Cell>
                  <Table.Cell>{comment.user}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className='text-red-500 hover:text-red-700 p-2 rounded-full'
                    >
                      <HiTrash className='w-6 h-6' />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {/* Show "Show more" button if there are more comments to load */}
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-blue-500 font-semibold py-4 text-center'>
              Show more
            </button>
          )}
        </div>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>You have no comments yet!</p>
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
              <Button color='failure' onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}