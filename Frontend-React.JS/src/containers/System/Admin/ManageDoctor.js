import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import "./ManageDocter.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, crudAction } from "../../../utils"
import { changuageLanguage } from "../../../store/actions"
import { getDetailDoctor } from "../../../services/userService"
import { FormattedDate, FormattedMessage } from 'react-intl';







const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!








class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // save to markdown
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: '',
            check: false,
            listDoctor: [],
            // save to doctor infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecilty: [],


            SelectPrice: '',
            SelectPayment: '',
            SelectProvince: '',
            SelectClinic: "",
            SelectSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: "",
            ///
            clinicId: '',
            specialtyId: ''

        }
    }
    componentDidUpdate(PrevProps, prevState, snapShot) {
        if (PrevProps.language !== this.props.language) {
            let dataSelect = this.builedata(this.props.dataDoctor)
            this.setState({
                listDoctor: dataSelect
            })
            if (this.props.resDataDoctor && this.props.resDataDoctor.length > 0) {
                let { resPrice, resPayment, resProvince } = this.props.resDataDoctor
                let dataresPrice = this.builddataDoctor(resPrice.data)
                let dataresPayment = this.builddataDoctor(resPayment.data)
                let dataresProvince = this.builddataDoctor(resProvince.data)

                if (dataresPrice && dataresPayment && dataresProvince &&
                    dataresPrice.length > 0 && dataresPayment.length > 0 && dataresProvince.length > 0) {
                    this.setState({
                        listPrice: dataresPrice,
                        listPayment: dataresPayment,
                        listProvince: dataresProvince

                    })
                }
            }


        }
        if (PrevProps.resDataDoctor !== this.props.resDataDoctor) {

            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.resDataDoctor
            let dataresPrice = this.builddataDoctor(resPrice.data, "1")
            let dataresPayment = this.builddataDoctor(resPayment.data, "1")
            let dataresProvince = this.builddataDoctor(resProvince.data, "1")
            let dataSpecialty = this.builddataDoctor(resSpecialty.data, "0")

            if (dataresPrice && dataresPayment && dataresProvince &&
                dataresPrice.length > 0 && dataresPayment.length > 0 && dataresProvince.length > 0) {
                this.setState({
                    listPrice: dataresPrice,
                    listPayment: dataresPayment,
                    listProvince: dataresProvince,
                    listSpecilty: dataSpecialty

                })
            }

        }
    }

    async componentDidMount() {
        await this.props.fetchAllData();
        let dataSelect = this.builedata(this.props.dataDoctor)
        this.setState({
            listDoctor: dataSelect
        })
        await this.props.getRequiredInfor()

    }
    builedata = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {}
                let labelVi = `  ${item.firstName} ${item.lastName}`
                let labelEn = ` ${item.lastName} ${item.firstName} `
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }

        return result

    }
    builddataDoctor = (Data, type) => {
        let result = []
        let { language } = this.props
        if (Data && Data.length > 0 && type === '1') {

            Data.map((item) => {
                let object = {}
                let labelVi = item.valueVi
                let labelEn = item.valueEn
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.keyMap
                result.push(object)
            })
        } else {

            Data.map((item) => {
                let object = {}
                object.label = item.name
                object.value = item.id
                result.push(object)
            })

        }







        return result

    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })

    }
    handleChangeDoctorSelecter = async (selectedDoctor, name) => {
        let startName = name.name;
        let stateCoppy = { ...this.state }
        stateCoppy[startName] = selectedDoctor
        this.setState({
            ...stateCoppy
        })

    }


    handleChangeSelecter = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let { language } = this.props


            let Markdown = res.data.Markdown
            let doctor_Infor = res.data.doctor_Infor
            let addressClinic = ''
            let nameClinic = ''
            let note = ''
            let paymentId = {}
            let priceId = {}
            let provinceId = {}
            let specialtyId = {}


            if (doctor_Infor) {
                addressClinic = doctor_Infor.addressClinic
                nameClinic = doctor_Infor.nameClinic
                note = doctor_Infor.note
                if (language === LANGUAGES.VI) {
                    paymentId.label = doctor_Infor.paymentIdData.valueVi
                    priceId.label = doctor_Infor.priceIdData.valueVi
                    provinceId.label = doctor_Infor.provinceIdData.valueVi
                } else {
                    paymentId.label = doctor_Infor.paymentIdData.valueEn
                    priceId.label = doctor_Infor.priceIdData.valueEn
                    provinceId.label = doctor_Infor.provinceIdData.valueEn
                }
                paymentId.value = doctor_Infor.paymentId
                priceId.value = doctor_Infor.priceId
                provinceId.value = doctor_Infor.provinceId
                //
                specialtyId.label = doctor_Infor.specialtyidData.name
                specialtyId.value = doctor_Infor.specialtyidData.id




            }

            this.setState({
                check: true,
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                description: Markdown.description,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                SelectPayment: paymentId,
                SelectPrice: priceId,
                SelectProvince: provinceId,
                SelectSpecialty: specialtyId ? specialtyId : ""
            })


        } else {
            this.setState({
                check: false,
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                addressClinic: "",
                nameClinic: "",
                note: ""

            })

        }

    };

    handSaveContentDocter = () => {
        this.props.saveDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.check === true ? crudAction.EDIT : crudAction.CREAT,

            SelectPrice: this.state.SelectPrice.value,
            SelectPayment: this.state.SelectPayment.value,
            SelectProvince: this.state.SelectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.SelectClinic && this.state.SelectClinic.value ? this.state.SelectClinic.value : "",
            specialtyId: this.state.SelectSpecialty && this.state.SelectSpecialty.value ? this.state.SelectSpecialty.value : ""
        })
        this.setState({
            check: true
        })

    }

    handleChangeSelecterDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    inputDataDoctor = (event, index) => {
        let coppyState = { ...this.state }
        coppyState[index] = event.target.value
        this.setState({
            ...coppyState
        },)

    }










    render() {
        let { selectedDoctor, check, SelectPrice, SelectPayment, SelectProvince,
            SelectSpecialty, SelectClinic
        } = this.state;






















        return (
            <>

                <div className='manage-doctor-content'>
                    <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                    <div className='more-in4'>
                        <div className='content-left'>

                            <label><FormattedMessage id="admin.manage-doctor.choose" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelecter}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id="admin.manage-doctor.infor" /></label>
                            <textarea className='form-control'
                                onChange={(event) => this.handleChangeSelecterDesc(event)}
                                value={this.state.description}
                            ></textarea>


                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                            <Select
                                value={SelectPrice}
                                onChange={this.handleChangeDoctorSelecter}
                                options={this.state.listPrice}
                                name="SelectPrice"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.Select-payment" /> </label>
                            <Select
                                value={SelectPayment}
                                onChange={this.handleChangeDoctorSelecter}
                                options={this.state.listPayment}
                                name="SelectPayment"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.Choose-a-province" /> </label>
                            <Select
                                value={SelectProvince}
                                onChange={this.handleChangeDoctorSelecter}
                                options={this.state.listProvince}
                                name="SelectProvince"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.Clinic-name" /></label>
                            <input className='form-control' value={this.state.nameClinic} onChange={(event) => this.inputDataDoctor(event, "nameClinic")} />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.Address" /></label>
                            <input className='form-control' value={this.state.addressClinic} onChange={(event) => this.inputDataDoctor(event, "addressClinic")} />

                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.Note" /></label>
                            <input className='form-control' value={this.state.note} onChange={(event) => this.inputDataDoctor(event, "note")} />

                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>Chon chuyen khoa</label>
                            <Select

                                value={SelectSpecialty}
                                onChange={this.handleChangeDoctorSelecter}
                                options={this.state.listSpecilty}
                                name="SelectSpecialty"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chon phong kham</label>
                            <Select

                                value={SelectClinic}
                                onChange={this.handleChangeDoctorSelecter}
                                options={this.state.listClinic}
                                name="SelectClinic"
                            />
                        </div>

                    </div>

                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                    <button className='saveDoctor'
                        onClick={() => this.handSaveContentDocter()}
                    >{check === false ? <FormattedMessage id="admin.manage-doctor.create" /> : <FormattedMessage id="admin.manage-doctor.add" />}</button>
                </div>




            </>




        )
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users,
        dataDoctor: state.admin.topAllDoctor,
        language: state.app.language,
        resDataDoctor: state.admin.resDataDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllData: () => dispatch(actions.fetchGetAllTopDoctor()),
        changuageLanguageAppRedux: (language) => dispatch(changuageLanguage(language)),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data)),
        getRequiredInfor: () => dispatch(actions.getRequiredDoctorInfor()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);








