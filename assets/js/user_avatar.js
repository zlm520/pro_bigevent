$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnchooseimage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        console.log(e);
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择照片')
        }
        var file = e.target.files[0]
        var imgURL = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', imgURL).cropper(options)

    })
    $("#btnupload").on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取头像失败');
                layui.layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })

})