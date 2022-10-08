import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  SidebarWrapper,
  ProfileWrapper,
  LinksContainer,
  SidebarLinkWrapper,
  LogoutButtonWrapper,
} from "./style";
import { userLoggedOut } from '../Auth/authSlice';
import ProfileImage from "../../assets/profileImage.png";
import { COMMON_VIEW_PROFILE } from "../urls";
import axiosInstance from "../axios";

function Sidebar({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    loading: false,
    name: null,
    image: null,
    role: null
  })

  const handleLogout = () => {
    dispatch(userLoggedOut())
    navigate('/login')
  }

  useEffect(async () => {
    setProfile({ ...profile, loading: true })
    const response = await axiosInstance.get(COMMON_VIEW_PROFILE)
    const { name, userType: role, image } = response.data.data?.basics
    setProfile({ loading: false, name, role, image })

  }, [])

  return (
    <SidebarWrapper>
      <div className="heading">
        <i className="fas fa-calendar-week"></i>
        <span>Trackr</span>
      </div>

      <ProfileWrapper>
        {/* {profile.image || ProfileImage} */}
        <img src={ProfileImage} alt="" />

        {profile.loading ?
          <>
            <Skeleton
              style={{ width: "80%", height: "2em", background: "rgba(0,0,0,0.1)" }}
              animation="wave"
            />
            <Skeleton
              style={{ width: "40%", height: "2em", background: "rgba(0,0,0,0.1)" }}
              animation="wave"
            />
          </>
          :
          <>
            <span className="name">{profile.name}</span>
            <span className="position">{profile.role}</span>
          </>}
      </ProfileWrapper>

      <LinksContainer>
        {children.map((link) =>
          React.cloneElement(link, {
            ...link.props,
            active: (link.props.to && location.pathname.startsWith(link.props.to)),
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
