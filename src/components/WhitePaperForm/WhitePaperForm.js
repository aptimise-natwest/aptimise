import React, { Component } from "react";
import { Form, FormGroup, Alert, Label, Input } from "reactstrap";
import Button from "components/shared/Button";
import FloatingLabelInput from "components/shared/FloatingLabelInput";
import styled from "styled-components";
// import PPTnCFormFieldCheckbox from "components/shared/form/Fields/PPTnCFormFieldCheckbox";

import PPTnCFormFieldCheckbox from "components/shared/form/Fields/PPTnCFormFieldCheckbox";

const Gdpr = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  display: block;
  text-align: center;

  .form-check-label {
    margin-bottom: 0;
    font-size: 0.65em;
    font-weight: 400;
    color: #787878;
  }
`;

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

const AlertPlaceHolder = styled(Alert)`
  margin: 10px;
`;

const FormDesc = styled.p`
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.1rem;
`;

const FormDescGDPR = styled.p`
  text-align: left;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 0.1rem;
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
    gdprLetter,
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
      gdprLetter: form.gdprLetter.checked,
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
      data.gdprLetter,
      data.gdprEmail,
      data.gdprPhone,
      data.gdprText
    );
    let validation = !(
      form.checkValidity() &&
      !(errors.length > 0) &&
      form.gdprPPDisplay.checked
    );
    this.setState({ errors: validation, messages: errors });

    let link = document.getElementById("whitepaperformdownloadbutton");

    if (validation) {
      link.removeAttribute("href");
      return;
    }

    link.setAttribute("href", "/pdfs/Aptimise-whitepaper.pdf");

    if (form.gdprLetter.value === "") {
      form.gdprLetter.value = "false";
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
        action="http://go.pardot.com/l/598401/2019-10-24/32rhj2"
        method="post"
        id="whitepaper"
      >
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
        <AlertPlaceHolder
          color="danger"
          isOpen={this.state.errors}
          id="form-alert-message"
        >
          Please complete all of the required fields.
          {/* {this.state.errors
            ? this.state.messages.map(r => {
                return <ul>{r}</ul>;
              })
            : ""} */}
        </AlertPlaceHolder>
        <Gdpr>
          <FormGroup check inline={true}>
            <Label check>
              <FormDescGDPR>
                <Input
                  type="checkbox"
                  name="gdprPPDisplay"
                  onClick={this.invertClick}
                />
                {/* <>
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
                  <LinkItem
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </LinkItem>
                </> */}
                <PPTnCFormFieldCheckbox></PPTnCFormFieldCheckbox>
              </FormDescGDPR>
              <Input type="hidden" name="gdprPP" id="gdprPP" />
            </Label>
          </FormGroup>
        </Gdpr>
        <div />
        <br></br>
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
                name="gdprLetterDisplay"
                onClick={this.invertClick}
              />{" "}
              Letter
              <Input type="hidden" name="gdprLetter" id="gdprLetter" />
            </Label>
          </FormGroup>
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
