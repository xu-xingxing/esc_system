import React, {Component} from 'react';
import {Result, Button} from 'antd';

export default class Step4 extends Component {
    render () {
        return (
            <div>
                <Result
                    status="success"
                    title="成功添加车辆信息"
                    subTitle="哈哈哈哈"
                    extra={[
                        <Button type="primary" key="console">
                            返回首页
                        </Button>,
                        <Button key="buy">
                            再买一辆
                        </Button>
                    ]}
                />
            </div>
        );
    }
}
