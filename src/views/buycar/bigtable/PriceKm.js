import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Slider} from 'antd';

//获取数据中心的数据
@connect(({bigtable})=>({...bigtable}))
export default class BSFilter extends Component {
    constructor () {
        super();
        this.state = {
            zimu: ''
        };
    }
    componentWillMount () {
        this.props.dispatch({'type':'bigtable/loadAllBsSaga'});
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.brand === '') {
            this.setState({
                zimu:''
            });
        }
    }
    render () {
        return (
            <div className="bsfilter_box">
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>价格:</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        <Slider
                            range
                            min={0}
                            max={120}
                            value={this.props.price}
                            onChange={(arr)=>{
                                //发dispatch，交付SAGA，飞轮效应，越写越简单
                                //更改数据中心的数据，并未重新拉取数据
                                this.props.dispatch({'type':'bigtable/changeFilter', 'k':'price', 'v':arr});
                            }}
                            onAfterChange={(arr)=>{
                                //当手指停止拖动的时候，才去重新拉取数据
                                this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':'price', 'v':arr});
                            }}
                            marks={{
                                0: '0万',
                                10: '10万',
                                30: '30万',
                                50: '50万',
                                70: '70万',
                                100: '100万',
                                120: '120万'
                            }}
                        />
                    </Col>
                </Row>
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>公里数:</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        <Slider
                            range
                            min={0}
                            max={200}
                            value={this.props.km.map(s=>s / 10000)}
                            onChange={(arr)=>{
                                //发dispatch，交付SAGA，飞轮效应，越写越简单
                                //更改数据中心的数据，并未重新拉取数据
                                this.props.dispatch({'type':'bigtable/changeFilter', 'k':'km', 'v':arr.map(s => s * 10000)});
                            }}
                            onAfterChange={(arr)=>{
                                //当手指停止拖动的时候，才去重新拉取数据
                                this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':'km', 'v':arr.map(s => s * 10000)});
                            }}
                            marks={{
                                0: '0公里',
                                30: '30公里',
                                50: '50公里',
                                70: '70公里',
                                100: '100公里',
                                120: '120公里',
                                200: '200公里'
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
