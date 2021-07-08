$(function() {
    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    $image.cropper(options);
    var layer = layui.layer;
    var form = layui.form;
    initCate();
    initEditor();

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('初始化文章分类失败！');
                } else {
                    var htmlStr = template('tpl-cate', res);
                    $('[name=cate_id]').html(htmlStr);
                    // 一定要记得调用 form.render() 方法
                    form.render();
                }
            }
        });
    };
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    });
    $('#coverFile').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    });
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                fd.append('cover_img', blob)
                publishArticle(fd);

                function publishArticle(fd) {
                    $.ajax({
                        method: 'POST',
                        url: '/my/article/add',
                        data: fd,
                        // 注意：如果向服务器提交的是 FormData 格式的数据，
                        // 必须添加以下两个配置项
                        contentType: false,
                        processData: false,
                        success: function(res) {
                            if (res.status !== 0) {
                                return layer.msg('发布文章失败！')
                            }
                            layer.msg('发布文章成功！')
                                // 发布文章成功后，跳转到文章列表页面
                            location.href = '/article/art_list.html'
                        }
                    })
                };
            })
    });
})