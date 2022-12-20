import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Modal, Button, Toast } from 'reactstrap'
import ProFileDoctor from '../proFileDoctor';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import { postBooking } from "../../../../services/userService"
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions"
import Select from 'react-select';
import { toast } from 'react-toastify'
import moment from 'moment/moment';







class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTime: [],
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''






        }
    }
    async componentDidMount() {
        await this.props.getGenderStart()


    };


    async componentDidUpdate(prevProps, prevState) {
        let { isOpenModalBooking, handleCloseModalee, dataSchedule } = this.props
        let { language, genders } = this.props

        if (language !== prevProps.language) {
            this.setState({ genders: this.buildDataGender(genders) })


        }


        if (dataSchedule !== prevProps.dataSchedule) {
            this.setState({ dataTime: dataSchedule })
            this.setState({ doctorId: dataSchedule.doctorId, timeType: dataSchedule.timeType })

        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({ genders: this.buildDataGender(genders) })
        }

    };

    buildDataGender = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result
    }


    handleOnchangeInput = (event, data) => {
        let target = event.target.value
        let stateCoppy = { ...this.state }
        stateCoppy[data] = target
        this.setState({
            ...stateCoppy
        })
    }


    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }



    handleChangeSelecter = async (selectedGender) => {

        this.setState({ selectedGender }); // set doctor select
        // let res = await getDetailDoctor(selectedDoctor.value)

    };

    buildTimeBooking = (dataTime) => {
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

            return (`${time} - ${date}`

            )
        }
        return <></>

    }

    buildDoctorName = (dataSchedule) => {
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let name = language === LANGUAGES.VI ?
                `${dataSchedule.doctorData.firstName}  ${dataSchedule.doctorData.lastName}`
                :
                `${dataSchedule.doctorData.lastName}  ${dataSchedule.doctorData.firstName}`


            return (`${name}`

            )
        }
        return <></>

    }

    handleConfirmBooking = async () => {
        // validate

        //
        let { fullName, phoneNumber, email, address, reason, birthday, doctorId, selectedGender, timeType } = this.state

        let { dataSchedule } = this.props


        let date = new Date(birthday).getTime()

        let StringTime = this.buildTimeBooking(dataSchedule)

        let nameDoctor = this.buildDoctorName(dataSchedule)

        let res = await postBooking({
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            reason: reason,
            date: date,
            doctorId: doctorId,
            selectedGender: selectedGender.value,
            timeType: timeType,
            timeString: StringTime,
            nameDoctor: nameDoctor,
            language: this.props.language


        })

        if (res && res.errCode === 0) {
            toast.success('booking a new appointment success ')
            this.props.handleCloseModalee()
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                timeType: '',

            })
        } else {
            toast.error('err!')

        }
    }






    render() {
        let { fullName, phoneNumber, email, address, reason, birthday, genders, doctorId, selectedGender } = this.state

        let { isOpenModalBooking, handleCloseModalee, dataSchedule } = this.props

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))













        return (
            <React.Fragment>

                <Modal isOpen={isOpenModalBooking} className={'booking-modal-contain'}
                    size='lg'
                    centered

                >
                    <div className='content-modal'>
                        <div className='content-head-modal'>
                            <span className='left'><FormattedMessage id="patient.bookingModale.tt1" /></span>
                            <span className='right'
                                onClick={handleCloseModalee}
                            ><i className="far fa-times-circle"></i></span>

                        </div>
                        <div className='content-body-modal'>
                            <div className='doctor-infor'>
                                <ProFileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={true}
                                    dataSchedule={dataSchedule}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.name" /></label>
                                    <input className='form-control'
                                        value={fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.phone" /></label>
                                    <input className='form-control'
                                        value={phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}

                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.email" /></label>
                                    <input className='form-control'
                                        value={email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}

                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.address" /></label>
                                    <input className='form-control'
                                        value={address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}

                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.birthdate" /></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={birthday}
                                        minDate={yesterday}
                                    />


                                </div>    <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.sex" /></label>
                                    <Select
                                        value={selectedGender}
                                        onChange={this.handleChangeSelecter}
                                        options={genders}
                                    />

                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.bookingModale.reason" /></label>
                                    <input className='form-control'
                                        value={reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}

                                    />

                                </div>


                            </div>

                        </div>
                        <div className='content-footer-modal'>
                            <button className='btn-booking'
                                onClick={() => this.handleConfirmBooking()}

                            ><FormattedMessage id="patient.bookingModale.Confirm" /></button>
                            <button className='btn-booking'
                                onClick={handleCloseModalee}

                            ><FormattedMessage id="patient.bookingModale.Cancel" /></button>


                        </div>
                    </div>
                </Modal>

            </React.Fragment >

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
