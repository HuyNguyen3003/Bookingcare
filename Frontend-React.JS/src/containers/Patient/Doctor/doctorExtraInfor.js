import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./doctorExtraInfor.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { getExtraInfor } from "../../../services/userService"
import NumberFormat from "react-number-format"




class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
            price: '',
            payment: '',
            province: ''



        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let { language } = this.props
            let data = await getExtraInfor(this.props.doctorIdFromParent)
            if (data && data.errCode === 0) {
                this.setState({
                    extraInfor: data.data
                })
                if (this.state.extraInfor && this.state.extraInfor.priceIdData) {
                    let prices = language === LANGUAGES.VI ? this.state.extraInfor.priceIdData.valueVi : this.state.extraInfor.priceIdData.valueEn
                    this.setState({
                        price: prices
                    })
                    let payments = language === LANGUAGES.VI ? this.state.extraInfor.paymentIdData.valueVi : this.state.extraInfor.paymentIdData.valueEn
                    this.setState({
                        payment: payments
                    })
                    let provinces = language === LANGUAGES.VI ? this.state.extraInfor.provinceIdData.valueVi : this.state.extraInfor.provinceIdData.valueEn
                    this.setState({
                        province: provinces
                    })
                }


            }
        }




    };



    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props
            let { extraInfor } = this.state
            if (extraInfor && extraInfor.priceIdData) {
                let prices = language === LANGUAGES.VI ? extraInfor.priceIdData.valueVi : extraInfor.priceIdData.valueEn
                this.setState({
                    price: prices
                })
            }
            if (extraInfor && extraInfor.paymentIdData) {
                let payments = language === LANGUAGES.VI ? extraInfor.paymentIdData.valueVi : extraInfor.paymentIdData.valueEn
                this.setState({
                    payment: payments
                })
            }
            if (extraInfor && extraInfor.provinceIdData) {
                let provinces = language === LANGUAGES.VI ? extraInfor.provinceIdData.valueVi : extraInfor.provinceIdData.valueEn
                this.setState({
                    province: provinces
                })
            }


        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let { language } = this.props
            let data = await getExtraInfor(this.props.doctorIdFromParent)
            if (data && data.errCode === 0) {
                this.setState({
                    extraInfor: data.data
                })
                if (this.state.extraInfor && this.state.extraInfor.priceIdData) {
                    let prices = language === LANGUAGES.VI ? this.state.extraInfor.priceIdData.valueVi : this.state.extraInfor.priceIdData.valueEn
                    this.setState({
                        price: prices
                    })
                    let payments = language === LANGUAGES.VI ? this.state.extraInfor.paymentIdData.valueVi : this.state.extraInfor.paymentIdData.valueEn
                    this.setState({
                        payment: payments
                    })
                    let provinces = language === LANGUAGES.VI ? this.state.extraInfor.provinceIdData.valueVi : this.state.extraInfor.provinceIdData.valueEn
                    this.setState({
                        province: provinces
                    })
                }


            }
        }


    };
    isShowDetailInfor = (isShowDetailInfor) => {
        this.setState({
            isShowDetailInfor: !isShowDetailInfor
        })

    }






    render() {
        let { isShowDetailInfor, extraInfor, price, payment, province } = this.state









        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id="patient.extra-infor.ADDRESS" /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''} - {province}</div>



                    </div>
                    <div className='content-down'>
                        {isShowDetailInfor === false &&
                            <div><FormattedMessage id="patient.extra-infor.PRICE" /> :
                                <NumberFormat
                                    value={price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />{this.props.language === LANGUAGES.VI ? ' đ  ' : " $  "}
                                <span style={{ cursor: "pointer", color: "blue" }}
                                    onClick={() => this.isShowDetailInfor(isShowDetailInfor)}>
                                    <FormattedMessage id="patient.extra-infor.See-details" /></span></div>
                        }
                        {isShowDetailInfor === true &&
                            <div style={{ border: "1px solid #ddd", padding: '5px' }}>
                                <div><FormattedMessage id="patient.extra-infor.PRICE" /> :
                                    <NumberFormat
                                        value={price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />{this.props.language === LANGUAGES.VI ? ' đ' : " $"}</div>
                                <div style={{ border: "1px solid #ddd", padding: '5px', backgroundColor: 'rgb(221 221 221)' }}  >
                                    <div>{extraInfor.note}

                                    </div>
                                    <div style={{ border: "1px solid #ddd", padding: '5px', backgroundColor: ' rgb(147 142 142)' }}>
                                        <FormattedMessage id="patient.extra-infor.tt2" /> {payment}

                                    </div>
                                    <span style={{ cursor: "pointer", color: "blue" }} onClick={() => this.isShowDetailInfor(isShowDetailInfor)}>
                                        <FormattedMessage id="patient.extra-infor.Hide" /></span>
                                </div>
                            </div>


                        }






                    </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
