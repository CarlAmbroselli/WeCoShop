import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { media } from "../../mediaStyles";
import Background from "./background.jpg";
import Logo from "./logo.png";

const Main = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Filter = styled.div`
  position: absolute;
  background #ffffff7a;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled(Button)`
  font-size: 25px;
  height: 45px;
  ${media.tablet`
    font-size: 17px;
    height: 40px;
  `}
`;

const LogoImage = styled.img`
  width: 70%;
  ${media.tablet`
  max-width: 200px;
`}
`;

export default () => {
  return (
    <Main>
      <Filter />
      <Content>
        <LogoImage src={Logo} />
        <h4>The digital shopping experience</h4>
        <LoginButton size="large" type="primary" href="/">
          Login
        </LoginButton>
      </Content>
      {/* <img src={Background} /> */}
    </Main>
  );
};
