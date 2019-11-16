import React from "react";
import styled from "styled-components";
import { media } from "../../mediaStyles";
import { Card } from "antd";

const PartyCard = styled(Card)`
  width: 100%;
  margin-bottom: 10px !important;
  -webkit-box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 9px -6px rgba(0, 0, 0, 0.75);

  ${media.tablet`
      max-width: 300px;
      margin-right: 10px !important;
    `}
`;

export default party => (
  <PartyCard
    hoverable
    style={{ width: "100%" }}
    cover={<img src={party.header_picture} />}
  >
    <Card.Meta title={party.name} description="www.instagram.com" />
  </PartyCard>
);
