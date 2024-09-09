import React from 'react'
import './Home.css'
import ProfileSide from '../../Components/profileSide/ProfileSide'
import PostSide from '../../Components/PostSide/PostSide'

const Home = () => {
    return (
        <div className="Home">
            <ProfileSide />
            <PostSide />
        </div>
    )
}

export default Home