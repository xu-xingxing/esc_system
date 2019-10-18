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
    render () {
        //试着从本地存储中读取column字段
        const columnsFromLocalStore = JSON.parse(localStorage.getItem('columns'));
        //如果这个字段读取出来时null,表示用户第一次来本网站或者清空缓存
        if (columnsFromLocalStore === null) {
            //第一次进入，给用户本地赋予一个值
            localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'series', 'color']));
        }
        //再次从本地存储列表存储信息，并转换
        const columnArr = JSON.parse(localStorage.getItem('columns'));
        //将数据字典转为数组
        // console.log(columnsMap);
        return (
            <div>
                <Table
                    columns={
                        columnArr.map(item=>({
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
