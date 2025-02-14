import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
// import DashProfile from '../components/DashProfile';
import DashComments from '../components/DashComments';
import DashPosts from '../components/DashPosts';
import DashShowListing from '../components/DashShowListing';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
import CreateListing from './CreateListing';
import Profile from './Profile';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 bg-slate-200 md:flex-row dark:bg-slate-800'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <Profile />}
       {/* create listing... */}
       {tab === 'createlisting' && <CreateListing />}
        {/* show listing... */}
        {tab === 'showlisting' && <DashShowListing/>}
      {/* listings... */}
      {tab === 'listings' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}