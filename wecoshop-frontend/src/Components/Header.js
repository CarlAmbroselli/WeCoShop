import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

import Title from "./Title";

const Header = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-bottom: 0px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #ffffffa8;
`;

const Person = styled(Avatar)`
  background: #c8d6fc !important;
`;

const Stake = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default props => {
  return (
    <Header>
      <Stake>
        <Head>
          <Title>{props.title}</Title>
          <Person size="large" icon="user" />
        </Head>
        {props.children}
      </Stake>
    </Header>
  );
};
