import { useState } from "react";
import Axios from "axios";

function Registration() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UsersList, setUsersList] = useState([]);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const addUsers = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

    Axios.post("http://localhost:3001/create", {
      username: username,
      age: age,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    }).then(() => {
      setUsersList([
        ...UsersList,
        {
          username: username,
          age: age,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        },
      ]);
    });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4">
            <h2 className="mb-4">Registration Form</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setAge(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addUsers}
              >
                Registration
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Registration;
