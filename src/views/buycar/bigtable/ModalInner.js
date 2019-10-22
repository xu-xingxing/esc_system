import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';

import columnsMap from './columnsMap';
import OneSmallElement from './OneSmallElement.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super();
        this.state = {
            'columns':props.columns.slice(),
            'beixuanArr':[]
        };
    }
    //删除已有列中的一项， 给备选列中增加一项
    delItemFromColumns (english) {
        this.setState({
            columns:this.state.columns.filter(item=>{
                return item !== english;
            }),
            beixuanArr:[...this.state.beixuanArr, english]
        });
    }
    render () {
        //根据数据字典，使用lodash中的difference方法，算出备选的数组
        this.state.beixuanArr = _.difference(Object.keys(columnsMap), this.state.columns);
        return (
            <div>
                <p>以下是页面已经有的列</p>
                <div className="onesmallelementbox">
                    {
                        this.state.columns.map((item, i)=>{
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(columns)=>{
                                        this.setState({
                                            columns
                                        });
                                    }}
                                    items={this.state.columns}
                                    english={item}
                                    chinese={columnsMap[item].title}
                                    sortId={i}
                                    delItemFromColumns={this.delItemFromColumns.bind(this)}
                                ></OneSmallElement>
                            );
                        })
                    }
                    <div style={{'clear':'both'}}></div>
                </div>
                <p>以下是备选的列</p>
                <div className="beixuanbox">
                    {
                        this.state.beixuanArr.map((item, i)=>{
                            return (
                                <span
                                    key={i}
                                >
                                    {columnsMap[item].title}
                                    <b
                                        onClick={()=>{
                                            this.setState({
                                                beixuanArr:this.state.beixuanArr.filter(_item=>{
                                                    return item !== _item;
                                                }),
                                                columns:[...this.state.columns, item]
                                            });
                                        }}
                                    >
                                        <Icon type='plus'/>
                                    </b>
                                </span>
                            );
                        })
                    }
                    <div style={{'clear':'both'}}></div>
                </div>
                <div style={{'textAlign':'right'}}>
                    <Button
                        style={{'marginRight':'10px'}}
                        onClick={()=>{
                            this.props.cancelHandle();
                        }}
                    >取消</Button>
                    <Button
                        type='primary'
                        onClick={()=>{
                            this.props.okHandle(this.state.columns);
                        }}
                    >确认</Button>
                </div>
            </div>
        );
    }
}
