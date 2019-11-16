import React from "react";
import styled from "styled-components";
import { media } from "../mediaStyles";

export default styled.div`
  color: #383838;
  text-align: left;
  font-size: 40px;
  font-weight: 500;

  ${media.tablet`
    font-size: 50px;
  `}
`;
