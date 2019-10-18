import React, { Component } from 'react';
import { Table } from 'antd';

export default class BigTable extends Component {
    render () {
        //试着从本地存储中读取column字段
        let columnsFromLocalStore = localStorage.getItem('columns');
        console.log(columnsFromLocalStore);
        //如果这个字段读取出来时null,表示用户第一次来本网站或者清空缓存
        if(columnsFromLocalStore === null){
            //第一次进入，给用户本地赋予一个值
            localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'series', 'color']));
        }
        //再次从本地存储列表存储信息，并转换
        const columns = JSON.parse(localStorage.getItem('columns'));
        return (
            <div>
                <Table
                    columns={[{'title':'商标', 'key':'brand', 'dataIndex':'brand'}]}
                />
            </div>
        );
    }
}
