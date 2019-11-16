import React from "react";
import styled from "styled-components";
import { Button, Collapse } from "antd";
import { media } from "../../mediaStyles";

import CreationForm from "./Form";
import api from "../../api";

const Panel = styled(Collapse.Panel)`
  border: none !important;

  > .ant-collapse-header {
    padding-left: 0 !important;
    &:hover {
      cursor: pointer;
    }
  }
  .ant-collapse-borderless,
  .ant-collapse-item,
  .ant-collapse {
    background-color: transparent !important;
    background: transparent !important;
  }

  ${media.tablet`
      max-width: 400px;
    `}
`;

const Collapsable = styled(Collapse)`
  position: relative;
  top: ${props => (props.isActive ? "-80px" : "-10px")};
  transition: all 0.2s ease-out;

  background: ${props => (props.isActive ? "white" : "transparent")} !important;
  .ant-collapse-content {
    background-color: white !important;
    background: white !important;
  }

  .ant-collapse-content-box {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  height: 46px;
`;

const Header = styled.h2`
  text-decoration: underline;
`;

export default class NewParty extends React.Component {
  state = {
    showDialog: false
  };

  onCreateParty = data => {
    this.setState({
      showDialog: false
    });
    api.createParty(data);
  };

  render() {
    return (
      <Wrapper>
        {/* <Button onClick={() => this.setState({ showDialog: true })} ghost>
          New Party
        </Button> */}
        {/* {this.state.showDialog && ( */}
        <Collapsable
          bordered={false}
          onChange={actives => {
            if (actives.length == 0) {
              this.setState({ showDialog: false });
            } else {
              this.setState({ showDialog: true });
            }
          }}
          activeKey={this.state.showDialog ? ["1"] : []}
          isActive={this.state.showDialog}
        >
          <Panel header={<Header>New Party</Header>} key="1" showArrow={false}>
            <CreationForm createParty={this.onCreateParty}></CreationForm>
          </Panel>
        </Collapsable>
        {/* )} */}
      </Wrapper>
    );
  }
}
