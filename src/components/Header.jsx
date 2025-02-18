import { useEffect, useState } from 'react';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toggleTheme } from '../redux/theme/themeSlice';
import logo from '../assets/logo/logo.png'
import darklogo from '../assets/logo/logowhite.png'

export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='border-b-4 border-teal-500 bg-slate-200 dark:bg-gray-800 dark:text-gray-300 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
       
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span>
          <img
                          src={logo}
                          alt="Open Nest"
                          className="mt-0 w-12 h-12 dark:hidden object-contain" 
                        />
                        <img
                          src={darklogo}
                          alt="Open Nest"
                          className="mt-0 w-12 h-12 hidden dark:block object-contain" 
                        />
                        </span>
            <span className='mt-2 text-slate-500 dark:text-gray-400'>OPEN</span>
            <span className='mt-2 text-slate-700 dark:text-white'>NEST</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 dark:bg-gray-800 p-3 rounded-full flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-80 dark:placeholder-gray-400 dark:text-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600 dark:text-gray-300' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 dark:text-gray-300 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 dark:text-gray-300 hover:underline'>
              About
            </li>
          </Link>
          <div className='flex gap-2 md:order-2 '>
            <Button
              type='button'
              className='w-12 h-8 hidden sm:inline mb-3 bg-slate-200 hover:bg-slate-300 dark:bg-gray-900'
              color='gray'
              pill
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            {currentUser ? (
              <Link to='dashboard?tab=dash'>
                <img
                  className='rounded-full h-8 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              </Link>
            ) : (
              <Link to='/sign-in'>
                <li className='text-slate-700 dark:text-gray-300 hover:underline'>Sign in</li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}
