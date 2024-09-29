import React from 'react'
import '../../styles/components/User.scss'
import { log } from 'console'

type UserProps = {
    showProfileSetting: boolean
    setShowProfileSetting: React.Dispatch<React.SetStateAction<boolean>>
}

function User({showProfileSetting, setShowProfileSetting}: UserProps) {
  return (
    <div 
    className='user-profile'
    onClick={() => {
        setShowProfileSetting(!showProfileSetting)
    }}
    >
        <div className="profile-container">
            <div className="profile-img">
                {/* <img src="" alt="" /> */}
                <div className='w-[100px] border-4 border-[red]'>
                    <p>J.D</p>
                </div>
            </div>
            <div className="user-infos">
                <p>John Doe</p>
                <p>Administrateur</p>
            </div>
        </div>
    </div>
  )
}


export default User