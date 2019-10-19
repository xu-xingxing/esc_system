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
            'showChangeColumnModal':false
        };
    }
    //组件即将上树
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/getColumnsFromLocalStorage'});
        this.props.dispatch({'type': 'bigtable/init'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请调整表格列的显示'
                    visible={this.state.showChangeColumnModal}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            showChangeColumnModal:false
                        });
                    }}
                >
                    <ModalInner
                        ref="modalinner"
                        okHandler={(columnArr)=>{
                            //点击确定按钮之后做的事情
                            this.props.dispatch({'type':'bigtable/setColunmsToLocalStorage', columnArr});
                            this.setState({
                                showChangeColumnModal:false
                            });
                        }}
                        cancelHandler={()=>{
                            //点击取消按钮之后做的事情
                            this.setState({
                                showChangeColumnModal:false
                            });
                        }}
                    />
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
                    rowKey="id"
                    columns={
                        this.props.columnArr.map(item=>({
                            'key':item,
                            'dataIndex':item,
                            ...columnsMap[item]
                        }))
                    }
                    dataSource={this.props.results}
                />
            </div>
        );
    }
}
