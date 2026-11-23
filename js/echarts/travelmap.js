var myChart = echarts.init(document.getElementById('myMap'));

var data = [
    {name: '长沙', url: '/xxxxxx/xxxxxx/'},
    {name: '成都', url: '/xxxxxx/xxxxxx/'},
    {name: '重庆', url: '/xxxxxx/xxxxxx/'},
    {name: '三亚', url: '/xxxxxx/xxxxxx/'},
    {name: '海口', url: '/xxxxxx/xxxxxx/'},
    {name: '北京', url: '/xxxxxx/xxxxxx/'},
    {name: '南京', url: '/xxxxxx/xxxxxx/'},
    {name: '绍兴', url: '/xxxxxx/xxxxxx/'},
    {name: '杭州', url: '/xxxxxx/xxxxxx/'},
    {name: '太原', url: '/xxxxxx/xxxxxx/'},
    {name: '忻州', url: '/xxxxxx/xxxxxx/'},
    {name: '大同', url: '/xxxxxx/xxxxxx/'},
    {name: '朔州', url: '/xxxxxx/xxxxxx/'},
    {name: '吕梁', url: '/xxxxxx/xxxxxx/'},
    {name: '临汾', url: '/xxxxxx/xxxxxx/'},
    {name: '晋中', url: '/xxxxxx/xxxxxx/'},
    {name: '宁波', url: '/xxxxxx/xxxxxx/'},
    {name: '台州', url: '/xxxxxx/xxxxxx/'},
    {name: '金华', url: '/xxxxxx/xxxxxx/'},
    {name: '温州', url: '/xxxxxx/xxxxxx/'},
    {name: '嘉兴', url: '/xxxxxx/xxxxxx/'},
    {name: '上海', url: '/xxxxxx/xxxxxx/'},
    {name: '苏州', url: '/xxxxxx/xxxxxx/'},
    {name: '湖州', url: '/xxxxxx/xxxxxx/'},
    {name: '福州', url: '/xxxxxx/xxxxxx/'},
    {name: '深圳', url: '/xxxxxx/xxxxxx/'},
    {name: '香港', url: '/xxxxxx/xxxxxx/'},
    {name: '澳门', url: '/xxxxxx/xxxxxx/'},
    {name: '厦门', url: '/xxxxxx/xxxxxx/'},
    {name: '泉州', url: '/xxxxxx/xxxxxx/'},
    {name: '汕头', url: '/xxxxxx/xxxxxx/'},
    {name: '大连', url: '/xxxxxx/xxxxxx/'},
    {name: '泉州', url: '/xxxxxx/xxxxxx/'},
    {name: '黄山', url: '/xxxxxx/xxxxxx/'}
];
var geoCoordMap = {
    '长沙':[112.938900,28.227800],
    '成都':[104.066128,30.572924],
    '重庆':[106.552000,29.563000],
    '三亚':[109.512100,18.252800],
    '海口':[110.199900,20.044200],
    '北京':[116.407400,39.904200],
    '南京':[118.797000,32.060300],
    '绍兴':[120.582400,30.053000],
    '杭州':[120.209900,30.246600],
    '太原':[112.550700,37.870600],
    '忻州':[112.734200,38.416700],
    '大同':[113.366800,40.096800],
    '朔州':[112.432900,39.331600],
    '吕梁':[111.1382201,37.5180245],
    '临汾':[111.512998,36.0885338],
    '晋中':[112.7383414,37.6866796],
    '宁波':[121.549792,121.549792],
    '台州':[121.428599,28.661378],
    '金华':[119.649506,29.089524],
    '温州':[120.672111,28.000575],
    '嘉兴':[120.750865,30.762653],
    '上海':[121.472644,31.231706],
    '苏州':[120.619585,31.299379],
    '湖州':[120.102398,30.867198],
    '福州':[119.306239,26.075302],
    '深圳':[114.085947,22.547000],
    '香港':[114.177216,22.302711],
    '澳门':[113.552971,22.210928],
    '厦门':[118.110220,24.490474],
    '泉州':[118.589421,24.908853],
    '汕头':[116.708463,23.371020],
    '大连':[121.618622,38.914590],
    '泉州':[118.589421,24.908853],
    '黄山':[118.1299559,30.2841703]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].url)
            });
            //console.log(res)
        }
    }
    return res;
};

total = data.length; //  直接获取数量

option = {
    // backgroundColor: '#404a59',
    title: {
        text: '国内旅行足迹',
        link: '', // 主标题点击跳转链接
        target: 'blank', // 链接打开方式：self / blank
        textStyle: {
            color: '#18247a',
            fontStyle: 'normal', // normal italic oblique
            fontWeight: 'bold', // normal bold bolder lighter 或数字 100~900
            fontFamily: 'sans-serif',
            fontSize: 20,
            lineHeight: 24
        },
        itemGap: 8, //主副标题距离
        padding: 5,
        subtext: `已经去过${total}个城市`,
        sublink: '', // 副标题链接
        subtarget: 'blank',
        subtextStyle: {
            color: '#0e0f14',
            fontSize: 12
        },
        left: 'center',
        textAlign: 'auto', // 整体水平对齐：auto left right center
        textVerticalAlign: 'auto' // 整体垂直对齐：auto top bottom middle
    },
    tooltip: {
        trigger: 'item',
        enterable: true, //允许鼠标进入 tooltip
        alwaysShowContent: false, //让 tooltip 不随鼠标移开而消失
        hideDelay: 300,  // 加一点延迟，避免闪没
        confine: true,  //限制在图表区域内
        //padding: 10,
        //backgroundColor: '#222',
        //borderColor: '#777',
        //borderWidth: 1,
        formatter: function (params) {
            name = params.name
            link = params.value[2]
            return '<div style="font-weight:600;margin-bottom:4px">' + name + '</div>'+'<a href="' + link + '"style="color:#409EFF;text-decoration:underline">查看详情</a>';
        }
    },
    geo: {
        map: 'china',
        silent: true, //彻底禁用省份hover效果
        roam: true, // true=滚轮缩放+拖拽；'scale'=只滚轮缩放，不能拖拽；'move'=只拖拽
        scaleLimit: {
            min: 1, // 最小缩小倍数
            max: 5  // 最大放大倍数
        },
        layoutCenter: ['50%', '50%'], // 地图中心点居中
        layoutSize: ['85%', '85%'], //地图占 geo 容器宽高 85%，四周预留边距，窗口缩放时地图自动等比缩放，不会超出容器
    },
    series : [
        {
            name: '足迹',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: { // 涟漪波纹样式
                scale: 5, // 涟漪最大放大倍数，数值越大波纹越大
                period: 4, // 动画周期，越小越快
                brushType: 'stroke', // stroke空心环 / fill实心
                color: '#0099ff' // 涟漪单独颜色，可和中心点不一样
            },
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    color: '#409EFF', // 涟漪中心点颜色
                    shadowBlur: 20,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

myChart.setOption(option);

// 防抖，防止频繁resize
let timer;
window.addEventListener('resize', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    myChart.resize();
  }, 120);
})