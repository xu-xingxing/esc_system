import React, {Component} from 'react';
import {Tag} from 'antd';
import {connect} from 'dva';

//获取数据中心的数据
@connect(({bigtable})=>({...bigtable}))
export default class Tags extends Component {
    constructor () {
        super();
    }
    //封装一个小函数
    choiceOrNull (json) {
        if (this.props[json.k].length === 0) {
            return null;
        } else {
            let v = '';
            switch (json.k) {
            case 'color':
            case 'exhaust':
            case 'fuel':
            case 'engine':
                v = this.props[json.k].join(json.b);
                break;
            }
            return <Tag closable
                key={json.k}
                onClose={()=>{
                    console.log(123);
                    this.props.dispatch({'type':'bigtable/changeFilterSaga', 'k':json.k, 'v':[]});
                }}
            >{json.c}: {v}</Tag>;
        }
    }
    render () {
        console.log(this.props);
        return (
            <div className="tagsbox">
                {
                    [
                        {'k':'color', 'c':'颜色', 'b':'或'},
                        {'k':'exhaust', 'c':'尾气', 'b':'或'},
                        {'k':'fuel', 'c':'燃料', 'b':'或'},
                        {'k':'engine', 'c':'发动机', 'b':'或'}
                    ].map((item, i)=>this.choiceOrNull(item))
                }
            </div>
        );
    }
}
