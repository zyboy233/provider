from django.urls import path
from myApp import views

urlpatterns = [
    path(r'', views.home),
    path(r'api/echarts_phones1',views.echarts_phones1),
    path(r'api/echarts_phones2',views.echarts_phones2),
    path(r'chinamobile/',views.chinamobile),
    path(r'chinamobile/<int:id>/',views.chinamobile_id),
    path(r'chinatelecom/',views.chinatelecom),
    path(r'chinatelecom/<int:id>/',views.chinatelecom_id),
    path(r'chinaunicom/',views.chinaunicom),
    path(r'chinaunicom/<int:id>/',views.chinaunicom_id),
    path(r'chinaunicom_pkg/',views.chinaunicom_pkg),
    path(r'chinaunicom_pkg/<str:type_id>/',views.chinaunicom_pkg_id),
    path(r'chinamobile_pkg/',views.chinamobile_pkg)
]