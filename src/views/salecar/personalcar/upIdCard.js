import React, {Component} from 'react';
import {Icon} from 'antd';
import './upIdcard.less';

export default class upIdCard extends Component {
    constructor () {
        super();
        this.state = {
            base64: ''
        };
    }
    render () {
        return (
            <div
                className="upidcard_box"
                onClick={()=>{
                    //创建一个事件
                    let evt = document.createEvent('MouseEvents');
                    //初始化这个事件
                    evt.initMouseEvent('click', false, false);
                    //发送给别人
                    this.refs.pic.dispatchEvent(evt);
                }
                }
                style={{
                    'backgroundImage': `url(${this.state.base64})`
                }}
            >
                <input
                    type="file"
                    ref="pic"
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
                            this.setState({
                                base64: e.target.result
                            });
                        };
                        //向爸爸回调这个图片
                        if (this.props.getZm !== undefined) {
                            this.props.getZm(thepic);
                        } else if (this.props.getFm !== undefined) {
                            this.props.getFm(thepic);
                        }
                    }}
                />
                <Icon type="plus" className="plus" style={{'fontSize':'40px'}}/>
            </div>
        );
    }
}
