(function(window){
    var util = {};
    var time = {
        getYear:function(){
            var date = new Date();
            var year = date.getFullYear(),
                month = date.getMonth()+1,
                day = date.getDate(),
                hour = date.getHours() < 10 ? '0'+date.getHours():date.getHours(),
                minute = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes(),
                second = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
            var editor = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
            return editor;
        }
    }
    util.time = time;
    window.util = util;
})(window)
