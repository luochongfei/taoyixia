Page({
    data: {
        goodsInfo: {
            previewImgs: [
                'https://img01.wzhouhui.net/goods/image_show/2017/02/17/500/412133bf816956251b53eaabad7d31c20b848a15.jpg',
                'https://img01.wzhouhui.net/goods/image_show/2017/05/22/500/5d00c4a5579caee5fc2734c95e172a227af2f461.jpg',
                'https://img01.wzhouhui.net/goods/image_show/2017/05/22/500/828217a6fd0f518804658dce2227d328ac0a1827.jpg',
                'https://img01.wzhouhui.net/goods/image_show/2017/05/22/500/1027acf9ccacf98a7425db6dff6ba8ecec856d31.jpg',
                'https://img01.wzhouhui.net/goods/image_show/2017/05/22/500/a6c82e4e550c35e364b28fcc9aa9e6ae85240658.jpg'
            ],
            detailImgs: [
                'https://img01.wzhouhui.net/uploads/pdm-desc-pic/SeaAmoy/image/2016/11/22/1479778557745841.jpg',
                'https://img01.wzhouhui.net/uploads/pdm-desc-pic/SeaAmoy/image/2016/11/22/1479778557417847.jpg',
                'https://img01.wzhouhui.net/uploads/pdm-desc-pic/SeaAmoy/image/2016/11/22/1479778557168262.jpg',
                'https://img01.wzhouhui.net/uploads/pdm-desc-pic/SeaAmoy/image/2016/11/22/1479778557148027.jpg',
                'https://img01.wzhouhui.net/uploads/pdm-desc-pic/SeaAmoy/image/2016/11/22/1479778557995908.jpg'
            ]
        },
        bottomBarShowIntro: false,
        bottomBarTimer: null
    },
    pageScroll(event) {
        var
            _this = this,
            scrollTop = event.detail.scrollTop;
        clearTimeout(_this.bottomBarTimer);
        _this.bottomBarTimer = setTimeout(function() {
            _this.setData({
                bottomBarShowIntro: scrollTop > 390 ? true : false
            });
        }, 600);

    }
});