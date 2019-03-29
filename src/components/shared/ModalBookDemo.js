import React, { Component } from "react";
import { ModalBody } from "reactstrap";
import ModalAngled from "components/shared/ModalAngled";
import ModalAngledClose from "components/shared/ModalAngledClose";

class ModalBookDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.createCalendly = this.createCalendly.bind(this);
  }

  componentDidMount() {
    this.detectBookDemo();
  }

  detectBookDemo() {
    // Globally detect book demo button click
    const classes = document.getElementsByClassName("trigger-bookdemo-modal");
    for (let i = 0; i < classes.length; i++) {
      classes[i].addEventListener("click", () => this.toggle());
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  createCalendly() {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const s = document.createElement("script");
    s.setAttribute("src", src);
    s.setAttribute("id", "calendlyScript");
    document.body.appendChild(s);
  }

  destroyCalendly() {
    document.getElementById("calendlyScript").outerHTML = "";
  }

  render() {
    return (
      <ModalAngled
        isOpen={this.state.modal}
        toggle={this.toggle}
        onOpened={this.createCalendly}
        onClosed={this.destroyCalendly}
      >
        <ModalAngledClose onClick={this.toggle} />
        <ModalBody>
          <div
            class="calendly-inline-widget"
            data-url="https://calendly.com/aptimisesales/demo"
            style={{ minWidth: "320px", height: "630px" }}
          />
        </ModalBody>
      </ModalAngled>
    );
  }
}

export default ModalBookDemo;
