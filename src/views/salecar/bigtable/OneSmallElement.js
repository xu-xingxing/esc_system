import React, {Component} from 'react';
import {sortable} from 'react-sortable';

//使用拖拽装饰器，装饰一下
@sortable
export default class OneSmallElement extends Component {
    render () {
        return (
            <div className="onesmallelement" {...this.props}>
                小元素{this.props.children}
            </div>
        );
    }
}
