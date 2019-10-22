import React, { Component } from "react";
import { Input, Label } from "reactstrap";
import styled, { withTheme } from "styled-components";

const InputWrap = styled.div`
  padding-top: 0.9rem;
  position: relative;
`;

const InputStyled = styled(Input)`
  background-color: transparent;
  position: relative;
  z-index: 1;
  border-radius: 0;
  border-color: ${props => props.theme.colors.greyMedium};
  height: 40px;
`;

const LabelStyled = styled(Label)`
  position: absolute;
  transition: ${props => props.theme.transitionBase};
`;

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: ""
    };
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () =>
    this.setState({ isFocused: this.state.value !== "" ? true : false });
  handleChange = e => this.setState({ value: e.target.value });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      top: !isFocused ? "1.30rem" : "6px",
      left: !isFocused ? "1rem" : "5px",
      fontSize: !isFocused ? props.theme.font.size.md : "0.65rem",
      zIndex: "99",
      background: "white",
      padding: "2px",
      color: !isFocused
        ? props.theme.colors.blackOff
        : props.theme.colors.greyMedium
    };
    return (
      <InputWrap>
        <LabelStyled style={labelStyle}>{label}</LabelStyled>
        <InputStyled
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </InputWrap>
    );
  }
}

export default withTheme(FloatingLabelInput);
