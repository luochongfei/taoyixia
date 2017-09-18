Page({
    data: {
        // 合计
        total: 0,
        // 购物车列表
        cartList: [],
        // 选择所有
        checkedAll: false
    },
    onLoad() {

    },

    // 进入购物车界面触发
    onShow() {
        var cartList = wx.getStorageSync('cart_list');
        this.setData({
            cartList: cartList,
            checkedAll: this.isCheckedAll()
        });

        this.calcTotal();
    },

    // 单个商品数量操作面板（开|关）
    editPanel(event) {
        var
            dSet = event.currentTarget.dataset,
            index = dSet.index,
            flag = dSet.flag,
            str = "cartList[" + index + "].showEditPanel",
            tmpObj = {};

        tmpObj[str] = flag;
        this.setData(tmpObj);

        // 关闭修改面板
        if (flag == 'hide') {
            // 更新总价
            this.calcTotal();

            // 更新全局购物车数据
            this.syncLocalCartData();
        }
    },

    // (不)选择所有
    checkAll() {
        var
            _this = this,
            list = this.data.cartList;
        for (var i = 0; i < list.length; i++) {
            list[i].checked = !list[i].checked;
        }
        this.setData({
            cartList: list,
            checkedAll: !this.data.checkedAll
        });

        this.calcTotal();
    },

    // 改变单项选中状态
    checkOne(event) {
        var
            index = event.currentTarget.dataset.index,
            str = "cartList[" + index + "].checked",
            tmpObj = {};

        tmpObj[str] = !this.data.cartList[index].checked;
        this.setData(tmpObj);

        // 改变全选状态
        this.setData({
            checkedAll: this.isCheckedAll()
        });

        // 计算总价
        this.calcTotal();

        this.syncLocalCartData();
    },

    // 变更单个商品购物车数量
    changeCount(event) {
        var
            dSet = event.currentTarget.dataset,
            flag = dSet.flag,
            index = dSet.index,
            // 购物车原数量
            originCount = this.data.cartList[index].cart_count,
            str = 'cartList[' + index + '].cart_count',
            tmpObj = {};

        if (flag == 'reduce') {
            if (originCount > 1) {
                tmpObj[str] = --originCount;
            }
        } else if (flag == 'add') {
            tmpObj[str] = ++originCount;
        }
        // 设置新数量
        this.setData(tmpObj);

    },

    // 是否全选了
    isCheckedAll() {
        var
            list = this.data.cartList,
            flag = true;
        for (var i = 0; i < list.length; i++) {
            if (!list[i].checked) {
                flag = false;
            }
        }
        return flag;
    },

    // 计算总价
    calcTotal() {
        var
            total = 0,
            list = this.data.cartList;

        for (var i = 0; i < list.length; i++) {
            if (list[i].checked) {
                total += parseFloat(list[i].goods_price * list[i].cart_count);
            }
        }

        this.setData({
            total: total
        })
    },

    // 同步
    syncLocalCartData() {
        var cartList = this.data.cartList;
        wx.setStorage({
            key: 'cart_list',
            data: cartList,
            complete() {
                console.log('更新购物车成功')
            }
        });
    }
});