import React, { Component } from "react";
import { Form, FormGroup, Alert } from "reactstrap";
import Button from "components/shared/Button";
import FloatingLabelInput from "components/shared/FloatingLabelInput";

class WhitePaperForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = { errors: false };
  }

  state = {
    errors: false
  };

  checkForm(firstname, lastname, email, mobile, company) {
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
      company: form.Company.value
    };
    const errors = this.checkForm(
      data.firstname,
      data.lastname,
      data.email,
      data.mobile,
      data.company
    );
    let validation = !(form.checkValidity() && !(errors.length > 0));
    this.setState({ errors: validation });

    if (validation) {
      return;
    }

    let link = document.getElementById("downloadbutton");
    link.setAttribute("href", "pdfs/Aptimise_Whitepaper_Final.pdf");

    form.submit();
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        action="http://go.pardot.com/l/598401/2018-09-18/2hp89v"
        method="post"
        id="whitepaper"
      >
        <Alert color="danger" isOpen={this.state.errors}>
          Please enter your details to download the whitepaper!
        </Alert>

        <FormGroup>
          <FloatingLabelInput
            label="First name*"
            type="text"
            name="FirstName"
          />
        </FormGroup>
        <FormGroup>
          <FloatingLabelInput label="Last name*" type="text" name="LastName" />
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
          download whitepaper
        </Button>
      </Form>
    );
  }
}

export default WhitePaperForm;
