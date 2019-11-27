import React from "react";
import styled from "styled-components";

const Button = props => {
  const ButtonStyles = styled.button`
    background-color: inherit;
    border: 2px solid #422e44;
    color: #422e44;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.25s;
    width: 7rem;
    :hover {
      background-color: #208774;
      cursor: pointer;
    }
  `;

  return (
    <div>
      <ButtonStyles onClick={props.onClick}>{props.label}</ButtonStyles>
    </div>
  );
};

export default Button;
