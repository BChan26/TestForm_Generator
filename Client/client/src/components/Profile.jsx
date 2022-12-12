import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const {user} = useContext(DataContext)

    return (
        <div>
            profile {user.username}
        </div>
    );
}

export default Profile;