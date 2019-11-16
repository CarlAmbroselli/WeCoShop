import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import api from "../../api";

import Page from "../../Components/Page";
import Header from "../../Components/Header";

export class Party extends React.Component {
  state = { party: null };

  componentDidMount() {
    const partyId = this.props.match.params.id;
    api.getParty(partyId).then(party => {
      this.setState({
        party
      });
    });
  }

  render() {
    return (
      <div>
        <Header title="Party">
          {this.state.party && <h3>{this.state.party.name}</h3>}
        </Header>
        <Page>
          {this.state.party ? <div>{this.state.party.name}</div> : "loading"}
        </Page>
      </div>
    );
  }
}

export default withRouter(Party);
