import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faToriiGate,
} from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../context/LoginContext";
import { logout } from "../constants/actionTypes";
import "./navbar.scss";

const Navbar = ({ type }) => {
  const { user, dispatch } = useContext(LoginContext);
  const handleClick = (e) => {
    dispatch({ type: logout });
  };

  return (
    <div className={`navbar ${type}`}>
      <div className="navbarContainer ">
        <div className="lineOne">
          <div className="left">
            <Link to="/" className="logo">
              BOOKROOM
            </Link>
          </div>
          <div className="right">
            <button className="navButtonFlag" />
            <button className="navButtonNotif">使用webpack測試</button>
            {type == "auth" ? (
              <></>
            ) : (
              <>
                {user ? (
                  <>
                    <span className="username">{user.username}</span>
                    <button className="navButton" onClick={handleClick}>
                      登出
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <button className="navButton">註冊</button>
                    </Link>
                    <Link to="/login">
                      <button className="navButton">登入</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {type == "auth" ? (
          <></>
        ) : (
          <div className="lineTwo">
            <div className="item active">
              <FontAwesomeIcon icon={faBed} />
              <span>住宿</span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faPlane} />
              <span>航班</span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faCar} />
              <span>租車</span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faToriiGate} />
              <span>景點/活動</span>
            </div>
            <div className="item">
              <FontAwesomeIcon icon={faTaxi} />
              <span>機場計程車</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
