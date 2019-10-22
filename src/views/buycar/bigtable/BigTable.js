import React, {Component} from 'react';
import {Table, Button, Modal, Checkbox, Radio, Tag} from 'antd';

const ButtonGroup = Button.Group;
import {connect} from 'dva';
import './bigtable.less';
import ModalInner from './ModalInner.js';
import FilterBox from './FilterBox.js';
import Tags from './Tags.js';


//引入数据字典
import columnsMap from './columnsMap';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor (props) {
        super();
        this.state = {
            isShowModal: false
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/getColumnsFromLocalStorage'});
        this.props.dispatch({'type': 'bigtable/initTableData'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请您选择需要看的列'
                    visible={this.state.isShowModal}
                    onCancel={() => {
                        this.setState({
                            isShowModal: false
                        });
                    }}
                    footer={null}
                >
                    <ModalInner
                        okHandle={(columns) => {
                            this.props.dispatch({'type': 'bigtable/setColumnsToLocalStorage', columns});
                            this.setState({
                                isShowModal: false
                            });
                        }}
                        cancelHandle={() => {
                            this.setState({
                                isShowModal: false
                            });
                        }}
                    />
                </Modal>
                <p className="btn_box">
                    <Button
                        type="primary"
                        className="btn"
                        shape="circle"
                        icon="setting"
                        onClick={() => {
                            this.setState({
                                isShowModal: true
                            });
                        }}
                    />
                </p>
                <FilterBox />
                <Table
                    rowKey='id'
                    columns={
                        this.props.columns.map((item) => {
                            return {
                                'key': item,
                                'dataIndex': item,
                                ...columnsMap[item]
                            };
                        })
                    }
                    dataSource={this.props.results}
                    pagination={{
                        'current': this.props.current,
                        'total': this.props.total,
                        'pageSize': 10,
                        'onChange': (current) => {
                            this.props.dispatch({'type': 'bigtable/changeCurrentHandle', current});
                        }
                    }}
                />
            </div>
        );
    }
}
