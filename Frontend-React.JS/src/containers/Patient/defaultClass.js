import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"





class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {



        }
    }
    async componentDidMount() {



    };



    async componentDidUpdate(prevProps, prevState) {



    };



    render() {










        return (
            <React.Fragment>



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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
