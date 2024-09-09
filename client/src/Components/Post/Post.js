import React, { useState, useEffect } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { getUser } from '../../api/UserRequest'; // Import funkcji do pobrania użytkownika



const Post = ({ data }) => {
    const [author, setAuthor] = useState({}); // Stan na dane użytkownika
  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)

// Pobranie danych użytkownika na podstawie userId
    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await getUser(data.userId); // Wywołanie API na podstawie userId
                setAuthor(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAuthor();
    }, [data.userId]);

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
    const defaultImage = `${process.env.REACT_APP_PUBLIC_FOLDER}default.jpg`;
  return (
      <div className='Post'>
          <div className="detail">
              {/* Wyświetlanie autora posta */}
              <span>
          <b>{author.firstname} {author.lastname}</b> {/* Wyświetlanie imienia i nazwiska autora */}
        </span>
              <span>{data.desc}</span>
          </div>
          <img src={data.image ? `${process.env.REACT_APP_PUBLIC_FOLDER}${data.image}` : defaultImage} alt=""/>

          <div className="postReact">
              <img src={liked ? Like : Notlike} alt="" style={{cursor: "pointer"}} onClick={handleLike}/>
              <img src={Comment} alt=""/>
          </div>

          <span style={{color: "var(--gray)", fontSize: '14px'}}>{likes} likes</span>


      </div>
  )
}

export default Post
