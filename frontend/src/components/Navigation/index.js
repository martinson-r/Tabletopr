import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <navigation>
      <NavLink to="/">Browse Tables</NavLink>
      <NavLink to="/tables/create">Host a Table</NavLink>
      <NavLink to={`/tables/players/${sessionUser.id}`}>My Tables</NavLink>
      <NavLink to={`/messages`}>My Messages</NavLink>
      {/* <ProfileButton user={sessionUser} /> */}
      </navigation>
    );
  } else {
    sessionLinks = (
      <navigation>
        <NavLink to="/">Browse Tables</NavLink>
        <NavLink to="/tables/create">Host a Table</NavLink>
        {/* <LoginFormModal /> */}
      </navigation>
    );
  }

  return (
   <>
        {isLoaded && sessionLinks}
   </>
  );
}

export default Navigation;
