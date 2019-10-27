import React from 'react';
import moment from 'moment';
import {Link} from 'dva/router';
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
                <Link to={'/buycar/bigtable/' + id}>
                    <img key={id} src={`http://www.aiqianduan.com:7897/images/carimages_small/${id}/view/${txt}`}/>
                </Link>
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
