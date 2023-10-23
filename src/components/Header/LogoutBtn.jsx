import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
// creating and attacting a dispactch with this button
  const dispatch = useDispatch()
// creating a handler for onclick event  which call a dispatch 
    const logoutHandler = () => {
      //authService.logout will return a promise , therefore then is needed to attend
      authService
        .logout()
        .then(() => {
          // to update stores state of user login?logout
          dispatch(logout());
        })
        .catch(console.error);
    };


    return (
      <button
        className="inline-block px-6 py-2 hover:bg-blue-700 rounded-full"
        onClick={logoutHandler}
      >
        Log Out
      </button>
    );
}

export default LogoutBtn