import React from "react";
import styled from "styled-components";
import { Icon, Button, Badge, notification, Alert } from "antd";
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

const Interaction = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hint = styled.div`
  position: fixed;
  bottom: 10px;

  z-index: 200;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export class Party extends React.Component {
  state = { party: null, items: [], ordered: false };

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

  order = () => {
    notification["info"]({
      message: "Order has been sent",
      description:
        "The Order was placed, and we will inform you when your items will be dispatched."
    });
    this.setState({ ordered: true });
  };

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
              <div>
                Order until{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {moment(this.state.party.date * 1000)
                    .subtract(5, "days")
                    .format("DD. MMM YYYY")}
                </span>
              </div>
            </div>
          )}
          <Link to="/parties">Go back</Link>
        </Header>
        <Page>
          {this.state.party ? (
            <div>
              <Interaction>
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
                <Badge count={this.state.items.length}>
                  <Button
                    type="secondary"
                    style={{ marginBottom: 10 }}
                    onClick={this.order}
                    icon="shopping-cart"
                    disabled={this.state.ordered}
                  >
                    Order
                  </Button>
                </Badge>
              </Interaction>
              {this.state.items.length > 2 && (
                <Hint>
                  <Alert
                    message="Add 2 more items to get a discount"
                    type="info"
                    showIcon
                  />
                </Hint>
              )}
              <div
                style={{
                  height: "calc(100vh - 250px)",
                  overflow: "scroll",
                  display: "flex",
                  flexWrap: "wrap"
                }}
              >
                {this.state.items.map(item => {
                  return <ProductItem {...item} />;
                })}
              </div>
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
