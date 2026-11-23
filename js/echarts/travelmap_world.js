var myWorldChart = echarts.init(document.getElementById('myWorldMap'));

var datalist = [ // value[经度,纬度,图库链接,国名中文翻译,首都,到过]
    {name: 'China',
    value: [116.40,39.90,'/galleries/Indonesia/','中国','北京'],
    symbolSize: 10,
    itemStyle: { color: '#EE1C25' },
    rippleEffect: { color: '#EE1C25' }
    },
    {name: 'France',
    value: [2.345,48.856,'/galleries/Indonesia/','法国','巴黎','巴黎,科尔马'],
    symbolSize: 10,
    itemStyle: { color: '#000091' },
    rippleEffect: { color: '#000091' }
    },
    {name: 'Italy',
    value: [12.488,41.900,'/galleries/Indonesia/','意大利','罗马','罗马,比萨,佛罗伦萨,威尼斯,米兰'],
    symbolSize: 10,
    itemStyle: { color: '#008C45' },
    rippleEffect: { color: '#008C45' }
    },
    {name: 'Switzerland',
    value: [7.447,46.948,'/galleries/Indonesia/','瑞士','伯尔尼','琉森,因特拉肯,伯尔尼'],
    symbolSize: 10,
    itemStyle: { color: '#DA291C' },
    rippleEffect: { color: '#DA291C' }
    },
    {name: 'Japan',
    value: [139.767,35.681,'/galleries/Indonesia/','日本','东京','大版,奈良,京都'],
    symbolSize: 10,
    itemStyle: { color: '#BC002D' },
    rippleEffect: { color: '#BC002D' }
    },
    {name: 'korea',
    value: [126.996,37.560,'/galleries/Indonesia/','韩国','首尔','济州岛'],
    symbolSize: 10,
    itemStyle: { color: '#0F64CD' },
    rippleEffect: { color: '#0F64CD' }
    },
    {name: 'Vietnam',
    value: [105.842,21.050,'/galleries/Indonesia/','越南','河内','河内'],
    symbolSize: 10,
    itemStyle: { color: '#C8102E' },
    rippleEffect: { color: '#C8102E' }
    },
    {name: 'Indonesia',
    value: [107.548,-6.165,'/galleries/Indonesia/','印度尼西亚','雅加达','雅加达,巴厘岛,泗水,佩尼达'],
    symbolSize: 10,
    itemStyle: { color: '#ff0000' },
    rippleEffect: { color: '#ff0000' }
    }
];

total_world = datalist.length; //  直接获取数量

option = {
    title: {
        text: '世界旅行足迹',
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
        subtext: `已经去过${total_world}个国家`,
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
        formatter: function (params) {
            name = params.name
            link = params.value[2]
            color = params.color
            translation = params.value[3]
            towhere = params.value[5] ?? ''
            return '<div style="color:'
            +
            color
            +
            ';font-weight:600;margin-bottom:4px">'
            +
            translation
            +
            '</div>'
            +
            '<a href="'
            +
            link
            +
            '"style="color:#59595c;text-decoration:underline">查看详情</a>'
            +
            '<div>'
            +
            '<h4>已经去过：</h4>'
            +
            towhere
            +
            '</div>'
            ;
        }
    },
    geo: {
        map: 'world',
        silent: true, //彻底禁用国家hover效果
        roam: true, // true=滚轮缩放+拖拽；'scale'=只滚轮缩放，不能拖拽；'move'=只拖拽
        scaleLimit: {
            min: 1, // 最小缩小倍数
            max: 6  // 最大放大倍数
        },
        layoutCenter: ['50%', '50%'], // 地图中心点居中
        layoutSize: ['85%', '85%'], //地图占 geo 容器宽高 85%，四周预留边距，窗口缩放时地图自动等比缩放，不会超出容器
    },
    series : [
        {
            name: '足迹',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: datalist,
            showEffectOn: 'render',
            rippleEffect: { // 涟漪波纹样式
                scale: 5, // 涟漪最大放大倍数，数值越大波纹越大
                period: 4, // 动画周期，越小越快
                brushType: 'stroke', // stroke空心环 / fill实心
            },
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    shadowBlur: 20,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

myWorldChart.setOption(option);

// 防抖，防止频繁resize
let timer_world;
window.addEventListener('resize', () => {
  clearTimeout(timer_world);
  timer_world = setTimeout(() => {
    myWorldChart.resize();
  }, 120);
})