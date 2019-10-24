import React from "react";
import styled from "styled-components";
const LinkItem = styled.a`
  color: ${props => props.theme.colors.purpleDark};
  transition: ${props => props.theme.transitionBase};

  text-align: center;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.1rem;

  &:first-child {
    padding-left: 0;
  }
  */ &:hover {
    color: ${props => props.theme.colors.grey};
  }
`;

const PPTnCFormFieldCheckbox = props => (
  <>
    *I confirm that I have read and agree to the NatWest{" "}
    <LinkItem
      href="/terms-conditions"
      target="_blank"
      rel="noopener noreferrer"
    >
      {" "}
      terms and conditions
    </LinkItem>{" "}
    and{" "}
    <LinkItem href="/privacy-policy" target="_blank" rel="noopener noreferrer">
      privacy policy
    </LinkItem>
  </>
);

export default PPTnCFormFieldCheckbox;
