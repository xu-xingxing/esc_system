import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Tabs} from 'antd';
import classnames from 'classnames';

const {TabPane} = Tabs;
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
        if (Object.keys(this.props.allbs).length === 0) return null;
        return (
            <div className="bsfilter_box">
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>品牌</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        <Tabs defaultActiveKey="1">
                            {
                                Object.keys(this.props.allbs).map(zimu=>{
                                    return <TabPane tab={zimu} key={zimu}>
                                        {
                                            Object.keys(this.props.allbs[zimu]).map(brand=>{
                                                return <a
                                                    key={brand}
                                                    className={classnames(['tab_a', {'cur':this.props.brand === brand}])}
                                                    onClick={()=>{
                                                        this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':'brand', 'v': brand});
                                                        this.setState({
                                                            'zimu': zimu
                                                        });
                                                    }}
                                                >{brand}</a>;
                                            })
                                        }
                                    </TabPane>;
                                })
                            }
                        </Tabs>
                    </Col>
                    <Col span={this.props.btnSpan}>
                        1234
                    </Col>
                </Row>
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>车系</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        {
                            (()=>{
                                if (this.state.zimu !== '' && this.props.brand !== ''){
                                    return this.props.allbs[this.state.zimu][this.props.brand].map(series=><a
                                        key={series}
                                        className={classnames(['tab_a', {'cur':this.props.series === series}])}
                                        onClick={()=>{
                                            this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':'series', 'v': series});
                                        }}
                                    >{series}</a>);
                                }
                            })()
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
