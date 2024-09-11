import React, { useState } from 'react';
import './ProfileModal.css'; // Stworzymy własne style modalne
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  // Wykluczamy hasło z danych użytkownika
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other); // Inicjalizujemy stan z pozostałymi danymi
  const [profileImage, setProfileImage] = useState(null); // Przechowujemy wybraną grafikę profilową
  const [coverImage, setCoverImage] = useState(null); // Przechowujemy wybraną grafikę okładkową
  const dispatch = useDispatch();
  const param = useParams(); // Pobieramy parametry z URL (np. id użytkownika)
  const { user } = useSelector((state) => state.authReducer.authData); // Pobieramy dane zalogowanego użytkownika

  // Obsługa zmian w formularzu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Obsługa zmiany obrazu profilowego lub okładkowego
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
          ? setProfileImage(img)
          : setCoverImage(img);
    }
  };

  // Obsługa przesyłania formularza
  const handleSubmit = (e) => {
    e.preventDefault();

    let UserData = formData; // Zbieramy dane użytkownika do aktualizacji

    // Jeśli użytkownik wybrał obraz profilowy
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name; // Tworzymy unikalną nazwę pliku
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName; // Dodajemy nazwę pliku do danych użytkownika

      try {
        dispatch(uploadImage(data)); // Wysyłamy obraz na serwer
      } catch (error) {
        console.log(error);
      }
    }

    // Jeśli użytkownik wybrał obraz okładkowy
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data)); // Wysyłamy obraz na serwer
      } catch (error) {
        console.log(error);
      }
    }

    // Aktualizacja danych użytkownika
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false); // Zamykamy okno modalne
  };

  return (
      modalOpened && (
          <div className="modalBackdrop">
            <div className="modalContent">
              <span className="closeModal" onClick={() => setModalOpened(false)}>&times;</span>
              <form className="infoForm" onSubmit={handleSubmit}>
                <h3>Zaktualizuj swoje informacje</h3>
                <div>
                  <input
                      type="text"
                      placeholder="Imię"
                      className="infoInput"
                      name="firstname"
                      onChange={handleChange}
                      value={formData.firstname}
                  />
                  <input
                      type="text"
                      placeholder="Nazwisko"
                      className="infoInput"
                      name="lastname"
                      onChange={handleChange}
                      value={formData.lastname}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Pracuje w"
                      className="infoInput"
                      name="worksAt"
                      onChange={handleChange}
                      value={formData.worksAt}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Mieszka w"
                      className="infoInput"
                      name="livesin"
                      onChange={handleChange}
                      value={formData.livesin}
                  />
                  <input
                      type="text"
                      placeholder="Kraj"
                      className="infoInput"
                      name="country"
                      onChange={handleChange}
                      value={formData.country}
                  />
                </div>
                <div>
                  <input
                      type="text"
                      placeholder="Status związku"
                      className="infoInput"
                      name="relationship"
                      onChange={handleChange}
                      value={formData.relationship}
                  />
                </div>
                <div>
                  <h5>Zdjęcie profilowe</h5>
                  <input type="file" name="profileImage" onChange={onImageChange} />
                  <h5>Zdjęcie okładkowe</h5>
                  <input type="file" name="coverImage" onChange={onImageChange} />
                </div>
                <button className="button infoButton" type="submit">
                  Zaktualizuj
                </button>
              </form>
            </div>
          </div>
      )
  );
}

export default ProfileModal;
