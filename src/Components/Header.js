import React from "react";
import styled from "styled-components";

// assets
import clutchLogo from "../assets/clutch-logo.png";
import leafyTree from "../assets/leafy-tree.svg";

const Header = () => {
  const HeaderStyles = styled.header`
    align-content: center;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    width: 100%;
    img {
      margin-left: 2rem;
      margin-top: 2rem;
      width: 12rem;
    }
    h1 {
      color: #422e44;
      font-size: 1.1rem;
      font-weight: 700;
      margin-left: 2rem;
      text-transform: capitalize;
      width: fit-content;
    }
    .tree-graphic {
      position: fixed;
      right: 5%
      top: 5%;
      z-index: -1;
    }
    @media (max-width: 900px){
      .tree-graphic{
        display: none;
      }
    }
  `;

  return (
    <HeaderStyles>
      <img src={clutchLogo} alt="clutch company logo" />
      <h1>outdoor enthusiast hub</h1>
      <img className="tree-graphic" src={leafyTree} alt="tree graphic" />
    </HeaderStyles>
  );
};

export default Header;
