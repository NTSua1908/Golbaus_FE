import React from "react";
import { FaCopyright, FaHandPointRight } from "react-icons/fa";
import { Logo } from "../../Logo";
import "./footer.scss";
import { TiSocialFacebookCircular, TiSocialInstagram } from "react-icons/ti";
import {
  SlSocialReddit,
  SlSocialTwitter,
  SlSocialYoutube,
} from "react-icons/sl";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-header">
        <div className="footer-header-left">
          <Logo />
        </div>
        <div className="footer-header-middle">
          <div className="footer-header-middle-left">
            <li className="footer-header-middle-left-menu">
              <FaHandPointRight />
              <span>Posts</span>
            </li>
            <li className="footer-header-middle-left-menu">
              <FaHandPointRight />
              <span>Questions and Answers</span>
            </li>
          </div>
          <div className="footer-header-middle-right">
            <li className="footer-header-middle-right-menu">
              <FaHandPointRight />
              <span>About us</span>
            </li>
            <li className="footer-header-middle-right-menu">
              <FaHandPointRight />
              <span>Feedback</span>
            </li>
            <li className="footer-header-middle-right-menu">
              <FaHandPointRight />
              <span>Help</span>
            </li>
          </div>
        </div>
        <div className="footer-header-right">
          <p>FOLLOW US</p>
          <div className="footer-header-right-media">
            <a href="#" className="social">
              <TiSocialInstagram />
            </a>
            <a href="#" className="social">
              <TiSocialFacebookCircular />
            </a>
            <a href="#" className="social">
              <SlSocialYoutube />
            </a>
            <a href="#" className="social">
              <SlSocialTwitter />
            </a>
            <a href="#" className="social">
              <SlSocialReddit />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-footer">
        <p>
          <FaCopyright />
          {"   "}
          Copyright. All rights reserved. Nguyen Thien Sua.
        </p>
      </div>
    </div>
  );
}

export default React.memo(Footer);
