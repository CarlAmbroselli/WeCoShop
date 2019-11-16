import React from "react";
import styled from "styled-components";
import { Icon, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import api from "../../api";
import moment from "moment";

import Page from "../../Components/Page";
import Header from "../../Components/Header";
import ProductItem from "../../Components/ProductItem";

const Loading = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  font-size: 40px;
`;

export class Party extends React.Component {
  state = { party: null, items: [] };

  componentDidMount() {
    const partyId = this.props.match.params.id;

    api.getParty(partyId).then(({ details, items }) => {
      console.log("Some items", items);
      this.setState({
        party: details,
        items
      });
    });
  }

  render() {
    return (
      <div>
        <Header title="Party">
          {this.state.party && (
            <div>
              <h3 style={{ marginBottom: 0 }}>
                {this.state.party.name} on{" "}
                {moment(this.state.party.date * 1000).format("DD. MMM YYYY")}
              </h3>
              <span>{this.state.party.location.name}</span>
            </div>
          )}
          <Link to="/parties">Go back</Link>
        </Header>
        <Page>
          {this.state.party ? (
            <div>
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                onClick={() =>
                  this.props.history.push(
                    `/party/${this.props.match.params.id}/items`,
                    {
                      party: this.state.party
                    }
                  )
                }
                icon="shopping-cart"
              >
                Add Items
              </Button>
              {this.state.items.map(item => {
                return <ProductItem {...item} />;
              })}
            </div>
          ) : (
            <Loading>
              <Icon type="loading" />
            </Loading>
          )}
        </Page>
      </div>
    );
  }
}

export default withRouter(Party);
