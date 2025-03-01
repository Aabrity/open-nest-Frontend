

import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'; 

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    // Convert the file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64File = reader.result;
      setFormData({ ...formData, avatar: base64File });
    };

    reader.onerror = () => {
      toast.error('Failed to upload image. Please try again.'); 
    };
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message); 
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success('Profile updated successfully!'); 
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error('Failed to update profile. Please try again.'); 
    }
  };

  return (
    <div className='w-full'>
      <div className='p-0 w-[600px] mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
          <p className='text-sm self-center'>
            {filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type='text'
            placeholder='username'
            defaultValue={currentUser.username}
            id='username'
            className='border p-3 rounded-lg placeholder-black dark:bg-gray-800'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='email'
            id='email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg placeholder-black dark:bg-gray-800'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            id='password'
            className='border p-3 rounded-lg placeholder-black dark:bg-gray-800'
          />

          <button
            disabled={loading}
            className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}