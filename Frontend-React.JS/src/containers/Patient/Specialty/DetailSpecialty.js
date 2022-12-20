import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss"
import { FormattedDate, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { getAllSpecialtybyId, getAllcodeservice } from "../../../services/userService"
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/doctorExtraInfor';
import ProFileDoctor from "../Doctor/proFileDoctor"
import _ from 'lodash';
import { Link } from 'react-router-dom';





class DtailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrData: [],
            arrDoctorId: [],
            listProvince: [],
            selectProvince: 'ALL',
            location: 'ALL'



        }
    }
    async componentDidMount() {



        let res = await getAllcodeservice('PROVINCE')
        let dataProvince = []

        dataProvince.push({
            keyMap: "ALL",
            valueEn: "ALL",
            valueVi: "Toàn Quốc"
        })

        if (res && res.errcode === 0) {
            let data = res.data
            data.map(item => {
                dataProvince.push(item)
            })





            this.setState({
                listProvince: dataProvince
            })


        }







        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idSpecialty = this.props.match.params.id
            let res = await getAllSpecialtybyId(idSpecialty, this.state.location)
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.specialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    arrData: res.data,
                    arrDoctorId: arrDoctorId
                })




            }




        }



    };



    async componentDidUpdate(prevProps, prevState) {
        if (this.state.selectProvince !== prevState.selectProvince) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let idSpecialty = this.props.match.params.id
                let res = await getAllSpecialtybyId(idSpecialty, this.state.selectProvince)
                if (res && res.errCode === 0) {
                    let data = res.data
                    let arrDoctorId = []
                    if (data && !_.isEmpty(res.data)) {
                        let arr = data.specialty
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }

                    this.setState({
                        arrData: res.data,
                        arrDoctorId: arrDoctorId
                    })


                }
            }

        }




    };


    handleSelectProvince = async (event) => {
        this.setState({ selectProvince: event.target.value })


    }



    render() {
        let { arrData, arrDoctorId, listProvince } = this.state
        let { language } = this.props














        return (
            <React.Fragment>
                <HomeHeader />

                <div className='containent'>
                    <div className='description-specialt'>

                        {arrData && arrData.description && arrData.description.descriptionHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: arrData.description.descriptionHTML }}></div>
                        }


                    </div>

                    <div className='Search-Doctor'>
                        <select onChange={(event) => this.handleSelectProvince(event)}>
                            {listProvince && listProvince.length > 0
                                &&
                                listProvince.map((item, index) => {
                                    if (language === LANGUAGES.VI) {
                                        return (
                                            <option value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    } else {
                                        return (
                                            <option vvalue={item.keyMap}>{item.valueEn}</option>
                                        )
                                    }

                                })

                            }

                        </select>

                    </div>



                    {arrDoctorId && arrDoctorId.length > 0
                        &&
                        arrDoctorId.map((item, index) => {

                            return (
                                <div>
                                    <div className='each-doctor' key={index}>
                                        <div className='content-left'>
                                            <div className='doctor-infor'>
                                                <ProFileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                // dataSchedule={dataSchedule}
                                                />
                                                <div className='View-detail-doctor'
                                                ><Link to={`/detail-doctor/${item}`}>Xem thêm</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='content-rights'>

                                            <DoctorSchedule
                                                doctorId={item}
                                                key={index} />
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                                key={index} />

                                        </div>



                                    </div>
                                </div>


                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DtailSpecialty);
