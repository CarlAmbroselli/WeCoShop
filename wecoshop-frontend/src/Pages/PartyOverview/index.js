import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { media, Responsive } from "../../mediaStyles";
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

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px !important;

  ${media.tablet`
      max-width: 300px;
      margin-right: 10px !important;
    `}
`;
export class PartyOverview extends React.Component {
  state = { loading: true, parties: [] };

  componentDidMount() {
    api.parties().then(parties => {
      this.setState({
        parties,
        loading: false
      });
    });
  }

  reload = () => {
    api.parties().then(parties => {
      this.setState({
        parties,
        loading: false
      });
    });
  };

  render() {
    return (
      <div>
        <Header title="Parties">
          <NewParty createParty={this.reload}></NewParty>
        </Header>
        <Page>
          {/* <Button type="primary">Hallo</Button> */}
          <PartyList>
            {this.state.parties.map(party => {
              return (
                <CardWrapper
                  onClick={() =>
                    this.props.history.push(`/party/${party.partyId}`)
                  }
                  style={{ width: "100%" }}
                >
                  <PartyCard {...party}>{party.name}</PartyCard>
                </CardWrapper>
              );
            })}
          </PartyList>
        </Page>
      </div>
    );
  }
}

export default withRouter(PartyOverview);
