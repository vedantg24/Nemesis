import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { loadUser, addUser } from "../actions/userActions";
import M from "materialize-css/dist/js/materialize.min.js";


const Register = ({ loadUser, addUser }) => {
    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        address: "",
        mobile: "",
    });

    const {
        userName,
        email,
        address,
        mobile
    } = newUser;

    const onChange = (e) =>
        setNewUser({ ...newUser, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addUser({
            userName,
            email,
            address,
            mobile
        });
        M.toast({ html: "User Added Successfully" });

    };

    return (
        <div className="container">
            <h3 className="teal-text  lighten-2 center-align">Account Register</h3>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <label htmlFor="name">User Name</label>
                    <input
                        id="userName"
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={onChange}
                        required
                        pattern="^[a-zA-Z0-9]*$"
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        id="mobile"
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={onChange}
                        maxLength="10"
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={address}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="center-align">
                    <input
                        type="submit"
                        value="Register"
                        className="btn waves-effect waves-light "
                    />
                </div>
            </form>
        </div>
    )
};


export default connect(null, { addUser, loadUser })(Register);

