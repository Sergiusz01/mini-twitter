import React, { useState } from 'react';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';


const Auth = () => {

    // Ustawienie stanu początkowego na rejestrację
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);

    // Dane wejściowe od użytkownika
    const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpass: "" });

    // Flaga sprawdzająca czy hasła są zgodne
    const [confirmPass, setConfirmPass] = useState(true);

    // Funkcja do obsługi zmian w polach formularza
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // Funkcja obsługująca wysłanie formularza
    const handlSubmit = (e) => {
        e.preventDefault();

        // Sprawdzenie, czy to rejestracja, i czy hasła są zgodne
        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false)
        } else {
            dispatch(logIn(data))
        }
    }

    // Funkcja resetująca formularz
    const restForm = () => {
        setConfirmPass(true);

        setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpass: ""
        })
    }

    return (

        //    Lewa strona
        <div className='Auth'>
            <div className="a-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                    alt="Logo"
                    className="logo"
                />
                <div className="Webname">
                    <h2>Witamy!</h2>
                    <h5>Odkrywaj idee na całym świecie.</h5>
                </div>
            </div>

            {/* Prawa strona */}
            <div className="a-right">
                <form className='infoForm authForm' onSubmit={handlSubmit}>

                    <h2>{isSignUp ? "Zarejestruj się" : "Zaloguj się"}</h2>

                    {isSignUp &&
                        <div>
                            <input type="text" placeholder='Imię'
                                   className='infoInput' name='firstname'
                                   onChange={handleChange}
                                   value={data.firstname}
                            />
                            <input type="text" placeholder='Nazwisko'
                                   className='infoInput' name='lastname'
                                   onChange={handleChange}
                                   value={data.lastname}
                            />
                        </div>
                    }

                    <div>
                        <input type="text" placeholder='Email'
                               className='infoInput' name='email'
                               onChange={handleChange}
                               value={data.email}
                        />
                    </div>

                    <div>
                        <input type="password" placeholder='Hasło'
                               className='infoInput' name='password'
                               onChange={handleChange}
                               value={data.password}
                        />
                        {isSignUp &&
                            <input type="password" placeholder='Potwierdź hasło'
                                   className='infoInput' name='confirmpass'
                                   onChange={handleChange}
                                   value={data.confirmpass}
                            />
                        }
                    </div>

                    {/* Komunikat o błędzie, jeśli hasła się nie zgadzają */}
                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
                        * Hasła nie są zgodne
                    </span>

                    <div>
                        {/* Zmiana trybu między rejestracją a logowaniem */}
                        <span style={{ fontSize: "12px", cursor: "pointer" }}
                              onClick={() => { setIsSignUp((prev) => !prev); restForm() }}
                        >
                            {isSignUp ? "Masz już konto? Zaloguj się tutaj" : "Nie masz konta? Zarejestruj się tutaj"}
                        </span>
                    </div>

                    {/* Przycisk wysłania formularza, z komunikatem ładowania */}
                    <button className='button infoButton' type='submit' disabled={loading}>
                        {loading ? "Ładowanie..." : isSignUp ? "Zarejestruj się" : "Zaloguj się"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Auth;
