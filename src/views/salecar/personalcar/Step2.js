import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, message, notification} from 'antd';
import {connect} from 'dva';
import UpIdCard from './upIdCard';
import RealUpIdCard from './RealUpIdCard.js';

//这里可以写变量
let zmfile = null;
let fmfile = null;

@Form.create({
    name: 'myform'
})
@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class Step2 extends Component {
    constructor () {
        super();
    }
    // 给子组件传函数
    //身份证反面的函数
    getZm (file) {
        zmfile = file;
    }
    //身份证正面的函数
    getFm (file) {
        fmfile = file;
    }
    render () {
        const {getFieldDecorator, validateFields} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        return (
            <Form {...formItemLayout}>
                <Form.Item label="卖车人身份证号码">
                    {
                        getFieldDecorator(
                            'idcard',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写卖车人省份证号码'
                                    },
                                    {
                                        pattern: new RegExp('^[0-9]{17}[0-9X]$'),
                                        message: '不符合的身份证号码'
                                    }
                                ]
                            })(<Input />)
                    }
                </Form.Item>
                <UpIdCard getZm={this.getZm.bind(this)}/>
                <UpIdCard getFm={this.getFm.bind(this)}/>
                <Row>
                    <Col span={4} style={{'textAlign': 'right'}}></Col>
                    <Col span={6}>
                        <Button
                            onClick={()=>{
                                //检查表单正确性---检测第一个表单（卖车人身份证号码的）
                                validateFields((errors, value)=>{
                                    if (errors === null) {
                                        /*检查身份证照片是否添加完毕，初始值为null,如果添加照片之后，子组件就会触发父级的传过来的方法，
                                         子组件将thepic的信息作为实参，传给父级，父级此时更改zmfile和fmfile的值，此时就不是空的了
                                        */
                                        if (zmfile === null || fmfile === null) {
                                            //如果zmfile和fmfile即正面照片和反面照片，如果为null,说明用户并未上传证件照片
                                            message.error('请上传身份证照片');
                                            return;
                                            //return之后将不再执行下面的语句
                                        }
                                        //如果添加完成，则使用notification组件，提示用户图片上传成功
                                        notification.info({
                                            key: 'aa',
                                            message: '正在上传您的身份证，并核实身份证照片真假，请不要关闭窗口',
                                            description: <RealUpIdCard
                                                zmfile={zmfile}
                                                fmfile={fmfile}
                                                //给真正的身份证上传组件，由父级绑定了一个事件
                                                alldone={()=>{
                                                    //发送dispatch请求，更改step，跳转至第三个页面
                                                    //同时关闭这个notification这个组件
                                                    this.props.dispatch({'type': 'salecar/changeStep', 'step': 2});
                                                    notification.close('aa');
                                                }}
                                            />
                                        });
                                    }
                                });
                            }}
                        >
                            下一步
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
