// import { useEffect, useState } from 'react';
// import {
//     FaBath,
//     FaBed,
//     FaChair,
//     FaMapMarkerAlt,
//     FaParking,
//     FaShare
// } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import { Navigation } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import CommentSection from '../components/commentSection';
// // import Contact from '../components/Contact';


// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <main>
//       {loading && <p className='text-center my-7 text-2xl dark: text-white'>Loading...</p>}
//       {error && (
//         <p className='text-center my-7 text-2xl dark: text-white'>Something went wrong!</p>
//       )}
//       {listing && !loading && !error && (
//         <div>
//           <Swiper navigation>
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className='h-[550px]'
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     backgroundSize: 'cover',
//                   }}
//                 ></div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer dark: bg-slate-700'>
//             <FaShare
//               className='text-white dark:text-white '
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 dark:text-white dark:bg-slate-700'>
//               Link copied!
//             </p>
//           )}
//           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold text-black dark:text-white'>
//               {listing.name} - ${' '}
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString('en-US')
//                 : listing.regularPrice.toLocaleString('en-US')}
//               {listing.type === 'rent' && ' / month'}
//             </p>
//             <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm dark:text-white'>
//               <FaMapMarkerAlt className='text-green-700' />
//               {listing.address}
//             </p>
//             <div className='flex gap-4'>
//               <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md dark:text-white'>
//                 {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//               </p>
//               {listing.offer && (
//                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md dark:text-white'>
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </p>
//               )}
//             </div>
//             <p className='text-slate-800 dark:text-white'>
//               <span className='font-semibold text-slate-800 dark:text-white'>Description - </span>
//               {listing.description}
//             </p>
//             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 dark:text-red-900'>
//               <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900 '>
//                 <FaBed className='text-lg' />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900 '>
//                 <FaBath className='text-lg' />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap  dark:text-red-900'>
//                 <FaParking className='text-lg' />
//                 {listing.parking ? 'Parking spot' : 'No Parking'}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap  dark:text-red-900'>
//                 <FaChair className='text-lg' />
//                 {listing.furnished ? 'Furnished' : 'Unfurnished'}
//               </li>
//             </ul>
//             <CommentSection listingId={listing._id}/>
//             {currentUser && listing.userRef !== currentUser._id && !contact && (
//               <button
//                 onClick={() => setContact(true)}
//                 className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
//               >
//                 Contact landlord
//               </button>
//             )}
//             {contact && <Contact listing={listing} />}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }



import { useEffect, useState } from 'react';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaThumbsUp, FaHeart, FaRegHeart, FaRegThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import CommentSection from '../components/commentSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [liked, setLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(0); 
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchLikesCount = async () => {
      try {
        const res = await fetch(`/api/like/likes/count/${params.listingId}`);
        const data = await res.json();
        setLikesCount(data.likesCount);
      } catch (error) {
        console.error('Failed to fetch likes count:', error);
      }
    };

    fetchListing();
    fetchLikesCount();

    // Persist liked status per user using currentUser.id and listingId in localStorage
    const userLikedStatus = localStorage.getItem(`liked_${currentUser._id}_${params.listingId}`);
    if (userLikedStatus === 'true') {
      setLiked(true);
    } else if (userLikedStatus === 'false') {
      setLiked(false);
    }
  }, [params.listingId, currentUser._id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/like/like/${params.listingId}`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setLiked(true);
        setLikesCount((prevCount) => prevCount + 1); 
        // Persist the like status in localStorage with the current user ID and listing ID
        localStorage.setItem(`liked_${currentUser._id}_${params.listingId}`, 'true');
      }
    } catch (error) {
      console.error('Error liking listing:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      const res = await fetch(`/api/like/like/${params.listingId}`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setLiked(false);
        setLikesCount((prevCount) => prevCount - 1); 
        // Persist the unlike status in localStorage with the current user ID and listing ID
        localStorage.setItem(`liked_${currentUser._id}_${params.listingId}`, 'false');
      }
    } catch (error) {
      console.error('Error unliking listing:', error);
    }
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl dark:text-white'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl dark:text-white'>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer dark:bg-slate-700'>
            <FaShare
              className='text-white dark:text-white'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 dark:text-white dark:bg-slate-700'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold text-black dark:text-white'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm dark:text-white'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md dark:text-white'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md dark:text-white'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800 dark:text-white'>
              <span className='font-semibold text-slate-800 dark:text-white'>Description - </span>
              {listing.description}
            </p>

            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 dark:text-red-900'>
              <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap dark:text-red-900'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Like/Unlike Buttons */}
            <div className='flex items-center'>
              {!liked ? (
                <button
                  onClick={handleLike}
                  className='flex item-center gap-2'
                  // className='flex items-center gap-2 bg-blue-500 text-white rounded-lg p-3'
                >
                  <div  className='flex items-center gap-2 bg-blue-500 text-white rounded-lg p-3'>
                  <FaRegHeart />
                  </div>
                  Like ({likesCount})
                </button>
                
              ) : (
                <button
                  onClick={handleUnlike}
                  className='flex item-center gap-2'
                  // className='flex items-center gap-2 bg-red-500 text-white rounded-lg p-3'
                >
                  <div className='flex items-center gap-2 bg-red-500 text-white rounded-lg p-3'>
                  <FaHeart />
                  </div>
                  Unlike ({likesCount})
                </button>
              )}
            </div>

            <CommentSection listingId={listing._id}/>

            {/* Contact Button */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}