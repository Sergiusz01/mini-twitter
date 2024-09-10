import React, { useState } from 'react';
import './ProfileModal.css'; // Stworzymy własne style modalne
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
          ? setProfileImage(img)
          : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let UserData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
      modalOpened && (
          <div className="modalBackdrop">
            <div className="modalContent">
              <span className="closeModal" onClick={() => setModalOpened(false)}>&times;</span>
              <form className="infoForm" onSubmit={handleSubmit}>
                <h3>Update Your Info</h3>
                <div>
                  <input
                      type="text"
                      placeholder="First Name"
                      className="infoInput"
                      name="firstname"
                      onChange={handleChange}
                      value={formData.firstname}
                  />
                  <input
                      type="text"
                      placeholder="Last Name"
                      className="infoInput"
                      name="lastname"
                      onChange={handleChange}
                      value={formData.lastname}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Works At"
                      className="infoInput"
                      name="worksAt"
                      onChange={handleChange}
                      value={formData.worksAt}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Lives in"
                      className="infoInput"
                      name="livesin"
                      onChange={handleChange}
                      value={formData.livesin}
                  />
                  <input
                      type="text"
                      placeholder="Country"
                      className="infoInput"
                      name="country"
                      onChange={handleChange}
                      value={formData.country}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Relationship Status"
                      className="infoInput"
                      name="relationship"
                      onChange={handleChange}
                      value={formData.relationship}
                  />
                </div>
                <div>
                  <h5>Profile Image</h5>
                  <input type="file" name="profileImage" onChange={onImageChange} />
                  <h5>Cover Image</h5>
                  <input type="file" name="coverImage" onChange={onImageChange} />
                </div>
                <button className="button infoButton" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
      )
  );
}

export default ProfileModal;
