import React from 'react';
import moment from 'moment';
//暴露一个json
export default {
    'id':{
        'title':'编号'
    },
    'brand':{
        'title':'品牌'
    },
    'image':{
        'title':'图片',
        'render':(txt, {id})=>{
            return <div>
                <img key={id} src={`/api/images/carimages_small/${id}/view/${txt}`}/>
            </div>;
        }
    },
    'fuel':{
        'title':'燃料'
    },
    'exhaust':{
        'title':'尾气'
    },
    'buydate':{
        'title':'购买日期',
        'render':(txt)=>{
            return <div>
                {moment(txt).format('YYYY年MM月DD日')}
            </div>;
        }
    },
    'engine':{
        'title':'发动机'
    },
    'gearbox':{
        'title':'变速箱'
    },
    'km':{
        'title':'公里',
        'render':(txt)=>{
            return <div>
                {txt.toString().replace(/\B(?=(...)+$)/g, ',')}
            </div>;
        }
    },
    'color':{
        'title':'颜色'
    },
    'series':{
        'title':'车系'
    },
    'price':{
        'title':'价格'
    }
};
