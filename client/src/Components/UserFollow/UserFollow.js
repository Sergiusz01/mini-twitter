import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';

const UserFollow = ({ person }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleFollow = () => {
        if (following) {
            dispatch(unFollowUser(person._id, user));
            setFollowing(false);
        } else {
            dispatch(followUser(person._id, user))
                .then(() => setFollowing(true))  // Only set following to true if successful
                .catch((error) => {
                    console.error("Error following user", error);
                    // Optionally handle the error by showing a notification
                });
        }
    };

    return (
        <div className="follower">
            <div className="followerInfo">
                <img
                    src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"}
                    alt={person.firstname}
                    className='followerImg'
                />
                <div className="name">
                    <span className="followerName">@{person.firstname} {person.lastname}</span>
                </div>
            </div>
            <button className='followButton' onClick={handleFollow}>
                {following ? "Przestań obserwować" : "Obserwuj"}
            </button>
        </div>
    );
};

export default UserFollow;
