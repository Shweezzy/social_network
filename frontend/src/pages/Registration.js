import React, { useState } from "react";
import { registerUser } from "../actions/authActions";
//Якщо вам, в React-компоненті, потрібно отримувати дані зі сховища, або потрібно діспетчеризувати дії
import { connect } from "react-redux";

const Registration = ({ registerUser }) => {
  //Хуки — це функції, за допомогою яких ви можете “зачепитися” за стан та методи життєвого циклу React з функціональних компонентів
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    userName: "",
    email: "",
    password: "",
  });
  //забираємо зі стори
  const { name, lastName, userName, email, password } = userData;

  //призначаємо в useData з кожного інпута значення userData.name-lastName-userName. Має вигляд userData[name або lastName...] = e.target.value
  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    <div>
      <div>
        <labe>Name</labe>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <div>
        <labe>Last name</labe>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <div>
        <labe>User name</labe>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <div>
        <labe>email</labe>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <div>
        <labe>password</labe>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <hr></hr>
      <button onClick={() => registerUser(userData)}>Submit form</button>
    </div>
  );
};

export default connect(null, { registerUser })(Registration);
