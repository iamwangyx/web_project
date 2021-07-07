// $.ajaxPrefilter()统一拼接请求的根路径,发送ajax请求之前,会返回一个回调函数,形参包含每一次请求的相关信息
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // token字符串:访问有权限接口的身份认证，需要在请求头配置对象中添加Authorization身份认证字段
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    };
    // 全局挂载complete回调函数
    // 调用有权限的接口,请求无论成功与否,都需要调用complete回调函数,来验证身份成功与否
    options.complete = function(res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
});