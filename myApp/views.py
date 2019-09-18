import math
import json

from random import randrange
from example.commons import Faker

from myApp.models import Chinaunicom,ChinamobileApp,Chinatelecom,ChinaunicomAppPkg,Mobile

from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse

from pyecharts.charts import Bar,Page,Pie, Line
from pyecharts.globals import ThemeType
from pyecharts import options as opts

from utils.datadeal import Phones

REMOTE_HOST = "https://pyecharts.github.io/assets/js"


def home(request):
    return render(request, 'home.html')

def echarts_phones1(request):
    # data = Phones.phonesData()
    # bar = mybar(data)
    # print(bar)
    bar = """
    {
    "animation": true,
    "animationThreshold": 2000,
    "animationDuration": 1000,
    "animationEasing": "cubicOut",
    "animationDelay": 0,
    "animationDurationUpdate": 300,
    "animationEasingUpdate": "cubicOut",
    "animationDelayUpdate": 0,
    "color": [
        "red",
        "green",
        "blue"
    ],
    "series": [
        {
            "type": "bar",
            "name": "\u8054\u901a",
            "data": [
                26,
                17,
                7,
                27,
                16,
                25
            ],
            "barCategoryGap": "20%",
            "label": {
                "show": true,
                "position": "top",
                "margin": 8
            }
        },
        {
            "type": "bar",
            "name": "\u79fb\u52a8",
            "data": [
                9,
                18,
                5,
                29,
                32,
                6,
                9
            ],
            "barCategoryGap": "20%",
            "label": {
                "show": true,
                "position": "top",
                "margin": 8
            }
        },
        {
            "type": "bar",
            "name": "\u7535\u4fe1",
            "data": [
                4,
                33,
                95,
                87,
                42,
                27
            ],
            "barCategoryGap": "20%",
            "label": {
                "show": true,
                "position": "top",
                "margin": 8
            }
        }
    ],
    "legend": [
        {
            "data": [
                "\u8054\u901a",
                "\u79fb\u52a8",
                "\u7535\u4fe1"
            ],
            "selected": {
                "\u8054\u901a": true,
                "\u79fb\u52a8": true,
                "\u7535\u4fe1": true
            },
            "show": true
        }
    ],
    "tooltip": {
        "show": true,
        "trigger": "item",
        "triggerOn": "mousemove|click",
        "axisPointer": {
            "type": "line"
        },
        "textStyle": {
            "fontSize": 14
        },
        "borderWidth": 0
    },
    "xAxis": [
        {
            "show": true,
            "axisLabel":{
                "textStyle":{
                    "color":"white"
                }
            },
            "scale": false,
            "nameLocation": "end",
            "nameGap": 15,
            "gridIndex": 0,
            "inverse": false,
            "offset": 0,
            "splitNumber": 5,
            "minInterval": 0,
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "width": 1,
                    "opacity": 1,
                    "curveness": 0,
                    "type": "solid"
                }
            },
            "data": [
                "OPPO",
                "VIVO",
                "\u4e09\u661f",
                "\u5176\u4ed6",
                "\u534e\u4e3a",
                "\u5c0f\u7c73",
                "\u82f9\u679c"
            ]
        }
    ],
    "yAxis": [
        {
            "show": true,
            "axisLabel":{
                "textStyle":{
                    "color":"white"
                }
            },
            "scale": false,
            "nameLocation": "end",
            "nameGap": 15,
            "gridIndex": 0,
            "inverse": false,
            "offset": 0,
            "splitNumber": 5,
            "minInterval": 0,
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "width": 1,
                    "opacity": 1,
                    "curveness": 0,
                    "type": "solid"
                }
            }
        }
    ],
    "title": [
        {
            "text": "\u8fd0\u8425\u5546",
            "subtext": "\u624b\u673a\u5356\u573a\u7edf\u8ba1"
        }
    ]
}
"""
    return JsonResponse(json.loads(bar))

def echarts_phones2(request):
    # data = Phones.priceData()
    # alist = []
    # for item in data:
    #     alist.append([int(v) for v in item.values()])
    # print(alist)
    alist = [[39, 40, 105], [33, 23, 57], [22, 13, 22], [16, 7, 40]]
    return HttpResponse(json.dumps(alist))

def mybar(data):
    # print(data)
    c = (
        Bar()
            .set_colors(['red','green','blue'])
            .add_xaxis([k for k in data[1].keys()])
            .add_yaxis("联通", [int(v) for v in data[0].values()])
            .add_yaxis("移动", [int(v) for v in data[1].values()])
            .add_yaxis("电信", [int(v) for v in data[2].values()])
            .set_global_opts(title_opts=opts.TitleOpts(title="运营商", subtitle="手机卖场统计"))
            .dump_options_with_quotes()
    )
    return c

def chinamobile(request):
    goods = ChinamobileApp.objects.all()
    return render(request, 'detail_provider/chinamobile.html',{'goods':goods})

def chinamobile_id(request, id):
    good = ChinamobileApp.objects.filter(id=id)[0]
    good = {
        'result':[good.name,good.speedlimit,good.callbeyondfee,good.show_total_call,good.dingxiang_flow,good.callanswer,good.flowbeyondfee,good.v_4g_kd_new,good.tariffdesc]
    }
    return JsonResponse(json.dumps(good),safe=False)

def chinatelecom(request):
    goods = Chinatelecom.objects.all()
    return render(request, 'detail_provider/chinatelecom.html',{"goods":goods})

def chinatelecom_id(request, id):
    good = Chinatelecom.objects.filter(id=id)[0]
    good = {
        'result': [good.type,good.title, good.fee, good.flow, good.call, good.sec_card,good.content, good.summary]
    }
    return JsonResponse(json.dumps(good), safe=False)

def chinaunicom(request):
    goods = Chinaunicom.objects.all()
    return render(request,'detail_provider/chinaunicom.html',{'goods':goods})

def chinaunicom_id(request, id):
    good = Chinaunicom.objects.filter(id=id)[0]
    good = {
        'result': [good.title1,good.title2, good.price, good.invoicetime, good.inflowgn, good.inincrementbusiness,good.infreeanswer, good.extravoicetime,good.extrasms,good.extraotherbusiness,good.combofeatures,good.extraflowgnadd,good.addprivilege]
    }
    return JsonResponse(json.dumps(good), safe=False)

def chinaunicom_pkg(request):
    types = [['加速包','jiasu'],['日包','day'],['月包','month'],['半年包','half'],['视频包','video'],['社交包','shejiao'],['音乐包','music'],['游戏包','games'],['教育包','education']]
        # 'type_id':['jiasu','day','month','half','video','shejiao','music','games','education']
    return render(request, 'detail_provider/chinaunicom_pkg.html',{'types':types})

def chinaunicom_pkg_id(request,type_id):
    pkgs = ChinaunicomAppPkg.objects.filter(type=type_id)
    dic = []
    for pkg in pkgs:
        dic.append([pkg.type,pkg.title,pkg.fee,pkg.flow])
    return JsonResponse(json.dumps(dic), safe=False)

def chinamobile_pkg(request):
    pkgs = Mobile.objects.all()
    return render(request, 'detail_provider/chinamobile_pkg.html',{'pkgs':pkgs})

def test(request):
    return render(request, 'test.html')

