$(function() {
    // 获取用户的基本信息
    getUserInfo();
    var layer = layui.layer;

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                } else {
                    // 调用渲染用户头像的函数
                    loadAvatar(res.data);
                }
            }
        });
    };
    // 渲染用户头像
    function loadAvatar(user) {
        var name = null;
        name = user.name != null ? name = user.nickname : name = user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic != null) {
            $(".layui-nav-img").attr('src', user.user_pic).stop().show();
            $(".text-avatar").stop().hide();
        } else {
            $(".layui-nav-img").stop().hide();
            var first = name[0].toUpperCase();
            $(".text-avatar").html(first).show();
        }
    };
    // 退出功能
    $("#btnLogout").on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                // 清空本地存储的token
                localStorage.removeItem('token');
                // 重新跳转登录页面
                location.href = '/login.html';
                layer.close(index);
            });
    });
})