import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./RemedyModal.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Modal, Button } from 'reactstrap'
import { LANGUAGES, crudAction, CommonUtils } from "../../../utils"
import LoadingOverlay from 'react-loading-overlay'








class RemedyModale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: ''







        }
    }
    async componentDidMount() {



    };


    async componentDidUpdate(prevProps, prevState) {




        let { language } = this.props

        if (this.props.dataModal !== prevProps.dataModal) {
            if (this.props.dataModal && this.props.dataModal.email) {
                this.setState({
                    email: this.props.dataModal.email

                })

            }



        }


    };

    handleOnchangeImg = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                image: base64
            })
        }

    }

    handleSend = () => {
        this.props.sentReq(this.state)
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value })

    }






    render() {
        let { isOpenModal, closeModale } = this.props





















        return (
            <React.Fragment>

                <Modal isOpen={isOpenModal} className={'booking-modal-contain'}
                    size='lg'
                    centered >
                    <div className='content-modal'>
                        <div className='content-head-modal'>
                            <span className='left'>Gui hoa don kham benh</span>
                            <span className='right'
                                onClick={closeModale}
                            ><i className="far fa-times-circle"></i></span>

                        </div>
                        <div className='content-body-modal'>
                            <div className='row'>
                                <div className='col-6 '>
                                    <label>Email benh nhan</label>
                                    <input
                                        onChange={(event) => this.handleEmail(event)}
                                        className='form-control' type='email' value={this.state.email} />
                                </div>
                                <div className='col-6 '>
                                    <label>Chon file don thuoc</label>
                                    <input type='file'
                                        onChange={(event) => this.handleOnchangeImg(event)}
                                    />
                                </div>


                            </div>

                        </div>

                    </div>
                    <div className='content-footer-modal'>
                        <button className='btn-booking'
                            onClick={() => this.handleSend()}

                        ><FormattedMessage id="patient.bookingModale.Confirm" /></button>
                        <button className='btn-booking'
                            onClick={closeModale}
                        ><FormattedMessage id="patient.bookingModale.Cancel" /></button>


                    </div>

                </Modal>

            </React.Fragment >

        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModale);
