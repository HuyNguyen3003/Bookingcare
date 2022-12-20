import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader"
import MedicalFacility from './Selection/MedicalFacility';
import Docter from './Selection/docter';
import Footer from './Selection/footer';
import Specialty from './Selection/Specialty';


class HomePage extends Component {

    render() {


        return (
            <>
                <HomeHeader isShowBanner={true}></HomeHeader>
                <Specialty />

                <MedicalFacility />
                <Docter />
                <Footer />


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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
