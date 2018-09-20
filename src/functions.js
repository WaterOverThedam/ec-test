if (process.client) {
    window.history.replaceState = window.history.replaceState || function () {}
}
  
var myFun = {
    install: function (Vue, options) {
        Vue.prototype.convertor={
            toUni:function (str) {
              return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
            },
            toGBK:function (str) {
              return unescape(str.replace(/\\u/gi, '%u'));
            }
        }
        Vue.prototype.clearNullAr=function(arr){
            for(var i=0,len=arr.length;i<len;i++){
                if(!arr[i]||arr[i]==''||arr[i] === undefined){
                    arr.splice(i,1);
                    len--;
                    i--;
                }
            }
            return arr;
        }
        Vue.prototype.extend=function(a,b,force=false){
            console.log(JSON.stringify(a))
            if(!(typeof a ==="object" && typeof b ==="object")){
                console.error("first two parameters must be object!");
                return {};
            }
            for(var prop in b){
                //console.log(prop)
                if(force || !a.hasOwnProperty(prop)) {
                    //console.log("update "+prop)
                    a[prop] = b[prop];
                };
            }
            return a;
        }
        Vue.prototype.fmtDate=fmtDate;
        Vue.filter('fmtDate', fmtDate);

        function fmtDate(date, fmt) {
            if(!date) return "";
            fmt = fmt || "yyyy-MM-dd";
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            };
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + '';
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
                }
            }
            return fmt;
        }
        
        function padLeftZero(str) {
            return ('00' + str).substr(str.length);
        }
        
    }
  }

export {
    myFun
}