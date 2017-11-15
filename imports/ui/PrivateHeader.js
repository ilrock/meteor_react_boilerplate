import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
  return(
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">{props.title}</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a className="btn-logout" href="#" onClick={(e) => {
            props.handleLogout(e);
          }}> Logout </a></li>
        </ul>
      </div>
    </nav>
  )
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default createContainer(()=>{
  return {
    handleLogout: (e) => {
      e.preventDefault();
      Accounts.logout();
    }
  };
}, PrivateHeader);