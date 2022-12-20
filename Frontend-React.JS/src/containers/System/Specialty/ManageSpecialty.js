import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { LANGUAGES, CommonUtils } from "../../../utils"


import "./ManageSpecialty.scss"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { addNewSpecialty } from "../../../services/userService"
import { toast } from 'react-toastify';



const mdParser = new MarkdownIt(/* Markdown-it options */);





class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionMarkdown: "",
            descriptionHTML: "",
            name: "",
            imageBase64: ""



        }
    }
    async componentDidMount() {



    };



    async componentDidUpdate(prevProps, prevState) {



    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })

    }

    handleOnchangeInput = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value

        this.setState({
            ...stateCoppy
        })
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            this.setState({
                imageBase64: base64
            })
        }

    }

    handleSaveNewSprcialty = async () => {

        let res = await addNewSpecialty(this.state)

        if (res && res.errCode === 0) {

            toast.success('success')
            this.setState({
                descriptionMarkdown: "",
                descriptionHTML: "",
                name: "",
                imageBase64: ""

            })

        } else {
            toast.error('err')

        }



    }



    render() {

        let { contentMarkdown, contentHTML, name, imageBase64 } = this.state












        return (
            <React.Fragment>

                <div className='Manage-specialty-container'>
                    <div className='ms-title'>Quản lí chuyên khoa</div>
                    <div className='add-new-specialty row'>

                        <div className='col-6 form-group'>
                            <label>Ten chuyen khoa</label>
                            <input className='form-control' type='text' value={name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")}
                            ></input>

                        </div>
                        <div className='col-6'>
                            <label>anh chuyen khoa</label>

                            <input className='form-control-file' type="file"
                                onChange={(event) => this.handleOnchangeImg(event)}
                            ></input>

                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>


                        <div className='col-12'>
                            <button className='btn-save-specialty'
                                onClick={() => this.handleSaveNewSprcialty()}
                            >Luu</button>
                        </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
