$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度需在1-6个字符之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) return layer.msg('获取信息失败')
                //快速为表单赋值
                form.val('formuserinfo', res.data)
            }
        })
    }
    $('#btnreset').on('click', function(e){
        e.preventDefault();
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg('获取信息失败')
                layer.msg('cg');
                window.parent.getUserInfo()
            }
        })
      })
})