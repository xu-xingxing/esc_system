import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import axios from 'axios';

export default class TestUploadPic extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div>
                <div className="yibu">
                    <h1>异步的图片上传</h1>
                    <input type="file" ref='pic'/>
                    <Icon type="plus-circle" style={{'fontSize':'30px', 'margin':'20px 20px 0 0'}}/>
                    <Button onClick={()=>{
                        //创建虚拟表单
                        let form = new FormData();
                        //获取图片
                        let thepic = this.refs.pic.files[0];
                        //在虚拟表单中追加图片
                        form.append(thepic);
                        //发送axios的post请求，上传图片
                        axios.post('/api/uppic', form, {
                            //设置请求头
                            headers: {'Content-Type': 'multipart/form-data'}
                        }).then((data)=>{
                            console.log(data.data);
                        });
                    }}>点击上传图片</Button>
                </div>
            </div>
        );
    }
}
