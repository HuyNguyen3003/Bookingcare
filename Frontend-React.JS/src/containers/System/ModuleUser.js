import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'



class ModalUser extends Component {

    constructor(pros) {
        super(pros);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggle()

    }

    keyboard = () => {

    }
    handleInput = (event, id) => {
        this.state[id] = event.target.value
        this.setState({
            ...this.state
        })

    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(' Missing parameter : ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleAddUser = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            this.props.creatNewUser(this.state)
        }
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        })
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'abc123'}
                backdrop={this.props.isOpen}
                keyboard={() => this.keyboard()}

            >
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 from-group'>
                                <label>Email</label>
                                <input value={this.state.email} onChange={(event) => this.handleInput(event, 'email')} type='text'></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label>password</label>
                                <input type='password' value={this.state.password} onChange={(event) => this.handleInput(event, 'password')}></input>
                            </div>
                        </div>
                        <div className='col-6 from-group'>
                            <label>firstName</label>
                            <input type='text' value={this.state.firstName} onChange={(event) => this.handleInput(event, 'firstName')}></input>
                        </div>
                        <div className='row'>
                            <div className='col-6 from-group'>
                                <label>lastName</label>
                                <input type='text' value={this.state.lastName} onChange={(event) => this.handleInput(event, 'lastName')}></input>
                            </div>
                            <div className='col-6 from-group'>
                                <label>address</label>
                                <input type='text' value={this.state.address} onChange={(event) => this.handleInput(event, 'address')}></input>

                            </div>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleAddUser()}>
                        Add New
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


