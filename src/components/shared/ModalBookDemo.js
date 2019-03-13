import React from 'react';
import { ModalBody } from "reactstrap"
import ModalAngled from "components/shared/ModalAngled"
import ModalAngledClose from "components/shared/ModalAngledClose"

class ModalBookDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.detectBookDemo()
    }

    detectBookDemo() {
        const classes = document.getElementsByClassName('trigger-bookdemo-modal')
        for (let i = 0; i < classes.length; i++) {
            classes[i].addEventListener('click', () => this.toggle())
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <ModalAngled isOpen={this.state.modal} toggle={this.toggle}>
                <ModalAngledClose onClick={this.toggle} />
                <ModalBody>
                    <div class="calendly-inline-widget" data-url="https://calendly.com/aptimise" style={{minWidth: "320px", height: "580px"}}></div>
                    {/* <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script> */}
                </ModalBody>
            </ModalAngled>
        );
    }
}

export default ModalBookDemo