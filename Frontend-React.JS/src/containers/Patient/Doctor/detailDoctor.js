import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import "./detailDoctor.scss"
import { getDetailDoctor } from "../../../services/userService"
import { LANGUAGES } from "../../../utils"
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './doctorExtraInfor';





class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: {},
            currentDoctorId: ''

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailDoctor(id)
            this.setState({
                inforDoctor: res.data
            })


        }
    };


    componentDidUpdate(prevProps, prevState) {

    };





    render() {

        let { inforDoctor } = this.state
        let { language } = this.props
        let labelVi = '', labelEn = ''
        if (inforDoctor && inforDoctor.id) {
            labelVi = `${inforDoctor.positionData.valueVi}  ${inforDoctor.firstName} ${inforDoctor.lastName}`
            labelEn = `${inforDoctor.positionData.valueEn} ${inforDoctor.lastName} ${inforDoctor.firstName} `

        }

        console.log(inforDoctor)







        return (
            <React.Fragment>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-Content'>
                    <div className='intro-Doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${inforDoctor && inforDoctor.image ? inforDoctor.image : ''})` }}
                        ></div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? labelVi : labelEn}
                            </div>
                            <div className='down'>{inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.description
                                &&
                                <span>{inforDoctor.Markdown.description}</span>
                            }
                            </div>
                        </div>

                    </div>
                    <div className='schedule-Doctor'>
                        <div className='content-Left'>
                            <DoctorSchedule
                                doctorId={this.state.currentDoctorId}
                            ></DoctorSchedule>
                        </div>
                        <div className='content-Right'>
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-Infor-Doctor'>
                        {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: inforDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-Doctor'></div>
                </div>





            </React.Fragment>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
