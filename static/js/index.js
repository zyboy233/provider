$(function () {
    echart_1();
    echart_2();
    echart_3();
    echart_4();

    // echart_map();
    // echart_5();
    echart_banner();

    //echart_1湖南货物收入
    function echart_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/home/api/echarts_phones1",
            dataType: 'json',
            success: function (result) {
                myChart.setOption(result)
            }
        });
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    //echart_2湖南省地图
    function echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));
        // $.ajax({
        //     type: "GET",
        //     url: "http://127.0.0.1:8000/home/api/echarts_phones2",
        //     dataType: 'json',
        //     success: function (result) {
        //         myChart.setOption(result);
        //     }
        // });
        function showProvince() {
            myChart.setOption(option = {
                backgroundColor: '#0c1f33',

                title: {
                    text: '',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 1,
                    max: 25,
                    inRange: {
                        colorLightness: [0.15, 1]
                    }
                },
                series: [
                    {
                        name: '包类型',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 3, name: '日包'},
                            {value: 9, name: '教育包'},
                            {value: 5, name: '游戏包'},
                            {value: 1, name: '半年包'},
                            {value: 4, name: '加速包'},
                            {value: 2, name: '月包'},
                            {value: 9, name: '音乐包'},
                            {value: 1, name: '社交包'},
                            {value: 1, name: '假日包'},
                            {value: 24, name: '视频包'}
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            });
        }

        var currentIdx = 0;
        showProvince();
        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    // echart_map中国地图
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        var mapName = 'china'
        var data = []
        var toolTipData = [];

        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        var geoCoordMap = {
            '福州': [119.4543, 25.9222],
            '长春': [125.8154, 44.2584],
            '重庆': [107.7539, 30.1904],
            '西安': [109.1162, 34.2004],
            '成都': [103.9526, 30.7617],
            '常州': [119.4543, 31.5582],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '海口': [110.3893, 19.8516],
            '长沙': [113.019455, 28.200103],
            '上海': [121.40, 31.73],
            '内蒙古': [106.82, 39.67]
        };

        var GZData = [
            [{
                name: '长沙'
            }, {
                name: '福州',
                value: 95
            }],
            [{
                name: '长沙'
            }, {
                name: '长春',
                value: 80
            }],
            [{
                name: '长沙'
            }, {
                name: '重庆',
                value: 70
            }],
            [{
                name: '长沙'
            }, {
                name: '西安',
                value: 60
            }],
            [{
                name: '长沙'
            }, {
                name: '成都',
                value: 50
            }],
            [{
                name: '长沙'
            }, {
                name: '常州',
                value: 40
            }],
            [{
                name: '长沙'
            }, {
                name: '北京',
                value: 30
            }],
            [{
                name: '长沙'
            }, {
                name: '北海',
                value: 20
            }],
            [{
                name: '长沙'
            }, {
                name: '海口',
                value: 10
            }],
            [{
                name: '长沙'
            }, {
                name: '上海',
                value: 80
            }],
            [{
                name: '长沙'
            }, {
                name: '内蒙古',
                value: 80
            }]
        ];

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#c5f80e'];
        var series = [];
        [
            ['石家庄', GZData]
        ].forEach(function (item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'arrow',
                    symbolSize: 5
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        option = {
            tooltip: {
                trigger: 'item'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            series: series
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    //echart_3货物周转量
    function echart_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_3'));
        myChart.clear();
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/home/api/echarts_phones2",
            // dataType: 'json',
            success: function (result) {
                res = JSON.parse(result)
                var arr1 = []
                var arr2 = []
                var arr3 = []
                for (var i = 0; i <= 3; i++) {
                    arr1.push(res[i][0])
                    arr2.push(res[i][1])
                    arr3.push(res[i][2])
                }
                option = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['联通', '移动', '电信'],
                        textStyle: {
                            color: '#fff'
                        },
                        top: '8%'
                    },
                    grid: {
                        top: '20%',
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    color: ['#FF4949', '#FFA74D', '#FFEA51', '#4BF0FF', '#44AFF0', '#4E82FF', '#584BFF', '#BE4DFF', '#F845F1'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1000', '2500', '4000', '5500+'],
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        name: '数量',
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    series: [
                        {
                            name: '联通',
                            type: 'line',
                            data: arr1
                        },
                        {
                            name: '移动',
                            type: 'line',
                            data: arr2
                        },
                        {
                            name: '电信',
                            type: 'line',
                            data: arr3
                        }
                    ]
                };
                myChart.setOption(option);
            }
        });
    }

    //湖南高速公路
    function echart_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_4'));
        // $.ajax({
        //     type: "GET",
        //     url: "http://127.0.0.1:8000/home/api/echarts_phones2",
        //     dataType: 'json',
        //     success: function (result) {
        //         myChart.setOption(result);
        //     }
        // });
        function showProvince() {
            myChart.setOption(option = {
                backgroundColor: '#0c1f33',

                title: {
                    text: '',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 8,
                    max: 60,
                    inRange: {
                        colorLightness: [0, 0.8]
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 33, name: '0-10元'},
                            {value: 18, name: '10-20元'},
                            {value: 6, name: '20-30元'},
                            {value: 8, name: '30+元'}
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            });
        }

        var currentIdx = 0;
        showProvince();
        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    //湖南省飞机场
    function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));

        function showProvince() {
            var geoCoordMap = {
                '长沙黄花国际机场': [113.226512, 28.192929],
                '张家界荷花机场': [110.454598, 29.107223],
                '常德桃花源机场': [111.651508, 28.921516],
                '永州零陵机场': [111.622869, 26.340994],
                '怀化芷江机场': [109.714784, 27.44615],
            };
            var data = [{
                name: '长沙黄花国际机场',
                value: 100
            },
                {
                    name: '张家界荷花机场',
                    value: 100
                },
                {
                    name: '常德桃花源机场',
                    value: 100
                },
                {
                    name: '永州零陵机场',
                    value: 100
                },
                {
                    name: '怀化芷江机场',
                    value: 100
                }
            ];
            var max = 480,
                min = 9; // todo
            var maxSize4Pin = 100,
                minSize4Pin = 20;
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            myChart.setOption(option = {
                title: {
                    top: 20,
                    text: '',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: '#ccc'
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {}
                },
                geo: {
                    show: true,
                    map: 'hunan',
                    mapType: 'hunan',
                    label: {
                        normal: {},
                        //鼠标移入后查看效果
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    //鼠标缩放和平移
                    roam: true,
                    itemStyle: {
                        normal: {
                            //          	color: '#ddd',
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(	47,79,79, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
                series: [{
                    name: 'light',
                    type: 'map',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    itemStyle: {
                        normal: {
                            color: '#F4E925'
                        }
                    }
                },
                    {
                        name: '点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: function (val) {
                            var a = (maxSize4Pin - minSize4Pin) / (max - min);
                            var b = minSize4Pin - a * min;
                            b = maxSize4Pin - a * max;
                            return a * val[2] + b;
                        },
                        label: {
                            normal: {
                                // show: true,
                                // textStyle: {
                                //     color: '#fff',
                                //     fontSize: 9,
                                // }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#F62157', //标志颜色
                            }
                        },
                        zlevel: 6,
                        data: convertData(data),
                    },
                    {
                        name: 'light',
                        type: 'map',
                        mapType: 'hunan',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: data
                    },
                    {
                        name: ' ',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 5)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9',
                                shadowBlur: 10,
                                shadowColor: '#05C3F9'
                            }
                        },
                        zlevel: 1
                    },

                ]
            });
        }

        // showProvince();
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_banner() {
        var myChart = echarts.init(document.getElementById('chart_banner'));

        option = {
            legend: {top: '4%'},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['product', '100', '100-200', '200-300', '300-400', '400-500', '500+'],
                    ['联通', 9, 2, 0, 0, 0, 0],
                    ['移动', 4, 4, 2, 2, 0, 0],
                    ['电信', 2, 2, 1, 1, 1, 2],
                ]
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "white"
                    }
                }
            },
            yAxis: {
                gridIndex: 0,
                axisLabel: {
                    show:true,
                    textStyle:{
                        color:'white'
                    }
                }
            },
            grid: {top: '45%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    label: {
                        formatter: '{b}: {@100} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '100',
                        tooltip: '100'
                    }
                }
            ]
        };

        myChart.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });

        myChart.setOption(option);

    }

    //点击跳转
    $('#chart_map').click(function () {
        window.location.href = './page/index.html';
    });
    $('.t_btn2').click(function () {
        window.location.href = "./page/index.html?id=2";
    });
    $('.t_btn3').click(function () {
        window.location.href = "./page/index.html?id=3";
    });
    $('.t_btn4').click(function () {
        window.location.href = "http://127.0.0.1:8000/detail/chinamobile_pkg/";
    })
});
