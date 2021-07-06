// $.ajaxPrefilter()统一拼接请求的根路径,发送ajax请求之前,会返回一个回调函数,形参包含每一次请求的相关信息
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // token字符串:访问有权限接口的身份认证，需要在请求头配置对象中添加Authorization身份认证字段
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
});