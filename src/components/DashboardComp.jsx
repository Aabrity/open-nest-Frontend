


// import { Button, Table } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import logo from '../assets/logo/logo.png';
// import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function DashboardComp() {
//   const [users, setUsers] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [listings, setListings] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalListings, setTotalListings] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const [lastMonthUsers, setLastMonthUsers] = useState(0);
//   const [lastMonthListings, setLastMonthListings] = useState(0);
//   const [lastMonthComments, setLastMonthComments] = useState(0);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (currentUser?.isAdmin) {
//       const fetchData = async (url, setter, totalSetter, lastMonthSetter) => {
//         try {
//           const res = await fetch(url);
//           const data = await res.json();
//           if (res.ok) {
//             setter(data.users || data.listings || data.comments);
//             totalSetter(data.totalUsers || data.totalListings || data.totalComments);
//             lastMonthSetter(data.lastMonthUsers || data.lastMonthListings || data.lastMonthComments);
//           }
//         } catch (error) {
//           console.log(error.message);
//         }
//       };

//       fetchData('/api/admin/getusers?limit=5', setUsers, setTotalUsers, setLastMonthUsers);
//       fetchData('/api/listing/gets?limit=5', setListings, setTotalListings, setLastMonthListings);
//       fetchData('/api/comments/getcomments?limit=5', setComments, setTotalComments, setLastMonthComments);
//     }
//   }, [currentUser]);

//   if (!currentUser?.isAdmin) {
//     return (
//       <div className='flex justify-center items-center h-full w-full'>
//         <img src={logo} alt='Dashboard' className='w-1/2 h-auto' />
//       </div>
//     );
//   }

//   return (
//     <div className='p-4 md:mx-auto'>
//       <div className='flex-wrap flex gap-6 justify-center'>
//         {/* Statistics Cards */}
//         {[
//           { title: 'Total Users', count: totalUsers, lastMonth: lastMonthUsers, Icon: HiOutlineUserGroup, bg: 'bg-teal-600' },
//           { title: 'Total Comments', count: totalComments, lastMonth: lastMonthComments, Icon: HiAnnotation, bg: 'bg-indigo-600' },
//           { title: 'Total Listings', count: totalListings, lastMonth: lastMonthListings, Icon: HiDocumentText, bg: 'bg-lime-600' },
//         ].map(({ title, count, lastMonth, Icon, bg }, index) => (
//           <div key={index} className='flex flex-col p-4 dark:bg-slate-800 gap-4 w-72 rounded-md shadow-lg'>
//             <div className='flex justify-between items-center'>
//               <div>
//                 <h3 className='text-gray-500 text-sm uppercase'>{title}</h3>
//                 <p className='text-2xl font-semibold'>{count}</p>
//               </div>
//               <Icon className={`${bg} text-white rounded-full text-5xl p-3 shadow-lg`} />
//             </div>
//             <div className='flex gap-2 text-sm'>
//               <span className='text-green-500 flex items-center'>
//                 <HiArrowNarrowUp />
//                 {lastMonth}
//               </span>
//               <span className='text-gray-500'>Last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tables Section */}
//       <div className='gap-6 py-6'>
//         {[
       
//           {
//             title: 'Recent Listings',
//             data: listings,
//             headers: ['Listing Image', 'Category'],
//             renderRow: (listing) => (
//               <>
//                 <Table.Cell>
//                   <img src={listing.imageUrls[0]} alt='listing' className='w-16 h-12 rounded-md shadow-sm' />
//                 </Table.Cell>
//                 <Table.Cell className='font-medium'>{listing.type}</Table.Cell>
//               </>
//             ),
//             link: '/dashboard?tab=posts',
//           },
//         ].map(({ title, data, headers, renderRow, link }, index) => (
//           <div key={index} className='flex flex-col w-full md:w-auto shadow-lg p-4 rounded-lg dark:bg-gray-800'>
//             <div className='flex justify-between items-center p-3 border-b dark:border-gray-700'>
//               <h1 className='text-lg font-semibold'>{title}</h1>
//               <Button outline gradientDuoTone='purpleToPink'>
//                 <Link to={link}>See all</Link>
//               </Button>
//             </div>
//             <Table hoverable className='mt-2'>
//               <Table.Head>
//                 {headers.map((header, idx) => (
//                   <Table.HeadCell key={idx} className='text-gray-600 dark:text-gray-300'>
//                     {header}
//                   </Table.HeadCell>
//                 ))}
//               </Table.Head>
//               <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
//                 {data.length > 0 ? (
//                   data.map((item) => (
//                     <Table.Row key={item._id} className='bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'>
//                       {renderRow(item)}
//                     </Table.Row>
//                   ))
//                 ) : (
//                   <Table.Row>
//                     <Table.Cell colSpan={headers.length} className='text-center text-gray-500 dark:text-gray-400 p-4'>
//                       No data available
//                     </Table.Cell>
//                   </Table.Row>
//                 )}
//               </Table.Body>
//             </Table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo/logo.png';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  // State variables for users, comments, listings, and statistics
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [listings, setListings] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthListings, setLastMonthListings] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  // Access the current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Fetch data on component mount if the user is an admin
  useEffect(() => {
    if (currentUser?.isAdmin) {
      // Function to fetch data from API and update state
      const fetchData = async (url, setter, totalSetter, lastMonthSetter) => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (res.ok) {
            // Update state with fetched data
            setter(data.users || data.listings || data.comments);
            totalSetter(data.totalUsers || data.totalListings || data.totalComments);
            lastMonthSetter(data.lastMonthUsers || data.lastMonthListings || data.lastMonthComments);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      // Fetch data for users, listings, and comments
      fetchData('/api/admin/getusers?limit=5', setUsers, setTotalUsers, setLastMonthUsers);
      fetchData('/api/listing/gets?limit=5', setListings, setTotalListings, setLastMonthListings);
      fetchData('/api/comments/getcomments?limit=5', setComments, setTotalComments, setLastMonthComments);
    }
  }, [currentUser]); // Re-run effect when currentUser changes

  // Render a placeholder if the user is not an admin
  if (!currentUser?.isAdmin) {
    return (
      <div className='flex justify-center items-center h-full w-full'>
        <img src={logo} alt='Dashboard' className='w-1/2 h-auto' />
      </div>
    );
  }

  // Render the dashboard component
  return (
    <div className='p-4 md:mx-auto'>
      {/* Statistics Cards */}
      <div className='flex-wrap flex gap-6 justify-center'>
        {[
          { title: 'Total Users', count: totalUsers, lastMonth: lastMonthUsers, Icon: HiOutlineUserGroup, bg: 'bg-teal-600' },
          { title: 'Total Comments', count: totalComments, lastMonth: lastMonthComments, Icon: HiAnnotation, bg: 'bg-indigo-600' },
          { title: 'Total Listings', count: totalListings, lastMonth: lastMonthListings, Icon: HiDocumentText, bg: 'bg-lime-600' },
        ].map(({ title, count, lastMonth, Icon, bg }, index) => (
          <div key={index} className='flex flex-col p-4 dark:bg-slate-800 gap-4 w-72 rounded-md shadow-lg'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-gray-500 text-sm uppercase'>{title}</h3>
                <p className='text-2xl font-semibold'>{count}</p>
              </div>
              <Icon className={`${bg} text-white rounded-full text-5xl p-3 shadow-lg`} />
            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonth}
              </span>
              <span className='text-gray-500'>Last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className='gap-6 py-6'>
        {[
          {
            title: 'Recent Listings',
            data: listings,
            headers: ['Listing Image', 'Category'],
            renderRow: (listing) => (
              <>
                <Table.Cell>
                  <img src={listing.imageUrls[0]} alt='listing' className='w-16 h-12 rounded-md shadow-sm' />
                </Table.Cell>
                <Table.Cell className='font-medium'>{listing.type}</Table.Cell>
              </>
            ),
            link: '/dashboard?tab=posts',
          },
        ].map(({ title, data, headers, renderRow, link }, index) => (
          <div key={index} className='flex flex-col w-full md:w-auto shadow-lg p-4 rounded-lg dark:bg-gray-800'>
            <div className='flex justify-between items-center p-3 border-b dark:border-gray-700'>
              <h1 className='text-lg font-semibold'>{title}</h1>
              <Button outline gradientDuoTone='purpleToPink'>
                <Link to={link}>See all</Link>
              </Button>
            </div>
            <Table hoverable className='mt-2'>
              <Table.Head>
                {headers.map((header, idx) => (
                  <Table.HeadCell key={idx} className='text-gray-600 dark:text-gray-300'>
                    {header}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
                {data.length > 0 ? (
                  data.map((item) => (
                    <Table.Row key={item._id} className='bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'>
                      {renderRow(item)}
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={headers.length} className='text-center text-gray-500 dark:text-gray-400 p-4'>
                      No data available
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}