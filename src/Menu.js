import React, { PropTypes } from 'react';
import { auth } from './firebase';
import './Menu.css';

const Menu = ({ user }) => {
  return (
    <div className="Menu">
      <div className="Menu--identification">
        <img
          className="Menu--photo"
          src={ user.photoURL }
          alt={ user.displayName }
        />
      <div className="Menu--displayName">{ user.displayName }</div>
      </div>
      <button
        className="Menu--signout"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
};

export default Menu;
