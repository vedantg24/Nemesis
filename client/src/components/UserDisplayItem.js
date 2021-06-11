import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteUser } from '../actions/userActions';

const UserDisplayItem = ({ uitem, deleteUser }) => {
    const { _id, userName, mobile, address, email } = uitem;

    const onDelete = () => {
        deleteUser(_id);
        M.toast({ html: 'User Deleted' })
    };

    return (
        <tbody>
            <tr>
                <td>{userName}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                <td>{address}</td>
                <td>
                    <a href="#!" className='secondary-content' onClick={onDelete} >
                        <i className="material-icons">delete</i>
                    </a>
                </td>
            </tr>
        </tbody>
    )
}

export default connect(null, { deleteUser })(UserDisplayItem)
