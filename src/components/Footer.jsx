import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import logo from '../assets/logo/logo.png';
import darkLogo from '../assets/logo/logowhite.png'

export default function FooterCom() {
  return (
    <Footer container className='border-t-8 border-teal-500 bg-white dark:bg-gray-900 dark:text-gray-300'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
       
          <div className='mt-0'>
          <img
              src={logo}
              alt="Open Nest"
              className="mt-4 w-16 h-16 dark:hidden" 
            />
            <img
              src={darkLogo}
              alt="Open Nest"
              className="mt-4 w-16 h-16 hidden dark:block" 
            />
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 rounded-lg text-black dark:text-white'>
                Open Nest
              </span>{' '}
              
            </Link>
           
          </div>
         

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' className='text-gray-800 dark:text-gray-300' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 dark:text-gray-400 hover:underline'
                >
                  Open Nest
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow us' className='text-gray-800 dark:text-gray-300' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'
                  className='text-gray-600 dark:text-gray-400 hover:underline'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#' className='text-gray-600 dark:text-gray-400 hover:underline'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' className='text-gray-800 dark:text-gray-300' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' className='text-gray-600 dark:text-gray-400 hover:underline'>
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' className='text-gray-600 dark:text-gray-400 hover:underline'>
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider className='border-gray-300 dark:border-gray-600' />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Open Nest"
            year={new Date().getFullYear()}
            className='text-gray-700 dark:text-gray-400'
          />

          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} className='text-gray-700 dark:text-gray-400' />
            <Footer.Icon href='#' icon={BsInstagram} className='text-gray-700 dark:text-gray-400' />
            <Footer.Icon href='#' icon={BsTwitter} className='text-gray-700 dark:text-gray-400' />
            <Footer.Icon href='#' icon={BsDribbble} className='text-gray-700 dark:text-gray-400' />
          </div>
        </div>
      </div>
    </Footer>
  );
}
