import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';

//使用拖拽装饰器，装饰一下
@sortable
export default class OneSmallElement extends Component {
    render () {
        return (
            <div className="onesmallelement" {...this.props}>
                {this.props.chinese}
                <b
                    onClick={()=>{
                        this.props.delOneItem(this.props.english);
                    }
                    }
                ><Icon type="close"/></b>
            </div>
        );
    }
}
