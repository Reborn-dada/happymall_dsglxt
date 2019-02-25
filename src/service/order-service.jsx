
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Order{ 
    //获取商品列表
    getOrderList(listParam){
        let url = '',
            data= {}
        if(listParam.listType==='list'){
            url='/manage/order/list.do';
            data.pageNum=listParam.pageNum;
        }else{
            url='/manage/order/search.do';
            data.pageNum=listParam.pageNum;
            data[listParam.searchType]=listParam.keyword;
        }
        return _mm.request({
            type:'post',
            url:url,
            data:data
        })
    }
}

export default Order;