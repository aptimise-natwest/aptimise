import React, { Component } from "react";
import { Form, FormGroup, Alert, Label, Input } from "reactstrap";
import Button from "components/shared/Button";
import FloatingLabelInput from "components/shared/FloatingLabelInput";
import styled, { css } from "styled-components";

const Gdpr = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  display: block;
  text-align: center;
`;

class WhitePaperForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = { errors: false };
  }

  state = {
    errors: false
  };

  checkForm(
    firstname,
    lastname,
    email,
    mobile,
    company,
    gdprEmail,
    gdprPhone,
    gdprText
  ) {
    const missedFields = [];

    if (firstname.length === 0) {
      missedFields.push("First name can't be empty");
    }

    if (lastname.length === 0) {
      missedFields.push("Last name can't be empty");
    }

    if (email.length === 0) {
      missedFields.push("Email can't be empty");
    }

    if (mobile.length === 0) {
      missedFields.push("Mobile can't be empty");
    }

    if (company.length === 0) {
      missedFields.push("Company can't be empty");
    }

    let gdpr = !(gdprEmail || gdprPhone || gdprText);
    if (gdpr) {
      missedFields.push("Please select GDPR");
    }
    return missedFields;
  }
  onSubmit = e => {
    let form = e.currentTarget;

    form = document.getElementById("whitepaper");

    const data = {
      firstname: form.FirstName.value,
      lastname: form.LastName.value,
      email: form.Email.value,
      mobile: form.Mobile.value,
      company: form.Company.value,
      gdprEmail: form.gdprEmail.checked,
      gdprPhone: form.gdprPhone.checked,
      gdprText: form.gdprText.checked
    };
    const errors = this.checkForm(
      data.firstname,
      data.lastname,
      data.email,
      data.mobile,
      data.company,
      data.gdprEmail,
      data.gdprPhone,
      data.gdprText
    );
    let validation = !(form.checkValidity() && !(errors.length > 0));
    this.setState({ errors: validation, messages: errors });

    if (validation) {
      return;
    }

    let link = document.getElementById("downloadbutton");
    link.setAttribute("href", "/pdfs/Aptimise-whitepaper.pdf");

    form.submit();
  };

  render() {
    const downloaded = this.props.downloaded;
    return (
      <Form
        onSubmit={this.onSubmit}
        action="http://go.pardot.com/l/598401/2018-09-18/2hp89v"
        method="post"
        id="whitepaper"
      >
        <Alert color="danger" isOpen={this.state.errors}>
          Please enter your details to download the whitepaper!
          {/* {this.state.errors
            ? this.state.messages.map(r => {
                return <ul>{r}</ul>;
              })
            : ""} */}
        </Alert>

       
        <Alert color="success" isOpen={downloaded}>
          The whitepaper has been downloaded !
        </Alert>

        
          <FormGroup>
            <FloatingLabelInput
              label="First name*"
              type="text"
              name="FirstName"
            />
          </FormGroup>
          <FormGroup>
            <FloatingLabelInput
              label="Last name*"
              type="text"
              name="LastName"
            />
          </FormGroup>
          <FormGroup>
            <FloatingLabelInput label="Email*" type="email" name="Email" />
          </FormGroup>
          <FormGroup>
            <FloatingLabelInput label="Mobile*" type="number" name="Mobile" />
          </FormGroup>
          <FormGroup>
            <FloatingLabelInput
              label="Company name*"
              type="text"
              name="Company"
            />
          </FormGroup>

          <Button
            id="downloadbutton"
            className="mt-3"
            purple
            block
            as="a"
            href="javascript:void(onSubmit())"
            download
            onClick={this.onSubmit}
          >
            Download whitepaper
          </Button>
          <div />
          <br />
          <p>
            APtimise would like to keep you informed by phone, email and text
            message about other evolving innovative products, services and
            offers that we believe will be of value to you. If you do not wish
            us to contact you for these purposes, please tick the relevant
            boxes:
          </p>

          <Gdpr>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" name="gdprEmail" /> Email
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check inline>
                <Input type="checkbox" name="gdprPhone" /> Phone
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" name="gdprText" /> Text
              </Label>
            </FormGroup>
          </Gdpr>
       
      </Form>
    );
  }
}

export default WhitePaperForm;
