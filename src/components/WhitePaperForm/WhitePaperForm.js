import React, { Component } from "react"
import { Form, FormGroup } from "reactstrap";
import Button from "components/shared/Button"
import FloatingLabelInput from "components/shared/FloatingLabelInput"

class WhitePaperForm extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <FloatingLabelInput
                        label="Full name*"
                        type="text"
                        name="name"
                        // value={this.state.value}
                        // onChange={this.handleTextChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FloatingLabelInput
                        label="Email*"
                        type="email"
                        name="email"
                    // value={this.state.value}
                    // onChange={this.handleTextChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FloatingLabelInput
                        label="Mobile*"
                        type="text"
                        name="mobile"
                    // value={this.state.value}
                    // onChange={this.handleTextChange}
                    />
                </FormGroup>
                <FormGroup>
                    <FloatingLabelInput
                        label="Acounting System (e.g. Sage 50, Xero)*"
                        type="text"
                        name="system"
                    // value={this.state.value}
                    // onChange={this.handleTextChange}
                    />
                </FormGroup>
                <Button className="mt-3" purple block as="a" href="/pdfs/Aptimise_Whitepaper_Final.pdf" download>download whitepaper</Button>
            </Form>
        )
    }
}

export default WhitePaperForm
