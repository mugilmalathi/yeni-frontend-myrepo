import React from 'react';
import './UserProfile.css';

interface UserProfileProps {
  name: string;
  email: string;
  avatar?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatar
}) => {
  return (
    <div className="user-profile">
      <div className="user-profile__avatar">
        {avatar ? (
          <img src={avatar} alt={name} className="user-profile__image" />
        ) : (
          <div className="user-profile__placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="user-profile__info">
        <div className="user-profile__name">{name}</div>
        <div className="user-profile__email">{email}</div>
      </div>
    </div>
  );
};