import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getUsers, deleteUser, loadUser } from "../actions/userActions";
import UserDisplayItem from './UserDisplayItem';
// import UserDisplayItem from './UserDisplayItem'

const UserDisplay = ({ getUsers, users, deleteUser, loadUser }) => {
    useEffect(() => {

        getUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h2 className="teal-text  lighten-2 center-align">Users</h2>
            <table className="highlight">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email Address</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                {users.map((uitem) => (
                    <UserDisplayItem uitem={uitem} key={uitem._id} />
                ))}
            </table>
            <br />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    users: state.user.users,
});

export default connect(mapStateToProps, { getUsers, deleteUser, loadUser })(UserDisplay);
