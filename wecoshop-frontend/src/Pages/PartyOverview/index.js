import React from "react";
import styled from "styled-components";
import { media } from "../../mediaStyles";
import api from "../../api";
import Title from "../../Components/Title";
import Page from "../../Components/Page";
import Header from "../../Components/Header";

import PartyCard from "./PartyCard";
import NewParty from "../../Components/NewParty";

const PartyList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default class PartyOverview extends React.Component {
  state = { loading: true, parties: [] };

  componentDidMount() {
    api.parties().then(parties => {
      this.setState({
        parties,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        <Header title="Parties">
          <NewParty></NewParty>
        </Header>
        <Page>
          {/* <Button type="primary">Hallo</Button> */}
          <PartyList>
            {this.state.parties.map(party => {
              return <PartyCard {...party}>{party.name}</PartyCard>;
            })}
          </PartyList>
        </Page>
      </div>
    );
  }
}
