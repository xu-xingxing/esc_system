import React, {Component} from 'react';
import {Form, Input, Cascader, Button, message, Radio, DatePicker} from 'antd';
import {connect} from 'dva';
import axios from 'axios';

@Form.create({
    name: 'myform'
})
@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class Step1 extends Component {
    constructor () {
        super();
        this.state = {
            //剩余秒数
            miao: 60,
            //是否开始倒计时
            isDjs: false
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/loadAllBsSaga'});
    }
    render () {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8}
        };
        const options = Object.keys(this.props.allbs).map(zimu=>({
            'label':zimu,
            'value':zimu,
            'children':Object.keys(this.props.allbs[zimu]).map(brand=>({
                'label':brand,
                'value':brand,
                'children':this.props.allbs[zimu][brand].map(series=>({
                    'label':series,
                    'value':series
                }))
            }))
        }));
        const {getFieldDecorator, validateFields} = this.props.form;
        return (
            <Form {...formItemLayout}>
                <Form.Item label="卖车人中文姓名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写卖车人姓名'
                            },
                            {
                                pattern: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$'),
                                message: '必须符合中国人命名法'
                            }
                        ]
                    })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="车架号" {...formItemLayout}>
                    {getFieldDecorator('chejiahao', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写车架号'
                            },
                            {
                                pattern: /^\d{17}$/,
                                message: '必须是17位数字'
                            }
                        ]
                    })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="品牌和车系" {...formItemLayout}>
                    {getFieldDecorator('bs', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写品牌和车系'
                            }
                        ]
                    })(<Cascader
                        options={options}
                        onChange={(value)=>{
                            console.log(value);
                        }}
                    />)
                    }
                </Form.Item>
                <Form.Item label="颜色" {...formItemLayout}>
                    {getFieldDecorator('color', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写'
                            }
                        ]
                    })(<Radio.Group options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']} />)
                    }
                </Form.Item>
                <Form.Item label="排放" {...formItemLayout}>
                    {getFieldDecorator('exhuast', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写'
                            }
                        ]
                    })(<Radio.Group options={['国一', '国二', '国三', '国四', '国五']} />)
                    }
                </Form.Item>
                <Form.Item label="发动机" {...formItemLayout}>
                    {getFieldDecorator('engine', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写'
                            }
                        ]
                    })(<Radio.Group options={['1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.4L', '2.4T']} />)
                    }
                </Form.Item>
                <Form.Item label="购买日期" {...formItemLayout}>
                    {getFieldDecorator('buydate', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写'
                            }
                        ]
                    })(<DatePicker />)
                    }
                </Form.Item>
                <Form.Item label="手机号码" {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写手机号码'
                            },
                            {
                                pattern:  /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                                message: '必须是11位数字'
                            }
                        ]
                    })(<Input />)
                    }
                    <Button
                        disabled={this.state.isDjs}
                        onClick={()=>{
                            //让此button不可再次点击
                            this.setState({
                                isDjs: true
                            });
                            //得到手机号
                            let mobile = this.props.form.getFieldValue('mobile');
                            this.props.dispatch({'type':'salecar/sendMsg', 'phone': mobile});
                            //验证是否符合正则
                            if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)) {
                                message.error('请您收入正确的号码');
                                return;
                            }
                            //dispatch发送验证码
                            this.timer = setInterval(()=>{
                                this.setState({
                                    miao: this.state.miao - 1
                                }, ()=>{
                                    //在回调函数中判断，秒数是否小于等于0，如果是，重新设置秒数，同时更改disabled的状态
                                    if (this.state.miao <= 0) {
                                        this.setState({
                                            miao: 60,
                                            isDjs: false
                                        });
                                        clearInterval(this.timer);
                                    }
                                });
                            }, 1000);
                        }}
                    >
                        {
                            this.state.isDjs ?
                                `已经发送，请等待(${this.state.miao}秒)`
                                :
                                '点击发送验证码'
                        }
                    </Button>
                </Form.Item>
                <Form.Item label="验证码" {...formItemLayout}>
                    {getFieldDecorator('yanzhengma', {
                        rules: [
                            {
                                required: true,
                                message: '必须填写验证码'
                            }
                        ]
                    })(<Input />)
                    }
                </Form.Item>
                <Form.Item label="提交">
                    <Button onClick={()=>{
                        //validateFields用于获取Form表单中所有项的值
                        validateFields((errors, values) => {
                            //values返回的就是表单所有的值
                            //errors当它返回的是空说明，表单提交成功了
                            if (errors === null) {
                                //得到验证码
                                let yanzhengma = this.props.form.getFieldValue('yanzhengma');
                                //token是后端返回的令牌
                                let token = this.props.token;
                                //用户现在没错了，但是要验证短信
                                //发送ajax验证验证码和令牌
                                axios.get('http://192.168.2.250:8494/cmsg.php?yanzhengma=' + yanzhengma + '&token=' + token).then(data => {
                                    console.log(33333333333);
                                    if (data.data === 'nook') {
                                        //大汇总
                                        //将填入表单中的数据保存
                                        let barnd = values['bs'][1];
                                        let series = values['bs'][2];
                                        let color = values['color'];
                                        let exhaust = values['exhaust'];
                                        let buydate = values['buydate'].unix() * 1000;
                                        this.props.dispatch({'type': 'salecar/changeStep', 'step':1, 'step1data':{barnd, series, color, exhaust, buydate}});
                                    } else {
                                        message.error('请输入正确的手机验证码');
                                    }
                                });
                            }
                        });
                    }}>
                        下一步
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
