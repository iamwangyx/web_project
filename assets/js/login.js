$(function() {
    // 点击去注册账号
    $("#link_reg").on("click", function() {
        $(".login-box").stop().hide();
        $(".reg-box").stop().show();
    });
    // 点击去登录账号
    $("#link_login").on("click", function() {
        $(".reg-box").stop().hide();
        $(".login-box").stop().show();
    });
    // 从layui之中抽取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 键值对方式
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验密码是否一致的规则,通过形参拿到再次确认密码框中的内容
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    });
    // 登录
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                    // 将登录成功的token字符串, 保存到本地存储之中
                    localStorage.setItem("token", res.token);
                    // 记录浏览历史,跳转到后台主页
                    location.assign('/index.html');
                }
            }
        });
    });
    // 注册
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("/api/reguser", data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            } else {
                layer.msg(res.message);
                // 自动触发事件,模拟人的点击行为
                $("#link_login").trigger("click");
            }
        });
    });
})