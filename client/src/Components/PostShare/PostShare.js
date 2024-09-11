import React, { useState, useRef } from 'react';
import './PostShare.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const dispatch = useDispatch();
    const desc = useRef();
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

        // Walidacja: sprawdzanie, czy tekst lub obrazek jest dostępny
        if (!desc.current.value.trim() && !image) {
            alert("You cannot submit an empty post.");
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
                alt="Profile"
            />

            <div>
                <input type="text" placeholder="Napisz coś..." required ref={desc} />

                <div className="postOptions">
                    <div
                        className="option"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        {/* Zastąpienie PhotoOutlinedIcon emoji kamery */}
                        <span role="img" aria-label="photo">📷</span>
                        Obraz
                    </div>

                    <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Uploading..." : "Share"}
                    </button>

                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name="myImage"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>
                </div>

                {image && (
                    <div className="previewImage">
                        {/* Zastąpienie CloseOutlinedIcon emoji krzyżyka */}
                        <button onClick={() => setImage(null)}>❌</button>
                        <img src={URL.createObjectURL(image)} alt="Preview" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
