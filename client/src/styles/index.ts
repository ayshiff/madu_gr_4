import { createGlobalStyle } from "styled-components";
import { font } from "./const";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: "Source Sans Pro", sans-serif;
    text-decoration: none;
    box-sizing:border-box;
  }
  body {
    height:100%;
    text-rendering: optimizeLegibility;
  };

  #root {
    min-height: 100%;
  };

  a {
    color: initial;
  }

  ul {
    list-style: none;
  }

  p {
    margin-bottom: 0;
  }

  strong {
    font-weight: ${font.weight.semiBold};
  }
`;

export default GlobalStyle;
