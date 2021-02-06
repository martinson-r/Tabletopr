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
      <>
      <NavLink to="/">Browse Tables</NavLink>
      <NavLink to="/tables/create">Host a Table</NavLink>
      <NavLink to={`/tables/players/${sessionUser.id}`}>My Tables</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/">Browse Tables</NavLink>
        <NavLink to="/tables/create">Host a Table</NavLink>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
