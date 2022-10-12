import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import userImg from '../assets/images/user_icon.png'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.authReducer);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
    <h1>Profile</h1>
    <div className="container profile-container">

      <div>
        <img src={userImg} alt="user" width="200px" />
        <h4 className="profile-h4"><strong>Username:</strong>{currentUser.username}</h4>
        <h4 className="profile-h4"><strong>Name:</strong>{currentUser.name? currentUser.name : "Unnamed"}</h4>
        <h4 className="profile-h4"><strong>Token:</strong>{currentUser.token.substring(0, 20)} ...{" "}{currentUser.token.substr(currentUser.token.length - 20)}</h4>
      </div>
      <div>
        <h6 className="profile-h6">Your current Authorities for this site are:</h6>
        <ul className="profile-ul">
          {currentUser.roles ? currentUser.roles.map((role, index) => <li className="profile-li" key={index}>{role}</li>) : <li className="profile-li">User</li>}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Profile;