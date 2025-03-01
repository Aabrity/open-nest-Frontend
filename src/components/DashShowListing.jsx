

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 

export default function ShowListings() {
  // Access current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // State for user listings
  const [userListings, setUserListings] = useState([]);

  // Fetch user listings
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error('Failed to fetch listings.'); 
        return;
      }
      setUserListings(data);
    } catch (error) {
      toast.error('Failed to fetch listings.'); 
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
        toast.error(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      toast.success('Listing deleted successfully!'); 
    } catch (error) {
      toast.error('Failed to delete listing.'); 
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