import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils"
import { getAllPatient, sendRemedy } from "../../../services/userService"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';








class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currenDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false




        }
    }
    componentDidUpdate(PrevProps, prevState, snapShot) {  // change language will changle name

    }

    async componentDidMount() {
        let { user } = this.props
        let { currenDate } = this.state
        let FormattedDate = new Date(currenDate).getTime()

        await this.getDataPatient(user.id, FormattedDate)


    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0]
        }, () => {
            let { user } = this.props
            let { currenDate } = this.state
            let FormattedDate = new Date(currenDate).getTime()
            this.getDataPatient(user.id, FormattedDate)
        })

    }


    getDataPatient = async (id, date) => {
        let res = await getAllPatient(id, date)

        if (res && res.errCode === 0) {
            this.setState({ dataPatient: res.data })
        }

    }

    handleBtnconFirm = (data) => {
        this.setState({ dataModal: data })
        this.setState({ isOpenRemedyModal: true })
    }

    closeModale = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}

        })
    }

    handleConfirmBooking = async (data) => {
        let { dataModal } = this.state
        this.setState({ isShowLoading: true })

        let res = await sendRemedy({
            email: data.email,
            image: data.image,
            doctorId: dataModal.doctorId,
            patientiId: dataModal.patientiId,
            timeType: dataModal.timeType,
            language: this.props.language,
            name: dataModal.patientData.firstName
        })
        if (res && res.errCode === 0) {
            this.closeModale()
            this.setState({ isShowLoading: false })
            let { user } = this.props
            let { currenDate } = this.state
            let FormattedDate = new Date(currenDate).getTime()
            await this.getDataPatient(user.id, FormattedDate)

        }

    }







    render() {
        let { dataPatient, dataModal } = this.state
        let { language } = this.props
        console.log(dataModal)






        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading your content...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>Quan li benh nhan</div>

                        <div className='manage-patient-body'>
                            <div className='col-4 form-group'>
                                <label>Chon ngay kham</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currenDate}
                                //  minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ 'width': '100%' }} >
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Time</th>
                                            <th>Full Name</th>
                                            <th>Gioi tinh</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {

                                                return (
                                                    language === LANGUAGES.VI ?
                                                        (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.patientDataPatient.valueVi}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.genderData.valueVi}</td>
                                                            <td>
                                                                <button className='mp-btn-confirm'
                                                                    onClick={() => this.handleBtnconFirm(item)}
                                                                >Xac nhan</button>

                                                            </td>

                                                        </tr>)
                                                        :
                                                        (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.patientDataPatient.valueEn}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.genderData.valueEn}</td>
                                                            <td>
                                                                <button className='mp-btn-confirm'
                                                                    onClick={() => this.handleBtnconFirm(item)}
                                                                >Xac nhan</button>

                                                            </td>

                                                        </tr>)

                                                )
                                            })
                                            :
                                            <>
                                                <tr >
                                                    <td>No data</td>
                                                </tr>
                                            </>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={this.state.isOpenRemedyModal}
                        dataModal={this.state.dataModal.patientData}
                        closeModale={this.closeModale}
                        sentReq={this.handleConfirmBooking}

                    />


                    <p>Some content or children or something.</p>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        user: state.user.userInfo




    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllData: () => dispatch(actions.fetchGetAllTopDoctor()),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data)),
        fetcharrSchedule: () => dispatch(actions.fetchGetAllScheduleTimes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
