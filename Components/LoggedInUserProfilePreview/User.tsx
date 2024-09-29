import React from 'react'

function User() {
  return (
    <div className='user-profile border-4 border-[blue]'>
        <div className="profile-container">
            <div className="img-wrapper">
                {/* <img src="" alt="" /> */}
                <div></div>
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