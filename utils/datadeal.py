from pandas import Series,DataFrame
from sqlalchemy import create_engine
import numpy as np
import pymysql
import pandas as pd
pymysql.install_as_MySQLdb()

class Phones():
    @classmethod
    def phonesData(cls):
     engine = create_engine('mysql://root:123456@39.108.134.38:3306/provider?charset=utf8')
     # 显示所有列
     pd.set_option('display.max_columns', None)
     # 显示所有行
     pd.set_option('display.max_rows', None)
     # 设置value的显示长度为100，默认为50
     pd.set_option('max_colwidth', 20)

     # data = pd.read_sql('phones',engine)
     # data = pd.read_sql("select id,count(*) from phones where brand='华为' and provider='0'", engine, index_col='id')

     # 联通卖场手机统计
     data1 = pd.read_sql('select * from phones where provider=0', engine, index_col='id')
     group = data1.groupby(['brand']).size()
     dic = dict(group)

     # 移动卖场手机统计
     data2 = pd.read_sql('select * from phones where provider=1', engine, index_col='id')
     group1 = data2.groupby(['brand']).size()
     dic1 = dict(group1)

     # 电信卖场手机统计
     data3 = pd.read_sql('select * from phones where provider=2', engine, index_col='id')
     group2 = data3.groupby(['brand']).size()
     dic2 = dict(group2)

     data = [{k: v for k, v in dic.items()},
             {k: v for k, v in dic1.items()},
             {k: v for k, v in dic2.items()}
     ]
     return data

    @classmethod
    def priceData(cls):
        engine = create_engine('mysql://root:123456@39.108.134.38:3306/provider?charset=utf8')
        data1 = pd.DataFrame(pd.read_sql("select * from phones ", engine, index_col='id'))
        group = data1.loc[(data1['price'] > 1000) & (data1['price'] < 2500)].groupby(['provider']).size()
        dic = dict(group)
        group1 = data1.loc[(data1['price'] >= 2500) & (data1['price'] < 4000)].groupby(['provider']).size()
        dic1 = dict(group1)
        group2 = data1.loc[(data1['price'] >= 4000) & (data1['price'] < 5500)].groupby(['provider']).size()
        dic2 = dict(group2)
        group3 = data1.loc[(data1['price'] >= 5500)].groupby(['provider']).size()
        dic3 = dict(group3)

        data = [
                {k: v for k, v in dic.items()},
                {k: v for k, v in dic1.items()},
                {k: v for k, v in dic2.items()},
                {k: v for k, v in dic3.items()}
        ]
        return data
