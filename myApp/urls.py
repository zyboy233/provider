from django.urls import path
from myApp import views

urlpatterns = [
    path(r'', views.home,name='home'),
    path(r'api/echarts_phones1',views.echarts_phones1,name='api_p1'),
    path(r'api/echarts_phones2',views.echarts_phones2,name='api_p2'),
    path(r'chinamobile/',views.chinamobile,name='mobile'),
    path(r'chinamobile/<int:id>/',views.chinamobile_id,name='mobile_id'),
    path(r'chinatelecom/',views.chinatelecom,name='telecom'),
    path(r'chinatelecom/<int:id>/',views.chinatelecom_id,name='telecom_id'),
    path(r'chinaunicom/',views.chinaunicom,name='unicom'),
    path(r'chinaunicom/<int:id>/',views.chinaunicom_id, name='unicom_id'),
    path(r'chinaunicom_pkg/',views.chinaunicom_pkg,name='unicom_pkg'),
    path(r'chinaunicom_pkg/<str:type_id>/',views.chinaunicom_pkg_id,name='unicom_pkg_id'),
    path(r'chinamobile_pkg/',views.chinamobile_pkg, name='mobile_pkg')
]