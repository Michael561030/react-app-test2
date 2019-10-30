import styled from "styled-components";

//Styled category button
const StyledButton = styled.button`
      font-size: 1em;
      margin: 1em;
      background: #C2E1F5;
      padding: 0.25em 1em;
      width: 100px;
      border: 2px solid #97B0BF ;
      border-radius: 3px;
      ${(props) => (props.active && "background: #97B0BF")};
      ${(props) => (props.active && "color: #fff")};
    `;

export default StyledButton;