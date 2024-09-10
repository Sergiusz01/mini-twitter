import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;

    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
            } else {
                const { data } = await UserApi.getUser(profileUserId);
                setProfileUser(data);
            }
        };

        fetchProfileUser();
    }, [profileUserId, user]);

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <div className='InfoCard'>
            <div className="infoHead">
                <h4>Profile Info</h4>

                {user._id === profileUserId ? (
                    <div>
                        {/* Zastąpienie EditIcon własnym komponentem SVG */}
                        <svg
                            onClick={() => setModalOpened(true)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="edit-icon"
                            style={{ cursor: "pointer" }}
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>

                        <ProfileModal
                            modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                            data={user}
                        />
                    </div>
                ) : (
                    " "
                )}
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>

            <button className='button logout-button' onClick={handleLogOut}>
                Log Out
            </button>
        </div>
    );
};

export default InfoCard;
