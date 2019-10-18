import React from 'react';
import {connect} from 'dva';
import { Table } from 'antd';

export default @connect(
    ({esc}) => ({
        results: esc.results,
        current: esc.current,
        total: esc.total,
        pageSize: 10
    })
)
class App extends React.Component {
    constructor(){
        super();
        this.state = {};
    }
    async componentWillMount() {
        this.props.dispatch({'type': 'esc/INITSAGA'});
    }
    render() {
        return (
            <div>
                <Table
                    rowKey='id'
                    columns={
                        [
                            { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                            { 'title': '图片', 'key': 'img', 'dataIndex':'img', render:(txt, {id})=>{
                                return <div>
                                    <img src={`/api/images/carimages_small/${id}/view/${txt}`}/>
                                </div>;
                            }},
                            { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                            { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                            { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                            { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                            { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                            { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                        ]
                    }
                    dataSource={this.props.results}
                    pagination={{
                        'current': this.props.current,
                        'pageSize': this.props.pageSize,
                        'total': this.props.total
                    }}
                />
            </div>
        );
    }
}
