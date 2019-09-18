# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class ChinamobileApp(models.Model):
    id = models.AutoField(max_length=50,primary_key=True, verbose_name=u"主键", default=1)
    name = models.CharField(max_length=50, blank=True, null=True)
    speedlimit = models.CharField(max_length=50, blank=True, null=True)
    callbeyondfee = models.CharField(max_length=50, blank=True, null=True)
    show_total_call = models.CharField(max_length=50, blank=True, null=True)
    dingxiang_flow = models.CharField(max_length=50, blank=True, null=True)
    callanswer = models.CharField(max_length=50, blank=True, null=True)
    flowbeyondfee = models.CharField(max_length=200, blank=True, null=True)
    v_4g_kd_new = models.CharField(max_length=50, blank=True, null=True)
    tariffdesc = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'chinamobile_app'


class Chinatelecom(models.Model):
    id = models.AutoField(max_length=50, primary_key=True, verbose_name=u"主键", default=1)
    type = models.CharField(max_length=20, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    fee = models.CharField(max_length=20, blank=True, null=True)
    flow = models.CharField(max_length=20, blank=True, null=True)
    call = models.CharField(max_length=20, blank=True, null=True)
    sec_card = models.CharField(max_length=50, blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    summary = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'chinatelecom'


class Chinaunicom(models.Model):
    id = models.AutoField(max_length=50, primary_key=True, verbose_name=u"主键", default=1)
    typename1 = models.CharField(db_column='typeName1', max_length=50, blank=True, null=True)  # Field name made lowercase.
    typename2 = models.CharField(db_column='typeName2', max_length=50, blank=True, null=True)  # Field name made lowercase.
    title1 = models.CharField(max_length=100, blank=True, null=True)
    title2 = models.CharField(max_length=100, blank=True, null=True)
    price = models.CharField(max_length=20, blank=True, null=True)
    detail_url = models.CharField(max_length=200, blank=True, null=True)
    invoicetime = models.CharField(db_column='inVoicetime', max_length=50, blank=True, null=True)  # Field name made lowercase.
    inflowgn = models.CharField(db_column='inFlowgn', max_length=50, blank=True, null=True)  # Field name made lowercase.
    inincrementbusiness = models.CharField(db_column='inIncrementbusiness', max_length=50, blank=True, null=True)  # Field name made lowercase.
    infreeanswer = models.CharField(db_column='inFreeanswer', max_length=50, blank=True, null=True)  # Field name made lowercase.
    extravoicetime = models.CharField(db_column='extraVoicetime', max_length=50, blank=True, null=True)  # Field name made lowercase.
    extrasms = models.CharField(db_column='extraSms', max_length=50, blank=True, null=True)  # Field name made lowercase.
    extraotherbusiness = models.CharField(db_column='extraOtherbusiness', max_length=50, blank=True, null=True)  # Field name made lowercase.
    combofeatures = models.CharField(max_length=2000, blank=True, null=True)
    extraflowgnadd = models.CharField(db_column='extraFlowgnAdd', max_length=200, blank=True, null=True)  # Field name made lowercase.
    addprivilege = models.CharField(db_column='addPrivilege', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        # managed = False
        db_table = 'chinaunicom'


class ChinaunicomAppPkg(models.Model):
    id = models.AutoField(max_length=50, primary_key=True, verbose_name=u"主键", default=1)
    type = models.CharField(max_length=20, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    fee = models.CharField(max_length=20, blank=True, null=True)
    flow = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'chinaunicom_app_pkg'


class Mobile(models.Model):
    id = models.AutoField(max_length=50, primary_key=True, verbose_name=u"主键", default=1)
    goodsname = models.CharField(db_column='goodsName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price = models.CharField(max_length=255, blank=True, null=True)
    summary = models.CharField(max_length=255, blank=True, null=True)
    weburl = models.CharField(db_column='webUrl', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type = models.IntegerField(blank=True, null=True)
    provider = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'mobile'


class Phones(models.Model):
    id = models.AutoField(max_length=50, primary_key=True, verbose_name=u"主键", default=1)
    brand = models.CharField(max_length=20, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    evalnum = models.CharField(db_column='evalNum', max_length=10, blank=True, null=True)  # Field name made lowercase.
    detail_url = models.CharField(max_length=100, blank=True, null=True)
    provider = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'phones'
