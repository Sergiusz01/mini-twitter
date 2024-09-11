import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import UserFollow from '../UserFollow/UserFollow';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {

  // Stan przechowujący listę użytkowników
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData); // Pobieranie danych aktualnie zalogowanego użytkownika

  // Użycie efektu, aby pobrać wszystkich użytkowników z serwera
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser(); // Pobranie wszystkich użytkowników
      setPersons(data); // Ustawienie pobranych użytkowników w stanie
    }
    fetchPersons(); // Wywołanie funkcji pobierającej
  }, []);

  return (
      <div className='FollowersCard'>
        <h3 className="followersCardHeader">Zaobserwuj</h3> {/* Nagłówek karty */}
        {/* Mapowanie przez listę osób, wykluczając aktualnie zalogowanego użytkownika */}
        {persons.map((person, id) => {
          return person._id !== user._id
              ? <UserFollow person={person} key={id} /> // Wyświetlanie komponentu UserFollow dla każdej osoby
              : null; // Pomijamy zalogowanego użytkownika
        })}
      </div>
  );
}

export default FollowersCard;
