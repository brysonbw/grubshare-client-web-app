import React, { useContext } from "react";
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom'


function Navbar() {
  const { auth, logout } = useContext(AuthContext)


    return (
<Disclosure as="nav" className='bg-red-400'>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center md:mr-10 xs:mx-auto">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src='/grubshare-logo.png'
                    alt="grubshare-logo-img"
                  />
                  <Link to='/'><h1 className='text-white'>GrubShare</h1></Link>
                  <img
                    className="hidden lg:block h-8 w-auto pl-1"
                    src='/grubshare-logo.png'
                    alt="grubshare-logo-img"
                  />
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:block sm:ml-6">
                  {auth.isLoggedIn ? (
                    <>
                    <Link 
                      to="/"
                      
                        className='pl-1 px-4 py-2 rounded-md text-sm font-medium text-white no-underline hover:underline'
                      >
                        Home
                      </Link>
                  
                      <Link 
                      to='/create/post'
                        className='pl-1 px-4 py-2 rounded-md text-sm font-medium text-white no-underline hover:underline'
                      >
                        Create Post
                      </Link>

                      <Link 
                      to='#'
                        className='cursor-text pl-1 px-4 py-2 rounded-md text-sm text-white'
                      >
                        hello, {auth.username}
                      </Link>

                      </> 
                  ) : (
                    <>
                      <Link 
                      to="/login"
                        className='pl-1 px-4 py-2 rounded-md text-sm font-medium text-white no-underline hover:underline'
                      >
                        Login
                      </Link>

                      <Link 
                      to='signup'
                        className='pl-1 px-4 py-2 rounded-md text-sm font-medium text-white no-underline hover:underline'
                      >
                        Signup
                      </Link>
                      </> 
                    )}
                </div>
                {auth.isLoggedIn && (
                <Link to='/login'
                  className="bg-gray-500 p-2 py-1 px-3 rounded-full text-white hover:bg-red-500"
                  onClick={logout} > Logout
                </Link>
                )}
              </div>
            </div>
          </div>


          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
            {auth.isLoggedIn ? (
                    <>
                     <p className='text-white block px-3 py-2 rounded-md text-base'>hello, {auth.username}</p>
                      <Disclosure.Button as={Link} 
                      to="/"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium no-underline hover:underline"
                        
                      >
                        Home
                      </Disclosure.Button>

                      <Disclosure.Button as={Link} 
                      to='/create/post'
                        className="text-white block px-3 py-2 rounded-md text-base font-medium no-underline hover:underline"
                      >
                        Create Post
                      </Disclosure.Button>
                      </> 
                  ) : (
                    <>
                      <Disclosure.Button as={Link}
                      to="/login"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium no-underline hover:underline"
                      >
                        Login
                      </Disclosure.Button>

                      <Disclosure.Button as={Link} 
                      to='signup'
                        className="text-white block px-3 py-2 rounded-md text-base font-medium no-underline hover:underline"
                      >
                        Signup
                      </Disclosure.Button>
                      </> 
                    )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    )
}

export default Navbar