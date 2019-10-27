import React, {Component} from 'react';
import {connect} from 'dva';
import LR from '../../../layouts/LR.js';
import {Tabs, Spin, Input, Row, Col, Badge} from 'antd';
import './szss.less';

const {TabPane} = Tabs;
@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Szss extends Component {
    constructor () {
        super();
        this.state = {
            keyword: '',
            products: {},
            count: 29
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'szss/loadResult'});
        this.setState({
            products: this.props.products
        });
    }
    //用于判断筛选条件的方法，传了一个实参typeName
    sosuoCount (typeName) {
        //很重要的是，如果没有筛选条件的时候，返回0，此时数字提示不显示
        if (this.state.keyword === '') return 0;
        return this.props.products[typeName].reduce((a, b)=>{
            return b.name.includes(this.state.keyword) ? a + 1 : a;
        }, 0);
    }
    render () {
        if (Object.keys(this.props.products).length === 0) {
            return <div><Spin /></div>;
        }
        return (
            <LR>
                <Row>
                    <Col span={1}>筛选：</Col>
                    <Col span={21}>
                        <Input
                            value={this.state.keyword}
                            onChange={(e)=>{
                                this.setState({
                                    keyword: e.target.value
                                });
                            }}
                        />
                    </Col>
                </Row>
                <Tabs>
                    {
                        Object.keys(this.props.products).map((typeName, i) => {
                            return <TabPane
                                key={i}
                                tab={<div>
                                    {typeName}
                                    <Badge count={this.sosuoCount(typeName)} offset={[15, 3]}>
                                        <a href="#" className="head-example" />
                                    </Badge>
                                </div>}>
                                {
                                    this.props.products[typeName].filter(item=>item.name.includes(this.state.keyword)).map((detail, id)=>{
                                        return <div key={id} className="ge">
                                            <img src={`http://192.168.2.250:8922/productpics/${detail.pic}`}/>
                                            <p>{detail.name}</p>
                                        </div>;
                                    })
                                }
                            </TabPane>;
                        })
                    }
                </Tabs>
            </LR>
        );
    }
}
