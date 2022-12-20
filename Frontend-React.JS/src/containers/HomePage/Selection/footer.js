import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./footer.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../../assets/images/logo.jpg"
import { FormattedMessage } from 'react-intl'







class footer extends Component {




    render() {


        return (
            <React.Fragment>

                <div className="footer">
                    <div className="footer-handbook">
                        <div className="footer-handbook_title">{<FormattedMessage id="homepage.Handbook" />}</div>

                        <a className="footer-handbook_button" href="http://">TẤT CẢ BÀI VIẾT</a>
                        <div className="footer-handbook_sub1">
                            <img src="https://cdn.bookingcare.vn/fr/w1000/2022/09/30/150540-nieng-rang-trong-suot-invisalign-o-dau.png" alt="" className="footer-handbook_img1"></img>

                            <a className="footer-handbook_sub1__content1" href="http://">Niềng răng trong suốt Invisalign ở đâu tốt Hà Nội - Review chi tiết</a>
                        </div>
                        <div className="footer-handbook_sub2">
                            <img src="https://cdn.bookingcare.vn/fr/w1000/2022/09/30/143818-nha-khoa-quan-tan-binh.png" alt="" className="footer-handbook_img2"></img>
                            <a className="footer-handbook_sub2__content2" href="http://">Nha khoa quận Tân Bình: Review phòng nha tốt, uy tín</a>
                        </div>


                    </div>
                </div>

                <div className='in4-end'>
                    <div style={{ height: '30px' }}></div>
                    <div className='end-title'>{<FormattedMessage id="homepage.Media-talk-about" />}</div>
                    <div className='end-content'>
                        <iframe width="640" height="335"
                            src="https://www.youtube.com/embed/1ntkDbxTnXA"
                            title="PHÚC DU - đứa nào làm em buồn? Ft. Hoàng Dũng ( Official MV )"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <img className='logo' src={logo} />

                    </div>
                    <div className='license'>
                        <div className='time'>© 2022 ZiilalCare.</div>
                        <div className='socialMedia'>
                            <i className="fab fa-youtube"></i>
                            <i className="fab fa-facebook-square"></i>
                        </div>
                    </div>
                </div >

                <div style={{ height: '200px' }}></div>




            </React.Fragment >

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

export default connect(mapStateToProps, mapDispatchToProps)(footer);
