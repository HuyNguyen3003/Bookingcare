import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Header.scss"
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from "../../utils/constant"
import { changuageLanguage } from "../../store/actions"

import Specialty from './Selection/Specialty';




class HomeHeader extends Component {

    handleLanguage = (language) => {
        this.props.changuageLanguageAppRedux(language)


    }

    render() {
        let language = this.props.language


        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-conter'>
                            <i className='fas fa-bars bar'></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-conter'>
                            <div className='chirld-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.search-docter" /></div>

                            </div>
                            <div className='chirld-content'>
                                <div><b><FormattedMessage id="homeheader.Health-facilitie" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.Choose-clinic" /> </div>

                            </div>
                            <div className='chirld-content'>
                                <div><b><FormattedMessage id="homeheader.Docter" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.Choose-good-doctor" /></div>

                            </div>
                            <div className='chirld-content'>
                                <div><b><FormattedMessage id="homeheader.health-check" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.health-check-full" /></div>

                            </div>
                        </div>
                        <div className='right-conter'>
                            <i className="fas fa-question question"></i>
                            <div><FormattedMessage id="homeheader.suport" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.handleLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.handleLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>


                    </div>

                </div>
                {this.props.isShowBanner &&
                    <div className='home-heder-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <input type='text' placeholder="Tìm kiếm theo chuyên khoa" />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child' >
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>

                                </div><div className='option-child' >
                                    <div className='icon-child'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>

                                </div><div className='option-child' >
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>

                                </div><div className='option-child' >
                                    <div className='icon-child'>
                                        <i className="fas fa-user-tie"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>

                                </div><div className='option-child' >
                                    <div className='icon-child'>
                                        <i className="fab fa-creative-commons-sampling-plus"></i>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>

                                </div>
                            </div >
                        </div>



                    </div>
                }
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
        changuageLanguageAppRedux: (language) => dispatch(changuageLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
