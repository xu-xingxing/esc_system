import React from 'react';
//暴露一个json
export default {
    'id':{
        'title':'编号'
    },
    'brand':{
        'title':'品牌'
    },
    'img':{
        'title':'图片',
        'render':(txt, {id})=>{
            return <div>
                <img key={id} src={`http://aiqianduan.com:7897/images/carimages_small/${id}/view/${txt}`}/>
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
        'title':'购买日期'
    },
    'engine':{
        'title':'发动机'
    },
    'gearbox':{
        'title':'变速箱'
    },
    'km':{
        'title':'公里'
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
