
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 

export default function Contact({ listing }) {
  // State to store the landlord's information
  const [landlord, setLandlord] = useState(null);
  // State to store the message being composed
  const [message, setMessage] = useState('');

  // Function to handle changes in the message textarea
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Fetch the landlord's information when the component mounts or listing.userRef changes
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (res.ok) {
          setLandlord(data);
        } else {
          toast.error('Failed to fetch landlord information.'); 
        }
      } catch (error) {
        toast.error('Failed to fetch landlord information.'); 
      }
    };
    fetchLandlord();
  }, [listing.userRef]); // Dependency on listing.userRef to re-fetch when it changes

  // Render the component
  return (
    <>
      {/* Conditional rendering: only show contact info if landlord data is available */}
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span> for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          {/* Textarea for composing the message */}
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg dark:bg-gray-600 dark:text-white'
          ></textarea>

          {/* Link to send the email with pre-filled subject and body */}
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}