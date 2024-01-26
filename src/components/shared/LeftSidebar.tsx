import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/q&mutations'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSidebar = () => {
  const { pathname } = useLocation();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
      if(isSuccess) navigate(0);
    },[isSuccess])
    
  return (
    <nav className='leftsidebar'>
     <div className='flex'>
     <Link to="/" className='items-center'>
                    <img src="/assets/images/ssp.png" alt="pogo" width={60} height={36} />
                </Link>
                <br />
                <Link to={`/profile/${user.id}`} className='flex items-center mt-32'>
                  <img src={user.imageUrl || "https://media1.thehungryjpeg.com/thumbs2/ori_3809242_7tbz2c6069lh59wr7gaok2qlr8ddd3m3ikhdtaiv_monogram-yk-logo-design.jpg"} alt="profile" className='h-14 w-14 rounded-full mb-96 -ml-14 -mt-20'/>
               <div className='flex flex-col -mt-9'>
                <p className='body-bold gap-4 ml-5 '>
                  {user.name} yo yo honey singh
                </p>
                <p className='small-regular text-light-3 ml-5'>
                  @hello guys{user.username}
                </p>
                <ul className='flex flex-col gap-6 mt-10'>
                 
                  {sidebarLinks.map((link: INavLink)=>{
                    const isActive = pathname === link.route;
                    return(
                      <li key={link.label} className={`leftsidebar-link group ${ isActive && 'bg-primary-500'}`}>
                      <NavLink to={link.route} className="flex gap-4 items-center p-4" >
                        <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                {link.label}
                      </NavLink>
                      </li>
                    )
                    })}

                </ul>
               </div>
                </Link>
     </div>
     
     <Button variant="ghost" className='shad-button_ghost' onClick={()=>signOut()}>
                    <img src="assets/icons/logout.svg" alt="logout" />
                    <p className='small-medium lg:base-medium'>Logout</p>
                    </Button>
    </nav>
  )
}

export default LeftSidebar