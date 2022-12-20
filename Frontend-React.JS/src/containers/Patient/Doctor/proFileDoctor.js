import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./proFileDoctor.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { getinforDoctor } from "../../../services/userService"
import NumberFormat from "react-number-format"
import _ from 'lodash';
import moment from 'moment/moment';







class profileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            price: '',



        }
    }
    async componentDidMount() {

        let data = await this.getInforDoctor(this.props.doctorId)
        if (data) {
            this.setState({
                dataProfile: data
            })
        }







    };



    async componentDidUpdate(prevProps, prevState) {
        let { language } = this.props






    };


    getInforDoctor = async (doctorid) => {
        let result = {}
        if (doctorid) {
            let res = await getinforDoctor(doctorid)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi
                :
                dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.bookingModale.Free-booking" /></div>

                </>
            )
        }
        return <></>

    }


    render() {

        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataSchedule } = this.props
        let labelVi = '', labelEn = ''
        if (dataProfile && dataProfile.id) {
            labelVi = `${dataProfile.positionData.valueVi}  ${dataProfile.firstName} ${dataProfile.lastName}`
            labelEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName} `

        }

















        return (
            <React.Fragment>

                <div className='intro-Doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    ></div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? labelVi : labelEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === false ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>

                                    {this.renderTimeBooking(dataSchedule)}
                                </>
                            }
                        </div>

                    </div>

                </div>
                <div className='price'> <FormattedMessage id="patient.bookingModale.price" />
                    {
                        dataProfile && dataProfile.doctor_Infor && language === LANGUAGES.VI ?
                            <>
                                < NumberFormat
                                    value={dataProfile.doctor_Infor.priceIdData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            </>
                            : ""
                    }
                    {
                        dataProfile && dataProfile.doctor_Infor && language === LANGUAGES.EN ?
                            <>
                                < NumberFormat
                                    value={dataProfile.doctor_Infor.priceIdData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            </>
                            : ""
                    }
                    {language === LANGUAGES.VI ? ' đ  ' : " $  "}
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

export default connect(mapStateToProps, mapDispatchToProps)(profileDoctor);
