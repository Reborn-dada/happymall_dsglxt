

class MUtil {
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type    :param.type     || 'get',
                url     :param.url      || '',
                dataType:param.dataType || 'json',
                data    :param.data     || null,
                //回调函数
                success :(res)=>{
                    //请求数据成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data,res.msg)
                    }//请登入
                    else if (10 === res.status){
                        this.doLogin()
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data)
                    }
                },
                error   :(err)=>{
                    typeof reject === 'function' && reject(err.statusText)
                }
            });
        });
        
    }

    doLogin(){
        window.location.href='/login?redirect='+ encodeURIComponent(window.location.pathname)
    }
}

export default MUtil;