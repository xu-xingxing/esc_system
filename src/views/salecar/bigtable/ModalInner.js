import React, {Component} from 'react';

import OneSmallElement from './OneSmallElement.js';

export default class ModalInner extends Component {
    constructor () {
        super();
        this.state = {
            arr: ['A', 'B', 'C', 'D']
        };
    }
    render () {
        return (
            <div>
                <p>当前为您展示的列（可以拖拽排序）：</p>
                <div className="onesmallelementbox">
                    {
                        this.state.arr.map((item, i)=>{
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={
                                        (arr)=>{
                                            this.setState({
                                                arr
                                            });
                                        }
                                    }
                                    items={this.state.arr}
                                    sortId={i}
                                >
                                    {item}
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <p>备选列</p>
                <div className="beixuanbox">
                    <span>发动机</span>
                    <span>购买日期</span>
                    <span>公里数</span>
                    <span>价格</span>
                    <span>燃料</span>
                    <span>排放</span>
                </div>
            </div>
        );
    }
}
