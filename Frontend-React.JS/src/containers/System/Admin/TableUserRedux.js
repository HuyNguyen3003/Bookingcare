import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUserStyle.scss"
import * as actions from "../../../store/actions"










class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []



        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                userRedux: this.props.listUser
            })
        }
    }


    handledelete = (id) => {
        this.props.delluserredux(id)
    }

    handleGetIduser = (user) => {
        this.props.handleEditUserFromParent(user)
    }







    render() {
        let arrUser = this.state.userRedux



        return (
            <>
                <table id='TableManageUser' >
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>

                    </tr>

                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button onClick={() => this.handleGetIduser(item)} className='btn-edit'>Edit</button>
                                        <button onClick={() => this.handledelete(item.id)} className='btn-edit' >Delete</button>
                                    </td>
                                </tr>

                            )

                        })
                    }
                </table>
            </>




        )
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        delluserredux: (data) => dispatch(actions.fetchDeleteUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);








