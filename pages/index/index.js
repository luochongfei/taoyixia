Page({
    data: {

        // 当前显示类别（分类|品牌）
        currentNav: 0,

        // 分类列表
        cates: [{
            cls: 'naifen',
            name: '大牌奶粉',
            color: '#09f'
        }, {
            cls: 'yingerche',
            name: '母婴用品',
            color: '#8B2F8A'
        }, {
            cls: 'aixin',
            name: '营养保健',
            color: '#12CC94'
        }, {
            cls: 'huazhuangpin',
            name: '美妆个护',
            color: '#e61773'
        }, {
            cls: 'muyulu',
            name: '家居日用',
            color: '#F4806D'
        }, {
            cls: 'qiangzhuang',
            name: '男士保健',
            color: '#0245A3'
        }, {
            cls: 'shutiao',
            name: '进口美食',
            color: '#F79F24'
        }],

        // 产品列表
        products: [{
            goods_name: '澳洲Wyeth惠氏 S-26系列金装婴儿奶粉四段 2岁以上 900g/罐',
            goods_price: '89.00',
            goods_id: '5799',
            goods_grid: 'https://img01.wzhouhui.net/goods/image_show/2016/12/09/300/2e4bb698610fa38710e7cd251fef22eddfffb8d0.jpg'
        }, {
            goods_name: '美国GNC健安喜 左旋肉碱运动加强型减脂片 500mg*60粒/瓶',
            goods_price: '105.00',
            goods_id: '5499',
            goods_grid: 'https://img01.wzhouhui.net/goods/image_show/2016/12/09/300/ea1f50587fb2bd5d0a6fe742ddf90f953fd126b1.jpg'

        }, {
            goods_name: '韩国Frufe芙茹菲 组合4小件',
            goods_price: '19.00',
            goods_id: '5759',
            goods_grid: 'https://img01.wzhouhui.net/goods/image_show/2017/02/17/300/412133bf816956251b53eaabad7d31c20b848a15.jpg'
        }, {
            goods_name: '德国Aptamil爱他美 婴幼儿奶粉Pre段 0-6个月 800g/罐',
            goods_price: '178.00',
            goods_id: '5129',
            goods_grid: 'https://img01.wzhouhui.net/goods/image_show/2016/12/09/300/59d6d1d0b817bc082bc48ba6aedd358388263837.jpg'
        }]
    },
    onLoad() {

    },

    // 热门商品加入购物车
    addToCart(event) {
        var gid = event.currentTarget.dataset.gid;

        // 组装选择的商品 信息
        var goodsItem;
        for (var i = 0; i < this.data.products.length; i++) {
            if (gid == this.data.products[i].goods_id) {
                goodsItem = this.data.products[i];
                goodsItem.cart_count = 1;
                goodsItem.checked = true;
            }
        }


        var list = wx.getStorageSync('cart_list');

        if (list instanceof Array && list.length) {
            var flag = false;
            for (var i = 0; i < list.length; i++) {
                // 此前购物车中存在当前选择商品则数量加1
                if (list[i].goods_id == gid) {
                    flag = true;
                    if (!('cart_count' in list[i])) {
                        list[i].cart_count = 0;
                    }
                    ++list[i].cart_count;
                    break;
                }
            }
            // 如果此前购物车中当前选择商品
            if (!flag) {
                list.push(goodsItem);
            }
        } else {
            // 初始进入情况
            list = [];
            list.push(goodsItem);
        }


        wx.setStorage({
            key: 'cart_list',
            data: list,
            complete() {
                console.log('加入购物车成功')
            }
        });
    }
});