

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  // Get dispatch function from react-redux and navigate function from react-router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Google sign-in
  const handleGoogleClick = async () => {
    try {
      // Initialize Google provider and Firebase auth
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);

      // Send user data to backend for authentication
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Parse response and dispatch signInSuccess action
      const data = await res.json();
      dispatch(signInSuccess(data));

      // Navigate to homepage
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  // Render the Google sign-in button
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}