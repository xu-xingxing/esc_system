import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col} from 'antd';
import classnames from 'classnames';


@connect(
    ({bigtable})=>({...bigtable})
)
export default class OneSingleMultiChoise extends Component {
    constructor () {
        super();
        this.state = {
            isDuoXuan:false,
            arr:[]
        };
    }
    //当组件收到新的props的时候（全局的数据改变的时候）
    componentWillReceiveProps (nextProps) {
        /*
            ×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××
            为什么要写if语句，因为这个生命周期是检测所有全局变化的，太猛了（一个变化，其他也被改变）
            我们需要的是当前控制的这个筛选器的变化，数组与数组的直接比较，我们就要判断是不是内存中的那同一个值
            ×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××
         */
        if (nextProps[this.props.k] !== this.props[this.props.k]) {
            this.setState({
                isDuoXuan: false,
                arr: []
            });
        }
    }
    render () {
        return (
            <div className="myrow">
                <Row>
                    <Col span={this.props.labelSpan}>{this.props.c}：</Col>
                    <Col span={this.props.choseSpan}>
                        {
                            this.props.options.map((item, i)=>{
                                return <span
                                    className={classnames(['c_span', {'cur':this.state.arr.includes(item)}])}
                                    key={i}
                                    onClick={()=>{
                                        //双色球逻辑
                                        if (this.state.isDuoXuan) {
                                            if (this.state.arr.includes(item)) {
                                                this.setState({
                                                    arr:this.state.arr.filter(_item=>_item !== item)
                                                });
                                            } else {
                                                this.setState({
                                                    arr:[...this.state.arr, item]
                                                });
                                            }
                                        } else {
                                            //如果是单选，直接发送，交付给saga处理
                                            this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':this.props.k, 'v':[item]});
                                        }
                                    }}
                                >
                                    {item}
                                </span>;
                            })
                        }
                    </Col>
                    <Col span={this.props.btnSpan}>
                        {
                            this.state.isDuoXuan ? <Button size='small'
                                type={this.state.isDuoXuan ? 'primary' : ''}
                                onClick={()=>{
                                    this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':this.props.k, 'v':this.state.arr});
                                }}
                            >确定</Button> : <Button size='small' onClick={()=>{
                                this.setState({
                                    isDuoXuan:true
                                });
                            }}>多选</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
