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
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  > h4 {
    color: white;
  }
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
  width: 50%;
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
        <h4>
          Party and shop together with your friends - save money and the
          evironment
        </h4>
        <LoginButton
          size="large"
          type="primary"
          href="http://localhost:8000/api/v1/login/vk"
        >
          Login
        </LoginButton>
      </Content>
      {/* <img src={Background} /> */}
    </Main>
  );
};
