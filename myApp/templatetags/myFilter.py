from django import template

register = template.Library()

@register.filter(name='repls')
def myFilter(value):
    value = value.replace(r'（普通版）','')
    return value