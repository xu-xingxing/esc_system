import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';

//引入columns的数据字典
import columnsMap from './columnsMap';


@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BigTable extends Component {
    //组件即将上树
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/getColumnsFromLocalStorage'});
    }
    render () {
        return (
            <div>
                <Table
                    columns={
                        this.props.columnArr.map(item=>({
                            'key':item,
                            'dataIndex':item,
                            ...columnsMap[item]
                        }))
                    }
                />
            </div>
        );
    }
}
