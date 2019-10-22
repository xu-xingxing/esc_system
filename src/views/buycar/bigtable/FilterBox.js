import React, {Component} from 'react';
import OneSingleMultiChoise from './OneSingleMultiChoise.js';
import BuyDataFilter from './BuyDataFilter.js';
import BSFilter from './BSFilter.js';
import Tags from './Tags.js';
import PriceKm from './PriceKm.js';

export default class FilterBox extends Component {
    render () {
        //栅格系统占多少列
        const spans = {
            labelSpan:3,
            choseSpan:20,
            btnSpan:1
        };
        return (
            <div>
                <Tags />
                <BSFilter
                    {...spans}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'color'}
                    c={'颜色'}
                    options = {['红', '黄', '紫', '白', '黑', '蓝', '灰', '银灰', '橙', '绿', '香槟', '咖啡']}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'exhaust'}
                    c={'尾气'}
                    options = {['国一', '国二', '国三', '国四', '国五']}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'fuel'}
                    c={'燃料'}
                    options = {['汽油', '柴油', '油电混合', '纯电动']}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'engine'}
                    c={'发动机'}
                    options = {['1.6L', '1.6T', '1.8L', '2.0L']}
                />
                <BuyDataFilter
                    {...spans}
                    c={'购买日期'}
                />
                <PriceKm
                    {...spans}
                />
            </div>
        );
    }
}
