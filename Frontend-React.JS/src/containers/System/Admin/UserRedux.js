import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeservice } from "../../../services/userService"
import { LANGUAGES, crudAction, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import "./UserRedux.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserRedux from './TableUserRedux';





class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            preViewimg: "",
            boximg: 'none',
            isOpen: 'falsr',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userId: '',

            action: ''

        }

    }

    async componentDidMount() {
        this.setState({
            action: crudAction.CREAT
        })





        try {
            await this.props.getGenderStart()
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.state.genderArr[0]

            })

            let resPosotion = await getAllcodeservice("position");
            if (resPosotion && resPosotion.errcode === 0) {
                this.props.getPositionSuccess(resPosotion.data)
                this.setState({
                    positionArr: this.props.positionRedux,
                    position: this.state.positionArr[0]

                })
            }
            let resRole = await getAllcodeservice("role");

            if (resRole && resRole.errcode === 0) {
                this.props.getRoleSuccess(resRole.data)
                this.setState({
                    roleArr: this.props.roleRedux,
                })
            }
            if (this.state.roleArr && this.state.roleArr.length > 0) {
                this.setState({
                    role: this.state.roleArr[0].keyMap
                })
            }
            if (this.state.genderArr && this.state.genderArr.length > 0) {
                this.setState({
                    gender: this.state.genderArr[0].keyMap
                })
            }
            if (this.state.positionArr && this.state.positionArr.length > 0) {
                this.setState({
                    position: this.state.positionArr[0].keyMap
                })
            }





        } catch (e) {
            console.log(e)
        }
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objUrl = URL.createObjectURL(file)
            this.setState({
                preViewimg: objUrl,
                boximg: 'block',
                avatar: base64


            })
        }

    }
    previewimg = () => {
        this.setState({
            isOpen: true
        })
    }


    onChangeInput = (event, index) => {
        let coppyState = { ...this.state }
        coppyState[index] = event.target.value
        this.setState({
            ...coppyState
        },)




    }
    checkValidateInput = () => {
        let isVale = true
        let arrCheck = ['email', 'password', 'firstName',
            'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isVale = false;
                alert(`missing ${arrCheck[i]} check it pl`)
                break
            }
        }
        return isVale;

    }
    handleSave = () => {
        let action = this.state.action
        this.checkValidateInput()
        if (!this.checkValidateInput()) {
            return;
        } else {
            if (action === crudAction.CREAT) {
                this.props.CreatNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionID: this.state.position,
                    avatar: this.state.avatar
                })
            }
            if (action === crudAction.EDIT) {
                this.props.EditUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    id: this.state.userId,
                    avatar: this.state.avatar

                })

                this.setState({ action: crudAction.CREAT })

            }


        }
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: this.state.genderArr[0].keyMap,
            position: this.state.positionArr[0].keyMap,
            role: this.state.roleArr[0].keyMap,
            avatar: '',
            actions: crudAction.CREAT,
            boximg: 'none',
            previewimg: ''

        })


    }


    handleEditUserFromParent = (user) => {
        let imageBase64 = ""
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            userId: user.id,
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: crudAction.EDIT,
            preViewimg: imageBase64,
            boximg: 'block',

        })



    }



    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let { email, password, firstName, lastName, address,
            phoneNumber, gender, position, role, avatar } = this.state







        return (
            <>
                <div className='userRedux-container'>
                    <div className="title" >Manage UserRedux redux</div>
                    <div className='userredux-Body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 my-3'> <FormattedMessage id="manageuser.add" /></div>
                                <div className='col-3'>
                                    <label>Email</label>
                                    <input className='form-control' type='text'
                                        value={email} onChange={(event) => this.onChangeInput(event, 'email')}
                                        disabled={this.state.action === crudAction.EDIT}
                                    />

                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.password" /> </label>
                                    <input className='form-control' type='password' value={password} onChange={(event) => this.onChangeInput(event, 'password')}
                                        disabled={this.state.action === crudAction.EDIT} />
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.firstName" /></label>
                                    <input className='form-control' type='text' value={firstName} onChange={(event) => this.onChangeInput(event, 'firstName')} />
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.lastName" /></label>
                                    <input className='form-control' type='text' value={lastName} onChange={(event) => this.onChangeInput(event, 'lastName')} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.phone" /></label>
                                    <input className='form-control' type='text' value={phoneNumber} onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className='col-9'>
                                    <label> <FormattedMessage id="manageuser.address" /></label>
                                    <input className='form-control' type='text' value={address} onChange={(event) => this.onChangeInput(event, 'address')} />
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.gender" /></label>
                                    <select className='form-control'
                                        onChange={(event) => this.onChangeInput(event, 'gender')}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.Position" /></label>
                                    <select className='form-control'
                                        onChange={(event) => this.onChangeInput(event, 'position')}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.Role" /></label>
                                    <select className='form-control'
                                        onChange={(event) => this.onChangeInput(event, 'role')}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label> <FormattedMessage id="manageuser.image" /></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' hidden type='file'
                                            onChange={(event) => this.handleOnchangeImg(event)}
                                        />
                                        <label className='lable-upload' htmlFor='previewImg'> <i className="fas fa-upload logo"></i>Tải ảnh</label>
                                        <div className='prewiew-image'></div>
                                        <div className='show' style={{ backgroundImage: `url(${this.state.preViewimg})`, display: `${this.state.boximg}` }}
                                            onClick={() => this.previewimg()}
                                        ></div>
                                    </div>


                                </div>

                                <button style={this.state.action === crudAction.EDIT ? { 'backgroundColor': "#96f39b" } : { 'backgroundColor': "#00faff" }}
                                    className={this.state.action === crudAction.EDIT ? 'btn btn-warning ps-2  my-4 mx-3' : 'btn btn-primary ps-2 my-4 mx-3'}
                                    onClick={() => this.handleSave()}
                                >
                                    {this.state.action === crudAction.EDIT ?
                                        <FormattedMessage id="manageuser.edit" />
                                        :
                                        <FormattedMessage id="manageuser.save" />

                                    }
                                </button>


                                {this.state.isOpen === true &&
                                    <Lightbox
                                        mainSrc={this.state.preViewimg}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }

                                <TableUserRedux
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />

                            </div>

                        </div>
                    </div>


                </div>






            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionSuccess: (data) => dispatch(actions.fetchPositionSUCCESS(data)),
        getRoleSuccess: (data) => dispatch(actions.fetchRoleSUCCESS(data)),
        CreatNewUser: (data) => dispatch(actions.CreatNewUser(data)),
        EditUser: (data) => dispatch(actions.editUser(data))





        //   processLogout: () => dispatch(actions.processLogout()),
        //   changuageLanguageAppRedux: (language) => dispatch(changuageLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
