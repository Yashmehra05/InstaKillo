import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/q&mutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
      if(isSuccess) navigate(0);
    },[isSuccess])
    
    return (
        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img src="/assets/images/ssp.png" alt="pogo" width={70} height={150} />
                </Link>
                <div className="flex gap-4">
                    <Button variant="ghost" className='shad-button_ghost' onClick={()=>signOut()}>
                    <img src="assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img src={user.imageUrl || 'https://media1.thehungryjpeg.com/thumbs2/ori_3809242_7tbz2c6069lh59wr7gaok2qlr8ddd3m3ikhdtaiv_monogram-yk-logo-design.jpg'} alt="profile" className='h-8 w-8 rounded-full' />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar