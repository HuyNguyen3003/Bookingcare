import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyBooking } from "../../services/userService"
import HomeHeader from '../HomePage/HomeHeader';
import "./verifyEmail.scss"





class verifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0



        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let data = {}
            data.token = token
            data.doctorId = doctorId


            let result = await verifyBooking(data)

            if (result && (result.errCode === 0) || (result.errCode === 2)) {
                this.setState({
                    statusVerify: true,
                    errCode: result.errCode
                })
            } else {
                this.setState({
                    statusVerify: false,
                    errCode: -1
                })
            }



        }




    };



    async componentDidUpdate(prevProps, prevState) {



    };



    render() {
        let { statusVerify, errCode } = this.state









        return (
            <React.Fragment>

                <HomeHeader />
                <div className='verify-email-container'>
                    {
                        statusVerify === false ?
                            <div>Loading data...</div>
                            :
                            <div>

                                {errCode === 0
                                    ?
                                    <div>Xác nhận lịch hẹn thành công.!</div>
                                    :
                                    <div>Lịch hẹn không tồn tại hoặc đã xác nhận.!</div>
                                }

                            </div>

                    }
                </div>



            </React.Fragment >

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
