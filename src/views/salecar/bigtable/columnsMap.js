import React from 'react';
//暴露一个json，作为table的columns映射的字典
export default {
    'id':{
        'title':'编号'
    },
    'brand':{
        'title':'商标'
    },
    'series':{
        'title': '车系'
    },
    'color':{
        'title': '颜色'
    },
    'engine':{
        'title': '发动机'
    },
    'exhaust':{
        'title': '尾气'
    },
    'fuel':{
        'title': '燃料'
    },
    'image':{
        'title': '图片',
        'render': (txt, {id})=>{
            return <div>
                <img key={txt} src={`/api/images/carimages_small/${id}/view/${txt}`}/>
            </div>;
        }
    },
    'price':{
        'title': '价格'
    },
    'buydate':{
        'title':'购买日期'
    },
    'km':{
        'title':'公里数'
    }
};