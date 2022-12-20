import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchelude.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES, crudAction, dateFormat } from "../../../utils"
import { getDetailDoctor } from "../../../services/userService"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { bulkCreat } from '../../../services/userService';








class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            listDoctor: [],
            currenDate: "",
            listSchedule: []


        }
    }
    componentDidUpdate(PrevProps, prevState, snapShot) {  // change language will changle name
        if (PrevProps.language !== this.props.language) {
            let dataSelect = this.builddata(this.props.dataDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    async componentDidMount() {
        await this.props.fetchAllData(); // call get arrdoctor
        await this.props.fetcharrSchedule()
        let dataSelect = this.builddata(this.props.dataDoctor) // get name and id push to lisst doctor
        let data = this.props.arrSchedule
        if (data && data.length > 0) {
            data = data.map(item => ({ ...item, isSelected: false }))
            this.setState({
                listSchedule: data
            })
        }

        this.setState({
            listDoctor: dataSelect,


        })
    }

    // sua lai ten
    builddata = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {}
                let labelVi = `  ${item.firstName} ${item.lastName}`
                let labelEn = ` ${item.lastName} ${item.firstName} `
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }

        return result

    }




    handleChangeSelecter = async (selectedDoctor) => {

        this.setState({ selectedDoctor }); // set doctor select
        // let res = await getDetailDoctor(selectedDoctor.value)

    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0]
        })

    }

    handleChangeSave = async () => {
        let { listSchedule, selectedDoctor, currenDate } = this.state;
        let result = []
        // let date = moment(currenDate).format(dateFormat.SEND_TO_SERVER)
        let date = new Date(currenDate).getTime()


        if (!currenDate || !selectedDoctor) {
            toast.error('mising infor')
            return
        }
        if (listSchedule && listSchedule.length > 0) {
            let time = listSchedule.filter(item => item.isSelected === true)
            if (time && time.length > 0) {
                time.map(item => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = date
                    object.timeType = item.keyMap
                    result.push(object)
                })
            }

        }

        await bulkCreat({
            data: result,
            doctorId: selectedDoctor.value,
            date: date
        })


        // set data after 
        this.setState({
            selectedDoctor: '',
            currenDate: "",
        })
        let data = listSchedule.map(item => ({ ...item, isSelected: false }))
        this.setState({
            listSchedule: data
        })







    }
    handleButton = (time) => {


        let { listSchedule } = this.state;
        if (listSchedule && listSchedule.length > 0) {
            let settime = listSchedule
            settime.map(item => {
                if (item.id === time.id) {
                    time.isSelected = !time.isSelected
                    return item
                }
            })
            this.setState({
                listSchedule: settime
            })





        }


    }





    render() {
        const { selectedDoctor, listSchedule } = this.state;
        const { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        // console.log(listSchedule)









        //const { isLoggedIn } = this.props;
        return (
            <>
                <div className='manage-schedule'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title"

                        />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={selectedDoctor}
                                    onChange={this.handleChangeSelecter}
                                    options={this.state.listDoctor}
                                />

                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>

                                <div>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={this.state.currenDate}
                                        minDate={yesterday}
                                    />

                                </div>

                            </div>
                            <div className='col-12 pick-hour-container'>
                                {listSchedule && listSchedule.length > 0
                                    &&
                                    listSchedule.map((item, index) => {

                                        return (
                                            <button
                                                className={item.isSelected === true ? ' timeSchedule active' : ' timeSchedule'}
                                                key={index}
                                                onClick={() => this.handleButton(item)}


                                            >{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</button>
                                        )
                                    })
                                }

                            </div>
                            <button className=' btn Save'
                                onClick={() => this.handleChangeSave()}

                            >
                                <FormattedMessage id="manage-schedule.save" />

                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        listUser: state.admin.users,
        dataDoctor: state.admin.topAllDoctor,
        arrSchedule: state.admin.arrSchedule,
        language: state.app.language




    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllData: () => dispatch(actions.fetchGetAllTopDoctor()),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data)),
        fetcharrSchedule: () => dispatch(actions.fetchGetAllScheduleTimes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
