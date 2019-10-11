import React, { Component } from "react";
import { Form, FormGroup, Alert, Label, Input } from "reactstrap";
import Button from "components/shared/Button";
import FloatingLabelInput from "components/shared/FloatingLabelInput";
import styled from "styled-components";

const Gdpr = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  display: block;
  text-align: center;

  .form-check-label {
    margin-bottom: 0;
    font-size: 0.65em;
    color: #787878;
  }
`;

const GdprText = styled.p`
  font-size: 0.75em;
  color: #787878;
  margin-bottom: 0;
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

    /**
     * * By default the gdpr is optin and optional
     */
    // let gdpr = !(gdprEmail || gdprPhone || gdprText);
    // if (gdpr) {
    //   missedFields.push("Please select GDPR");
    // }
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
    if (form.gdprEmail.value === "") {
      form.gdprEmail.value = "false";
    }
    if (form.gdprPhone.value === "") {
      form.gdprPhone.value = "false";
    }
    if (form.gdprText.value === "") {
      form.gdprText.value = "false";
    }
    let link = document.getElementById("whitepaperformdownloadbutton");
    link.setAttribute("href", "/pdfs/Aptimise-whitepaper.pdf");
    // window.ga("gtm4.send", {
    //   hitType: "event",
    //   eventCategory: "Form submission",
    //   eventAction: "Whitepaper",
    //   eventLabel: "http://go.pardot.com/l/598401/2018-09-18/2hp89v"
    // });
    window.dataLayer.push({
      event: "whitepaperFormSubmitted",
      formName: "Download Whitepaper",
      formLocation:
        document.location.pathname === "/"
          ? "Home Page"
          : document.location.pathname.replace(new RegExp("/", "g"), ""),
      formStatus: "Successful"
    });

    // console.log(`GDPR Email : ${form.gdprEmail.value}`);
    // console.log(`GDPR Phone : ${form.gdprPhone.value}`);
    // console.log(`GDPR Text : ${form.gdprText.value}`);

    window.history.replaceState(null, null, "?thankyou&form=whitepaper");
    form.submit();
  };

  invertClick = e => {
    let elementCheckbox = e.currentTarget;
    // console.log(elementCheckbox);
    let hiddenCheckbox = document.getElementsByName(
      elementCheckbox.name.split("Display")[0]
    );
    hiddenCheckbox[0].value = elementCheckbox.checked;
    // console.log(hiddenCheckbox[0].value);
    // console.log(
    //   `Element : ${hiddenCheckbox[0].name} value : ${hiddenCheckbox[0].value}`
    // );
  };

  componentDidMount() {
    // console.log(window.ga.getAll()[0].get("trackingId"));
    // ReactGA.initialize(window.ga.getAll()[0].get("trackingId"), {
    //   debug: true
    // });
    // ReactGA.event({
    //   category: "Form",
    //   action: "Form Displyed",
    //   label: "Whitepaper"
    // });
    //console.log(this.props);
  }
  test() {
    alert("ss");
  }
  render() {
    const downloaded = this.props.downloaded;
    return (
      <Form
        onSubmit={this.test}
        action="http://go.pardot.com/l/598401/2018-09-18/2hp89v"
        method="post"
        id="whitepaper"
      >
        <Alert
          color="danger"
          isOpen={this.state.errors}
          id="form-alert-message"
        >
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
          id="whitepaperformdownloadbutton"
          className="mt-3"
          purple
          block
          as="a"
          href="javascript:void(0)"
          download
          onClick={this.onSubmit}
        >
          Download whitepaper
        </Button>
        <div />
        <br />
        <GdprText>
          APtimise would like to keep you informed by phone, email and text
          message about other evolving innovative products, services and offers
          that we believe will be of value to you. If you do not wish us to
          contact you for these purposes, please tick the relevant boxes:
        </GdprText>

        <Gdpr>
          <FormGroup check inline={true}>
            <Label check>
              <Input
                type="checkbox"
                name="gdprEmailDisplay"
                onClick={this.invertClick}
              />{" "}
              Email
              <Input type="hidden" name="gdprEmail" id="gdprEmail" />
            </Label>
          </FormGroup>
          <FormGroup check inline={true}>
            <Label check inline={true}>
              <Input
                type="checkbox"
                name="gdprPhoneDisplay"
                onClick={this.invertClick}
              />{" "}
              Phone
              <Input type="hidden" name="gdprPhone" id="gdprPhone" />
            </Label>
          </FormGroup>
          <FormGroup check inline={true}>
            <Label check>
              <Input
                type="checkbox"
                name="gdprTextDisplay"
                onClick={this.invertClick}
              />{" "}
              Text
              <Input type="hidden" name="gdprText" id="gdprText" />
            </Label>
          </FormGroup>
        </Gdpr>
      </Form>
    );
  }
}

export default WhitePaperForm;