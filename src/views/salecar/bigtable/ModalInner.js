import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';

import OneSmallElement from './OneSmallElement.js';
import columnsMap from './columnsMap.js';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super();
        //这里筹备beixuanArr的初始值
        let beixuanArr = [];
        //遍历数据字典，看看遍历到的这个项的键名，在不在装饰器的props.columnArr数组中
        //如果不在，推入benxuanArr数组

        beixuanArr = _.difference(Object.keys(columnsMap), props.columnArr);
        // console.log(beixuanArr);

        this.state = {
            'columnArr': props.columnArr.slice(),
            'beixuanArr': beixuanArr
        };
    }
    delOneItem (english) {
        console.log('儿子，你要del');
        this.setState({
            'columnArr':this.state.columnArr.filter(item => item !== english),
            'beixuanArr':[...this.state.beixuanArr, english]
        });
    }
    render () {
        return (
            <div>
                <p>当前为您展示的列（可以拖拽排序）：</p>
                <div className="onesmallelementbox">
                    {
                        this.state.columnArr.map((item, i)=>{
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={
                                        (columnArr)=>{
                                            this.setState({
                                                columnArr
                                            });
                                        }
                                    }
                                    items={this.state.columnArr}
                                    sortId={i}
                                    chinese={columnsMap[item].title}
                                    english={item}
                                    delOneItem={this.delOneItem.bind(this)}
                                >
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <div style={{'clear':'both'}}></div>
                <p>备选列</p>
                <div className="beixuanbox">
                    {
                        this.state.beixuanArr.map((item, i) => {
                            return <span
                                key={i}
                            >
                                {columnsMap[item].title}
                                <b
                                    onClick={()=>{
                                        this.setState({
                                            'columnArr':[...this.state.columnArr, item],
                                            'beixuanArr': this.state.beixuanArr.filter(_item => item !== _item)
                                        });
                                    }}
                                >
                                    <Icon type="plus"/>
                                </b>
                            </span>;
                        })
                    }
                </div>
                <div style={{'clear':'both'}}></div>
                <div>
                    <Button
                        onClick={ ()=>{
                            this.props.cancelHandler(this.state.columnArr);
                        }}
                    >取消</Button>
                    <Button onClick={ ()=>{
                        this.props.okHandler(this.state.columnArr);
                    }}>确定</Button>
                </div>
            </div>
        );
    }
}
