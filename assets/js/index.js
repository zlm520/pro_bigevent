$(function () {
    getUserInfo()
    $('.icon-tuichu').on('click', function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token'),
                location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息')
            renderAvatar(res.data)
        },
       
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //设置欢迎文本内容
    $("#welcome").html(`欢迎  ${name}`)
    //按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}