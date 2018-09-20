import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import conf_ from '../Conf';
import qs from 'qs';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);
Vue.use(Vuex)
 

 
const getDataAsync=function(data,func){
    //alert(typeof data)
    if (data && typeof data!='object'){
        console.log("参数应该是对象类型")
        return null;
    }
    if(conf_.env_cur=='prod'||conf_.env_cur=='local'){
        return data = axios({
            method:'post',
            url:conf_.requestUrl,
            data:qs.stringify(data)
        }).then((response)=>{
                var res = response.data;
                if(typeof res[0]=="object"){
                    res=res[0];
                }else{
                    res=null;
                }
                func(res);
            })         
            .catch(function (error) {
                console.log(error);
            })
    }else{
        if(!data||data=={}){
            Vue.jsonp (conf_.requestUrl).then(json => {
                // 返回数据 json， 返回的数据就是json格式
                json=JSON.parse(json) 
                if(json && typeof json=="object"){
                    if(json.errcode=="40013"){
                        json=null;
                    }else{
                       json=json;
                    }
                }else{
                    json=null;
                }
                if(typeof func === "function"){
                    func(json);
                }
            }).catch(err => {
            　　console.log(err);
            })
        }else{
            Vue.jsonp (conf_.requestUrl,data).then(json => {
                // 返回数据 json， 返回的数据就是json格式
                json=JSON.parse(json) 
                if(json && typeof json=="object"){
                    if(json.errcode=="40013"){
                        json=null;
                    }else{
                       json=json;
                    }
                }else{
                    json=null;
                }
                if(typeof func === "function"){
                   func(json);
                }
            }).catch(err => {
            　　console.log(err);
            })
        }
    }

}

Vue.prototype.getDataAsync=getDataAsync;

export default new Vuex.Store({
  state:{
    account:{username:"",id:"",acl:"",gym:"",idgym:"",gymcode:""},
    client:null
  },
  mutations:{
    log_auth (state,stark) {
        if(!state.account||state.account.id==""){
            var sql="select yh.crmzdy_81757148 gym,yh.crmzdy_81757148_id idgym,gym.crmzdy_80620116 gymcode,yh.crm_jiandang acl,yh.id,yh.crm_yhname username from crm_yh_238592_view yh,crm_zdytable_238592_23594_238592_view gym where yh.id=iduser and yh.crm_yiqiyong=1 and yh.crmzdy_81757148_id=gym.id for json path";
            //sql = sql.replace("iduser",279833);
            getDataAsync({sql1:sql},function(data){
                if(data){
                   state.account=data[0];
                }else{
                   alert("请先登陆OASIS!");
                   window.location.href = "https://oasis.thelittlegym.com.cn";
                }
                console.log("res:"+JSON.stringify(state.account))
            })
        }
    },
    get_data(state,param){
        console.log(JSON.stringify(state.account))
        if(state.account && state.account.id){
            if(param && param.sql &&param.func){
                var sql = param.sql;
                sql = sql.replace(/@gymcode/ig,state.account.gymcode);
                sql = sql.replace(/@idgym/ig,state.account.idgym);
                sql = sql.replace(/@iduser/ig,state.account.id);
                getDataAsync({sql1:sql},param.func);
            }
        }
    }

  }
})

 