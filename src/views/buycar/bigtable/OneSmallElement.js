import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';

@sortable
export default class OneSmallElement extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className="onesmallelement" {...this.props}>
                {this.props.chinese}
                <b
                    onClick={()=>{
                        this.props.delItemFromColumns(this.props.english);
                    }}
                >
                    <Icon type="close"/>
                </b>
            </div>
        );
    }
}
