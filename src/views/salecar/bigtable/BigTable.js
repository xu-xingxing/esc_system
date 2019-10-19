import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

//引入columns的数据字典
import columnsMap from './columnsMap';
import './bigtable.less';
import ModalInner from './ModalInner.js';


@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor () {
        super();
        this.state = {
            'showChangeColumnModal':true
        };
    }
    //组件即将上树
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/getColumnsFromLocalStorage'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请调整表格列的显示'
                    visible={this.state.showChangeColumnModal}
                    onCancel={()=>{
                        this.setState({
                            showChangeColumnModal:false
                        });
                    }}
                >
                    <ModalInner/>
                </Modal>
                <div className="btn_box">
                    <Button
                        type="primary"
                        className="btn"
                        shape="circle"
                        icon="setting"
                        onClick={()=>{
                            this.setState({
                                showChangeColumnModal:true
                            });
                        }}
                    />
                </div>
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
