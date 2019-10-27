import React, {Component} from 'react';
import LR from '../../../layouts/LR';
import {connect} from 'dva';
import {Descriptions} from 'antd';
import './detail.less';
import RcViewer from '@hanyk/rc-viewer';

@connect(({detail})=>({...detail}))
export default class Detail extends Component {
    componentWillMount () {
        this.props.dispatch({'type':'detail/initDetailSaga', 'id':this.props.match.params.id});
    }
    render () {
        if (Object.keys(this.props.result).length === 0) return <div>正在加载请稍后</div>;
        const result = this.props.result;
        return (
            <LR>
                <div className="detailbox">
                    <Descriptions title={<h1>{result.brand}{result.series}{result.id}号车的详细信息：</h1>} bordered column={4}>
                        <Descriptions.Item label="编号">{result.id}</Descriptions.Item>
                        <Descriptions.Item label="品牌">{result.brand}</Descriptions.Item>
                        <Descriptions.Item label="车系">{result.series}</Descriptions.Item>
                        <Descriptions.Item label="颜色">{result.color}</Descriptions.Item>
                        <Descriptions.Item label="购买日期">{result.buydate}</Descriptions.Item>
                        <Descriptions.Item label="燃料">{result.fuel}</Descriptions.Item>
                        <Descriptions.Item label="发动机">{result.engine}</Descriptions.Item>
                        <Descriptions.Item label="变速箱">{result.gearbox}</Descriptions.Item>
                        <Descriptions.Item label="公里数">{String(result.km).replace(/\B(?=(...)+$)/g, ',')}</Descriptions.Item>
                        <Descriptions.Item label="购买日期">{result.buydate}</Descriptions.Item>
                        <Descriptions.Item label="是否有牌">{result.license ? '是' : '否'}</Descriptions.Item>
                        <Descriptions.Item label="尾气">{result.exhaust}</Descriptions.Item>
                    </Descriptions>
                    <h3>本车外观图</h3>
                    <RcViewer options={{
                        url (image) {
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.view.map((item, i)=>{
                                return <img key={i} src={`/api/images/carimages_small/${this.props.id}/view/${item}`}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车内饰图</h3>
                    <RcViewer options={{
                        url (image) {
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.inner.map((item, i)=>{
                                return <img key={i} src={`/api/images/carimages_small/${this.props.id}/inner/${item}`}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车发动机图</h3>
                    <RcViewer options={{
                        url (image) {
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.engine.map((item, i)=>{
                                return <img key={i} src={`/api/images/carimages_small/${this.props.id}/engine/${item}`}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车更多图</h3>
                    <RcViewer options={{
                        url (image) {
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.more.map((item, i)=>{
                                return <img key={i} src={`/api/images/carimages_small/${this.props.id}/more/${item}`}/>;
                            })
                        }
                    </RcViewer>
                </div>
            </LR>
        );
    }
}
