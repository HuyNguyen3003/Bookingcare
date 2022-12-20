import React, { Component } from 'react';

import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss"
import { FormattedMessage } from 'react-intl'
import { getAllClinic } from "../../../services/userService"
import { withRouter } from "react-router"





class MedicalFacilitye extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []



        }
    }



    async componentDidMount() {

        let res = await getAllClinic()

        if (res && res.errCode === 0) {
            this.setState({ dataClinic: res.data ? res.data : [] })
        }


    }

    handviewdetailDoctor = (clinic) => {

        this.props.history.push(`/detail-clinic/${clinic.id}`)


    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
        };

        let { dataClinic } = this.state
        console.log(dataClinic)


        return (
            <>
                <div className='MedicalFacilitye'>
                    <div className='section-specialtyee'>
                        <div className='font-content'>
                            <h1>{<FormattedMessage id="homepage.Outstanding-medical-facility" />}</h1>
                        </div>
                        <div className='specialty-content'>
                            <Slider {...settings}>
                                <div className='img-one'>
                                    {dataClinic && dataClinic.length > 0
                                        &&
                                        dataClinic.map((item, index) => {
                                            return (
                                                <div className="img-wapper" key={index}>
                                                    <img className='img-1-1' src={item.image} />
                                                    <div className='font-1-1'
                                                        onClick={() => this.handviewdetailDoctor(item)}
                                                    >{item.name}</div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>


                            </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacilitye));
