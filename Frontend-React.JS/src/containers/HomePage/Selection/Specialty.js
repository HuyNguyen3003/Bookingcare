/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Specialty.scss"
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService"
import { withRouter } from "react-router"








class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []



        }
    }

    async componentDidMount() {

        let res = await getAllSpecialty()

        if (res && res.errCode === 0) {
            this.setState({ dataSpecialty: res.data ? res.data : [] })
            //  console.log(this.state.dataSpecialty)
        }


    }

    handviewdetailDoctor = (docter) => {
        this.props.history.push(`/detail-specialty/${docter.id}`)

    }


    render() {

        let { dataSpecialty } = this.state

        let settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
        };

        return (
            <React.Fragment>

                <div className='section-specialty'>
                    <div className='font-content'>
                        <h1>{<FormattedMessage id="homepage.popular-specialties" />}</h1>
                    </div>
                    <div className='specialty-content'>
                        <Slider {...settings}>
                            <div className='img-one'>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className="img-wapper"
                                                key={index}
                                            >
                                                <img className='img-1' src={item.image}
                                                    onClick={() => this.handviewdetailDoctor(item)}
                                                />
                                                <h3 className='font-1'
                                                    onClick={() => this.handviewdetailDoctor(item)}
                                                >{item.name}</h3>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </Slider>
                    </div >
                </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
