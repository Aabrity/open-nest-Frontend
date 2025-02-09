import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutUserStart, deleteUserFailure, deleteUserSuccess, deleteUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
         dispatch(signOutUserStart());
         const res = await fetch('/api/auth/signout');
         const data = await res.json();
         if (data.success === false) {
           dispatch(deleteUserFailure(data.message));
           return;
         }
         dispatch(deleteUserSuccess(data));
       } catch (error) {
         dispatch(deleteUserFailure(data.message));
       }
  };
  const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
  return (
    <Sidebar className="w-full md:w-56 h-screen flex flex-col "  >


      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col flex-1 gap-3 overflow-y-auto'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=createlisting'>
            <Sidebar.Item
              active={tab === 'createlisting'}
              icon={HiUser}
             
              as='div'
            >
              Create Listing
            </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=showlisting'>
            <Sidebar.Item
              active={tab === 'showlisting'}
              icon={HiUser}
             
              as='div'
            >
              Your Listings
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='text-red-700 cursor-pointer dark:text-red-700 dark:cursor-pointer'
            onClick={handleDeleteUser}
          >
            Delete Account
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}