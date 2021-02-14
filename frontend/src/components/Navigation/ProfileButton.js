import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div onClick={openMenu}>
      <i class="far fa-user"></i>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="border-bottom">{user.username}</li>
          <li className="border-bottom">{user.email}</li>
          <li>
            <NavLink className="my-tables border-bottom" to={`/tables/players/${user.id}`}><p>My Tables</p></NavLink>
            <button className="logout-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
