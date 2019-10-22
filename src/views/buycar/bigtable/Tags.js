import React, {Component} from 'react';
import {Tag} from 'antd';
import {connect} from 'dva';
import moment from 'moment';

//获取数据中心的数据
@connect(({bigtable})=>({...bigtable}))
export default class Tags extends Component {
    constructor () {
        super();
    }
    //封装一个小函数
    choiceOrNull (json) {
        if (this.props[json.k].length === 0 || json.k === 'price' && this.props[json.k].toString() === '0,120') {
            return null;
        } else {
            let v = '';
            switch (json.k) {
            case 'color':
            case 'exhaust':
            case 'fuel':
            case 'engine':
                v = this.props[json.k].join('或');
                break;
            case 'buydate':
                v = this.props[json.k].map(item=>{
                    return moment(item).format('YYYY年MM月DD日');
                }).join('到');
                break;
            case 'brand':
            case 'series':
                v = this.props[json.k];
                break;
            case 'price':
                v = this.props[json.k].map(n => n + '万元').join('到');
                break;
            }
            return <Tag closable
                key={json.k}
                onClose={()=>{
                    if (json.k === 'brand' || json.k === 'series') {
                        this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':json.k, 'v':''});
                    } else if (json.k === 'price') {
                        this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':json.k, 'v':[0, 120]});
                    } else {
                        this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':json.k, 'v':[]});
                    }
                }}
            >{json.c}: {v}</Tag>;
        }
    }
    render () {
        return (
            <div className="tagsbox">
                {
                    [
                        {'k':'color', 'c':'颜色'},
                        {'k':'exhaust', 'c':'尾气'},
                        {'k':'fuel', 'c':'燃料'},
                        {'k':'engine', 'c':'发动机'},
                        {'k':'buydate', 'c':'购买日期'},
                        {'k':'brand', 'c':'品牌'},
                        {'k':'series', 'c':'车系'},
                        {'k':'price', 'c':'价格'}
                    ].map((item, i)=>this.choiceOrNull(item))
                }
            </div>
        );
    }
}
