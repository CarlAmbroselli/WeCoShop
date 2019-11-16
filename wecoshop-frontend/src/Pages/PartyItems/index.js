import React from "react";
import styled from "styled-components";
import { Icon, Input, Button, message } from "antd";
import { withRouter, Link } from "react-router-dom";
import api from "../../api";

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

const SearchInput = styled(Input.Search)`
  // width: 100%;
  // position: sticky;
  // top: 90px;
  // z-index: 10000;
  font-size: 16px;
`;

const BackHeader = styled.div`
  display: flex;
  text-decoration: underline;
  align-items: center;
  > h3 {
    margin: 0 !important;
  }
`;

export class Party extends React.Component {
  state = { items: [], page: 0, searchTerm: "" };

  findItems(text) {
    api.findItems(text, this.state.page).then(items => {
      this.setState({
        items: [...this.state.items, ...items]
      });
    });
  }

  addItem = (item, index) => {
    const partyId = this.props.match.params.id;
    const items = [...this.state.items];
    items.splice(index, 1);

    api
      .addItemToParty(partyId, {
        ...item,
        productId: item.id
      })
      .then(() => {
        message.success("Item added!");
        this.setState({
          items
        });
      });
  };

  searchMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.findItems(this.state.searchTerm);
      }
    );
  };

  render() {
    return (
      <div>
        <Header title="Add Items">
          {this.props.location.state.party && (
            <Link to={`/party/${this.props.location.state.party.partyId}`}>
              <BackHeader>
                <Icon type="caret-left" />
                <h3>{this.props.location.state.party.name}</h3>
              </BackHeader>
            </Link>
          )}
        </Header>
        <Page>
          <SearchInput
            placeholder="input search text"
            onSearch={value => {
              this.setState(
                {
                  page: 0,
                  searchTerm: value,
                  items: []
                },
                () => {
                  this.findItems(value);
                }
              );
            }}
            style={{ width: "100%" }}
          />
          {this.state.items.length > 0 ? (
            <React.Fragment>
              {this.state.items.map((item, index) => {
                return (
                  <ProductItem
                    {...item}
                    addItem={() => this.addItem(item, index)}
                  />
                );
              })}
              <Button onClick={this.searchMore} type="dashed">
                See more
              </Button>
            </React.Fragment>
          ) : // <Loading>
          //   <Icon type="loading" />
          // </Loading>
          null}
        </Page>
      </div>
    );
  }
}

export default withRouter(Party);
