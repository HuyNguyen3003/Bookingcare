import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DetailClinic.scss"

import { getAllClinicbyId } from "../../../services/userService"
import HomeHeader from '../../HomePage/HomeHeader';







class DtailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrData: [],




        }
    }
    async componentDidMount() {










        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idClinic = this.props.match.params.id
            let res = await getAllClinicbyId(idClinic)
            if (res && res.errCode === 0) {
                let data = res.data

                console.log(data)
                this.setState({
                    arrData: data,

                })




            }




        }



    };



    async componentDidUpdate(prevProps, prevState) {





    };


    handleSelectProvince = async (event) => {
        this.setState({ selectProvince: event.target.value })


    }



    render() {
        let { arrData } = this.state
        let { language } = this.props














        return (
            <React.Fragment>
                <HomeHeader />


                <div className='containents'>
                    <div className='infor'>
                        <div className='avatar'
                            style={{ backgroundImage: `url(${arrData && arrData.image ? arrData.image : ''})` }}
                        ></div>
                        <div className='name'>{arrData.name ? arrData.name : ""}</div>
                        <div className='address'>{arrData.address ? arrData.address : ""}</div>

                    </div>


                    <div className='description-specialt'>

                        {arrData && arrData.descriptionHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: arrData.descriptionHTML }}></div>
                        }


                    </div>








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

export default connect(mapStateToProps, mapDispatchToProps)(DtailClinic);
