import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./docter.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES, CommonUtils } from "../../../utils"
//import { changuageLanguage } from "../../../store/actions"
import { FormattedMessage } from 'react-intl'
import { withRouter } from "react-router"


class MedicalFacilitye extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })


        }
    }
    componentDidMount() {
        this.props.loadDoctor()


    }

    handviewdetailDoctor = (docter) => {
        this.props.history.push(`/detail-doctor/${docter.id}`)

    }





    render() {

        let arrDoctors = this.state.arrDoctor.data;
        let { language } = this.props
        console.log(this.state.arrDoctor)








        return (
            <>

                <div className='DocterStyle'>
                    <div className='section-docter'>
                        <div className='font-content'>
                            <h1>{<FormattedMessage id="homepage.out-standing-doctor" />}</h1>
                        </div>
                        <div className='docter-content'>
                            {arrDoctors && arrDoctors.length > 0
                                &&

                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }

                                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}  `
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName}  ${item.firstName} `


                                    return (
                                        <>

                                            <div className='content' key={index}
                                                onClick={() => this.handviewdetailDoctor(item)}
                                            >
                                                <div className="img-wapper">
                                                    <h5 className='top' >TOP {index + 1}</h5>
                                                    <div className='imgdocter'
                                                        style={{ 'backgroundImage': `url(${imageBase64})` }} /> <br />
                                                    <span className='name'>{language === LANGUAGES.VI ? nameVi : nameEn}</span><br />
                                                    <span className='khoa'>Xem chi tiết.</span>
                                                </div>

                                            </div>
                                        </>

                                    )
                                })
                            }


                        </div >
                    </div >

                </div>


            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDoctor: () => dispatch(actions.fetchGetTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacilitye));

