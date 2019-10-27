import React, {Component} from 'react';
import {Button, message, Icon, Progress} from 'antd';
import axios from 'axios';

export default class Test extends Component {
    constructor () {
        super();
        this.state = {
            //图片文件名称
            filename:'',
            base64:''
        };
    }
    render () {
        return (
            <div style={{
                'width': '800px',
                'margin': '50px auto'
            }}>
                <div className="yibu">
                    <h1>异步的图片上传</h1>
                    <input
                        type="file"
                        ref='pic'
                        hidden
                        onChange={()=>{
                            //得到图片
                            let thepic = this.refs.pic.files[0];
                            //上传前预览
                            let fr = new FileReader();
                            //读取这个图片
                            fr.readAsDataURL(thepic);
                            //读完了
                            fr.onload = (e) => {
                                console.log(e);
                                this.setState({
                                    base64: e.target.result
                                });
                            };
                        }}/>
                    <Icon
                        type="plus-circle"
                        style={{'fontSize':'30px', 'margin':'20px 20px 0 0'}}
                        onClick={()=>{
                            //创建一个事件
                            let evt = document.createEvent('MouseEvents');
                            //初始化这个事件，false一个是按ctrl和一个是按shif,决定是否是纯单击事件
                            evt.initMouseEvent('click', false, false);
                            //发送给别人
                            this.refs.pic.dispatchEvent(evt);
                        }}
                    />
                    <Button onClick={()=>{
                        //创建虚拟表单
                        let form = new FormData();
                        //获取图片
                        let thepic = this.refs.pic.files[0];
                        //在虚拟表单中追加图片
                        form.append('file', thepic);
                        //发送axios的post请求，上传图片
                        axios.post('/api/uppic', form, {
                            //设置请求头
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then((data)=>{
                            this.setState({
                                filename: data.data.filename
                            });
                        });
                    }}>点击上传图片</Button>
                    <div className="imgBox">
                        <div>
                            {this.state.base64 ? <p>异步上传图片上传前预览</p> : null}
                            {this.state.base64 ? <img width="200" src={this.state.base64}/> : null}
                        </div>
                        <div>
                            {this.state.filename ? <p>异步上传图片上传后预览</p> : null}
                            {this.state.filename ? <img width="200" src={`/api/uploads/${this.state.filename}`}/> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
