$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    // 获取用户的基本信息
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败！');
                } else {
                    console.log(res);
                    form.val('formUserInfo', res.data);
                }
            }
        })
    };
    // 重置表单的数据
    $("#reset").on("click", function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });
    // 监听表单的提交行为
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                } else {
                    layer.msg('更新用户信息成功！');
                    window.parent().getUserInfo();
                }
            }
        })
    });
})