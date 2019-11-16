import React from "react";
import styled from "styled-components";
import { Button, Form, Input, DatePicker, AutoComplete } from "antd";
import { media } from "../../mediaStyles";
import api from "../../api";
import _ from "lodash";

const CreationForm = styled.div`
  display: flex;

  flex-direction: column;
  justify-content; center;
  align-items: center;

  height: 100vh;

  ${media.tablet`
      // max-width: 400px;
  `};
`;

const TextInput = styled(Input)`
  width: 100% !important;
`;

const FormItem = styled(Form.Item)`
  width: 100% !important;
`;

export class PartyForm extends React.Component {
  state = {
    showDialog: false,
    category: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createParty({
          ...values,
          date: values.date.unix(),
          location: {
            name: values.location,
            lat: 0,
            lon: 0
          }
        });
      }
    });
  };

  search = _.debounce(value => {
    api.findLocation(value).then(result => {
      this.setState({ locationSearches: result.map(({ name }) => name) });
    });
  }, 200);

  onChangeSearch = value => {
    this.search(value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <CreationForm>
          <Form.Item label="Choose Category">
            {getFieldDecorator("category", {
              rules: [{ required: true, message: "Please choose category" }],
              trigger: "onClick",
              getValueFromEvent: event => {
                this.setState({ category: event.target.value });
                return event.target.value;
              }
            })(
              <Button.Group>
                <Button
                  size="large"
                  icon="coffee"
                  value="coffee"
                  type={
                    this.state.category === "coffee" ? "primary" : "default"
                  }
                />
                <Button
                  size="large"
                  icon="skin"
                  value="skin"
                  type={this.state.category === "skin" ? "primary" : "default"}
                />
                <Button
                  size="large"
                  icon="gift"
                  value="gift"
                  type={this.state.category === "gift" ? "primary" : "default"}
                />
                <Button
                  size="large"
                  icon="tool"
                  value="tool"
                  type={this.state.category === "tool" ? "primary" : "default"}
                />
                <Button
                  size="large"
                  icon="heart"
                  value="heart"
                  type={this.state.category === "heart" ? "primary" : "default"}
                />
              </Button.Group>
            )}
          </Form.Item>
          <FormItem label="When should it take place?">
            {getFieldDecorator("date", {
              rules: [{ required: true, message: "Please input a name!" }]
            })(<DatePicker></DatePicker>)}
          </FormItem>
          <FormItem label="Name it">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input a name!" }]
            })(<TextInput></TextInput>)}
          </FormItem>
          <FormItem label="Location">
            {getFieldDecorator("location", {
              rules: [{ required: true, message: "Please input a location" }]
            })(
              <AutoComplete
                // value={value}
                dataSource={this.state.locationSearches}
                style={{ width: "100%" }}
                onChange={this.onChangeSearch}
                placeholder="control mode"
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>
          <Button htmlType="submit">Create</Button>
        </CreationForm>
      </Form>
    );
  }
}

export default Form.create({ name: "createNewParty" })(PartyForm);
