import React, {Component} from 'react';
import {Icon, Row, Col, Button} from 'antd';
import {connect} from 'dva';
import axios from 'axios';
import classnames from 'classnames';

@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class upIdCard extends Component {
    constructor () {
        super();
        this.state = {
            'base64':'',
            'percent':0,
            'filename': ''
        };
    }
    componentWillMount () {
        //读取base64得到图片
        let thepic = this.props.info.file;
        //上传前预览
        let fr = new FileReader();
        //读取这个图片
        fr.readAsDataURL(thepic);
        fr.onload = (e) =>{
            this.setState({
                'base64': e.target.result
            });
        };
        //创建虚拟表单
        let form = new FormData();
        //在虚拟表单中追加图片
        form.append('file', thepic);
        axios.post('/api/uppic', form, {
            headers: {'Content-Type': 'multipart/form-data'},
            //进度
            onUploadProgress: ProgressEvent => {
                let complete = ProgressEvent.loaded / ProgressEvent.total * 100;
                this.setState({
                    percent: complete
                });
            }
        }).then(data => {
            this.setState({
                'filename': data.data.filename
            });
        });
    }
    render () {
        return (
            <div {...this.props} className={classnames(['onepicbox', {
                'done': this.state.percent === 100
            }])} style={{
                'backgroundImage': `url(${this.state.base64})`,
                'backgroundSize': 'cover',
                'backgroundPosition': 'center center'
            }} data-filename={this.state.filename}>
                <i
                    className="chazi"
                    onClick={()=>{
                        //父亲传了一个info,info就是添加图片的信息时候，定义了一个id
                        this.props.another.del(this.props.info.id);
                    }}
                >X</i>
                <div
                    className="jdt"
                    style={{
                        'display': this.state.percent === 100 ? 'none' : 'block'
                    }}
                >
                    <b style={{
                        'width': this.state.percent + '%',
                        'backgroundColor': (()=>{
                            if (this.state.percent < 20){
                                return 'red';
                            } else if (this.state.percent < 50) {
                                return 'orange';
                            } else if (this.state.percent < 70) {
                                return 'yellow';
                            } else {
                                return 'yellowgreen';
                            }
                        })()
                    }}></b>
                </div>
            </div>
        );
    }
}
