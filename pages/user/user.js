Page({
    data:{
        userInfo:{}
    },
    onLoad:function(){
        var _this=this;
        this.getUserInfo(function(res){
            _this.setData({
                userInfo:res
            })
        })
    },
    getUserInfo(cb){
        var _this=this;
        if(this.userInfo){
            typeof cb=='function'&&cb(this.userInfo);
        }else{
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    _this.userInfo = res.userInfo
                    typeof cb == "function" && cb(_this.userInfo)
                }
            })
        }
    }
})        