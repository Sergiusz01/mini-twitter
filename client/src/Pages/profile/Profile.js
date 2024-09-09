import React from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';


const Profile = () => {
    return (
        <div className='Profile'>
            <ProfilePageLeft />

            <div className="ProfilePage-Center">
                <ProfileCard location="profilePage" />
                <PostSide />
            </div>




        </div>
    )
}

export default Profile
