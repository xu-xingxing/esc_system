import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, DatePicker} from 'antd';

const {RangePicker} = DatePicker;

//获取数据中心的数据
@connect(({bigtable})=>({...bigtable}))
export default class BuyDataFilter extends Component {
    constructor () {
        super();
        this.state = {
            buydate: []
        };
    }
    render () {
        return (
            <div className="myrow">
                <Row style={{'display':this.props.buydate.length === 0 ? 'block' : 'none'}}>
                    <Col span={this.props.labelSpan}>{this.props.c}</Col>
                    <Col span={this.props.choseSpan}>
                        <RangePicker
                            onChange={(arr)=>{
                                //arr是monent对象的数组
                                const v = arr.map(item => item.unix() * 1000);
                                this.setState({
                                    buydate: v
                                });
                            }}
                        />
                    </Col>
                    <Col span={this.props.btnSpan}>
                        <Button size='small'
                            onClick={()=>{
                                console.log(123);
                                this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':'buydate', 'v':this.state.buydate});
                            }}
                        >确定</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
