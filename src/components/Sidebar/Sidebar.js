import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userLoggedOut } from '../Auth/authSlice';

import {
  SidebarWrapper,
  ProfileWrapper,
  LinksContainer,
  SidebarLinkWrapper,
  LogoutButtonWrapper,
} from "./style";
import ProfileImage from "../../assets/profileImage.png";
import { useLocation } from "react-router";

function Sidebar({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //TODO: Use <Navigate/> instead?
  const handleLogout = () => {
    dispatch(userLoggedOut())
    navigate('/login')

  }

  return (
    <SidebarWrapper>
      <div className="heading">
        <i className="fas fa-calendar-week"></i>
        <span>Trackr</span>
      </div>

      <ProfileWrapper>
        <img src={ProfileImage} alt="" />
        <span className="name">Shivam Singh</span>
        <span className="position">ADMIN</span>
      </ProfileWrapper>

      <LinksContainer>
        {children.map((link, index) =>
          React.cloneElement(link, {
            ...link.props,
            active: (link.props.to || null) === location.pathname,
          })
        )}
      </LinksContainer>

      <LogoutButtonWrapper onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
        <span className="btn-text" >LOGOUT</span>
      </LogoutButtonWrapper>
    </SidebarWrapper>
  );
}

export default Sidebar;

export function SidebarLink({ to, icon, text, active = false }) {
  return (
    <SidebarLinkWrapper to={to} active={active}>
      {icon}
      <span className="link-text">{text}</span>
    </SidebarLinkWrapper>
  );
}
