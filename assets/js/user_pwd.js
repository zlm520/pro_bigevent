$(function () {
    var form = layui.form; 
    var layer=layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        reppwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一样'
            }
          },
        samepwd:function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
       
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                
                if (res.status != 0) return layer.msg('获取信息失败')
                layer.msg('cg');
                $(".layui-form")[0].reset()
            }
        })
      })
})