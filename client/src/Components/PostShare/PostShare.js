import React, { useState, useRef } from 'react';
import './PostShare.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const imageRef = useRef(null); // Upewniamy się, że domyślnie jest ustawione na null
    const dispatch = useDispatch();
    const desc = useRef(); // Referencja do pola opisu posta
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const reset = () => {
        setImage(null);
        desc.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!desc.current.value.trim() && !image) {
            alert("Nie możesz wysłać pustego posta.");
            return;
        }

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);

            newPost.image = filename;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }

        dispatch(uploadPost(newPost));
        reset();
    };

    return (
        <div className="PostShare">
            <img
                src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                alt="Profil"
            />

            <div className="PostShareContent">
                <input type="text" placeholder="Napisz coś..." required ref={desc}/>

                <div className="postOptions">
                    <div
                        className="option"
                        style={{color: "var(--photo)"}}
                        onClick={() => imageRef.current && imageRef.current.click()} // Sprawdzamy, czy imageRef istnieje
                    >
                        <span role="img" aria-label="photo">📷</span>
                        Obraz
                    </div>

                    <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Wysyłanie..." : "Udostępnij"}
                    </button>
                </div>

                <input
                    type="file"
                    ref={imageRef} // Przypisujemy referencję do ukrytego pola input
                    style={{ display: "none" }} // Ukrywamy pole input
                    onChange={onImageChange}
                />

                {image && (
                    <div className="previewImage">
                        <button onClick={() => setImage(null)}>❌</button>
                        <img src={URL.createObjectURL(image)} alt="Podgląd"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
