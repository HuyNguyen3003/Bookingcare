import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss"
import { getSchedule } from "../../../services/userService"
import moment from 'moment/moment';
import localization from "moment/locale/vi"
import { FormattedDate, FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';


import { LANGUAGES } from "../../../utils"




class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            scheduleOnDay: [],
            isOpenModalBooking: false,
            dataSchedule: []


        }
    }
    async componentDidMount() {
        let { language } = this.props
        let allDay = this.getAllDay(language)
        if (this.props.doctorId) {
            let res = await getSchedule(this.props.doctorId, allDay[0].value)
            this.setState({
                allDays: allDay,
                scheduleOnDay: res.data ? res.data : []

            })

        }

        if (allDay && allDay.length > 0) {
            this.setState({
                allDays: allDay,

            })



        }


    };



    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props
            let allDay = this.getAllDay(language)
            this.setState({
                allDays: allDay
            })

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let { language } = this.props
            let allDay = this.getAllDay(language)

            if (allDay && allDay.length > 0) {
                let res = await getSchedule(this.props.doctorId, allDay[0].value)
                this.setState({
                    allDays: allDay,
                    scheduleOnDay: res.data ? res.data : []

                })



            }

        }

    };

    FirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getAllDay = (language) => {
        let arrDate = []

        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                if (i === 0) {
                    let lableVi2 = moment(new Date()).add(i, 'days').format('DD/MM')
                    lableVi = `Hôm nay - ${lableVi2}`

                }
                obj.label = this.FirstLetter(lableVi)
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                if (i === 0) {
                    let lableEn2 = moment(new Date()).add(i, 'days').format('DD/MM')
                    let lableEn = `Today - ${lableEn2}`
                    obj.label = lableEn

                }

            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()




            arrDate.push(obj)
        }
        return arrDate

    }

    CallSchedule = async (event) => {
        if (this.props.doctorId !== -1) {
            let date = event.target.value
            let doctorId = this.props.doctorId
            let res = await getSchedule(doctorId, date)
            if (res.data) {
                this.setState({
                    scheduleOnDay: res.data
                })
            }

        }




    }
    handleClickScheduleTime = (data) => {

        this.setState({
            isOpenModalBooking: true,
            dataSchedule: data

        })

    }
    handleCloseModalee = () => {
        this.setState({
            isOpenModalBooking: false

        })

    }






    render() {
        let { allDays, scheduleOnDay } = this.state
        let { language } = this.props










        return (
            <React.Fragment>
                <BookingModal
                    isOpenModalBooking={this.state.isOpenModalBooking}
                    dataSchedule={this.state.dataSchedule}
                    handleCloseModalee={this.handleCloseModalee}
                />


                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.CallSchedule(event)}>
                            {allDays && allDays.length > 0
                                &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}>
                                            {item.label}</option>

                                    )
                                })
                            }

                        </select>

                    </div>
                    <div className='all-availble-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span></i>
                        </div>
                        <div className='time-content'>
                            {scheduleOnDay && scheduleOnDay.length > 0 ?
                                <>{

                                    scheduleOnDay.map((item, index) => {
                                        return (
                                            <button key={index}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >
                                                {language === LANGUAGES.VI ?
                                                    item.timeTypeData.valueVi :
                                                    item.timeTypeData.valueEn
                                                }



                                            </button>


                                        )
                                    })

                                }
                                    <div>
                                        <div className='book-free'> <FormattedMessage id="patient.detail-doctor.choose" /><i className='far fa-hand-point-up'></i> </div>

                                    </div>
                                </>
                                :
                                <span> <FormattedMessage id="patient.detail-doctor.no-schedule" /></span>
                            }

                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
