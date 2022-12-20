import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManageStyle.scss"
import { getAllUser, deleteUser, creatNewUser, updateUser } from "../../services/userService"
import ModuleUser from './ModuleUser';
import ModuleEditUser from './ModuleEditUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModule: false,
            isOpenModuleUpdate: false,
            userEdit: {},


        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let respones = await getAllUser('ALL')
        if (respones && respones.errCode === 0) {
            this.setState({
                arrUser: respones.users
            })
        }

    }
    handleDel = async (id) => {
        try {
            let respones = await deleteUser(id)
            if (respones && respones.errcode === 0) {
                await this.getAllUserFromReact()

            } else {
                alert(respones.errMessage)

            }

        } catch (e) {
            console.log(e)
        }

    }
    handAddNewUser = () => {
        this.setState({
            isOpenModule: true
        })


    }

    handleOpen = () => {
        this.setState({
            isOpenModule: !this.state.isOpenModule
        })

    }

    creatNewUsers = async (dataUser) => {
        try {
            let res = await creatNewUser(dataUser)
            if (res) {
                this.setState({
                    isOpenModule: false,
                })
            }
            this.getAllUserFromReact()


        } catch (e) {
            console.log(e)
        }


    }
    handleOpenEdit = () => {
        this.setState({
            isOpenModuleUpdate: !this.state.isOpenModuleUpdate,
        })

    }
    handleEdit = (userId) => {
        this.setState({
            userEdit: userId,
            isOpenModuleUpdate: true
        })


    }
    updateUser = async (dataUser) => {
        try {
            let res = await updateUser(dataUser)
            if (res) {
                this.setState({
                    isOpenModuleUpdate: false
                })
            }
            this.getAllUserFromReact()

        } catch (e) {
            console.log(e)
        }



    }

    render() {



        return (

            <div className="User-container">
                <ModuleUser
                    isOpen={this.state.isOpenModule}
                    toggle={this.handleOpen}
                    creatNewUser={this.creatNewUsers}
                />
                {
                    this.state.isOpenModuleUpdate &&
                    <ModuleEditUser
                        isOpen={this.state.isOpenModuleUpdate}
                        toggle={this.handleOpenEdit}
                        updateUser={this.updateUser}
                        currentUser={this.state.userEdit}

                    />
                }

                <div className='title text-center'>Manage User</div>
                <div className='mx-1'>
                    <button onClick={() => this.handAddNewUser()} className='btn btn-primay px-3'>ADD NEW USER</button>
                </div>
                <div className='text-center mt-4 mx-2'>
                    <table id="customers">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>

                        </tr>


                        {this.state.arrUser && this.state.arrUser.map((item) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => this.handleEdit(item)} className='btn-edit'>Edit</button>
                                            <button onClick={() => this.handleDel(item.id)} className='btn-edit' >Delete</button>

                                        </td>

                                    </tr>
                                </>


                            )
                        })

                        }






                    </table>

                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
