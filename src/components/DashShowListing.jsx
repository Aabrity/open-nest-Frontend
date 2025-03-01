// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function ShowListings() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [userListings, setUserListings] = useState([]);
//   const [showListingsError, setShowListingsError] = useState(false);

//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }
//       setUserListings(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
//       setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     handleShowListings();
//   }, []);

//   return (
//     <div className="p-0 w-[600px] mx-auto ">
//       <h1 className='text-center text-2xl font-semibold my-4'>Your Listings</h1>
//       {showListingsError && <p className='text-red-700 flex flex-col gap-4'>Error showing listings</p>}

//       {userListings.length > 0 ? (
//         userListings.map((listing) => (
//           <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4 '>
//             <Link to={`/listing/${listing._id}`}>
//               <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
//             </Link>
//             <Link
//               className='text-slate-700 font-semibold hover:underline truncate flex-1'
//               to={`/listing/${listing._id}`}
//             >
//               <p>{listing.name}</p>
//             </Link>
//             <div className='flex flex-col items-center'>
//               <button
//                 onClick={() => handleListingDelete(listing._id)}
//                 className='text-red-700 uppercase mb-1'
//               >
//                 Delete
//               </button>
//               <Link to={`/update-listing/${listing._id}`}>
//                 <button className='text-green-700 uppercase'>Edit</button>
//               </Link>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className='text-center'>No listings available.</p>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ShowListings() {
  // Access current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // State for user listings and error handling
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  // Fetch user listings
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // Delete a listing
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch listings on component mount
  useEffect(() => {
    handleShowListings();
  }, []); // Empty dependency array means this runs once on mount

  // Render the component
  return (
    <div className="p-0 w-[600px] mx-auto ">
      <h1 className='text-center text-2xl font-semibold my-4'>Your Listings</h1>
      {/* Show error message if listings fetch fails */}
      {showListingsError && <p className='text-red-700 flex flex-col gap-4'>Error showing listings</p>}

      {/* Conditional rendering: show listings or "No listings available" message */}
      {userListings.length > 0 ? (
        userListings.map((listing) => (
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4 '>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
            </Link>
            <Link
              className='text-slate-700 font-semibold hover:underline truncate flex-1'
              to={`/listing/${listing._id}`}
            >
              <p>{listing.name}</p>
            </Link>
            <div className='flex flex-col items-center'>
              <button
                onClick={() => handleListingDelete(listing._id)}
                className='text-red-700 uppercase mb-1'
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700 uppercase'>Edit</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center'>No listings available.</p>
      )}
    </div>
  );
}