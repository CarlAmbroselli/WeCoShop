import React from "react";
import styled from "styled-components";
import api from "../../api";
import Title from "../../Components/Title";
import Page from "../../Components/Page";

export default class PartyOverview extends React.Component {
  state = { loading: true };

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
      <Page>
        <Title>Parties</Title>
        {/* <Button type="primary">Hallo</Button> */}
      </Page>
    );
  }
}
