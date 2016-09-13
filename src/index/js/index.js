
$(document).ready(function () {

    // 加载loading
    var ai1 = 0;
    var atimer1 = 0;
    function playloading() {
        ai1++;
        if (ai1 >= 6) {
            ai1 = 1;
        }

        document.getElementById("loadingpics").src = "images/loading/loading-" + ai1 + ".png";
        atimer1 = setTimeout(playloading, 200)
//            console.log("img/loading-"+ai1+".png")
    }
    playloading();


    document.onreadystatechange = subSomething;
    function subSomething() {

        if (document.readyState == "complete") {
            var par = 1;
            setInterval(function () {
                par++;
                if (par >= 100) {
                    par = 100;
                }

                $(".perc_txt").html(par + "%");
            }, 10);
//loading加载完成之后处理的方法
            setTimeout(function () {
                $(".load").hide();
//                pageSet.initSwiper();
            }, 100);
        }
    }


});


//注册页面



$(function() {
    $('#regPhone').show();
    var popRegNote = {
        open: function() {
            $('#popRegNote').fadeIn(200);
        },
        close: function() {
            $('#popRegNote').fadeOut(100);
        }
    }
    var regParams = {
        name: '',
        password: '',
        repassword: '',
        community_id: '',
        house_id: '',
        code: '',
        rec_uid: 0,
        userToken: ''
    }
    var cityId = 0,floorId = 0,unitId = 0;
    //展示协议
    $('#showRegNote').on('click', function(e) {
        e.preventDefault();
        popRegNote.open();
    })
    //关闭协议
    $('#popRegNote button').on('click', function() {
        popRegNote.close();
    });
    //点击下一步
    //提交注册
    $('#bingPhone').on('click', function() {
        regParams.name = $('#mobile').val();
        regParams.code = $('#smscode').val();
        regParams.password = $('#simpass').val();
        if (regParams.name == '' || regParams.code == '' || regParams.password == '' ) {
            $('#errorTips').text('请填写所有信息！').show()
            setTimeout(function(){$('#errorTips').hide()},1000)
        } else {

            $('#errorTips').text('')
            $('#regPhone').hide();
            $('#regRoom').show();
            console.log(regParams);

        }
    });



    //获取手机验证码
    var isSend = true;
    $('#getSmsCode').on('click', function() {
        //alert("123")
        if(isSend){
            regParams.name = $('#mobile').val();
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(regParams.name))) {
                $('#errorTips').text('请输入正确的手机号码！').show()
                setTimeout(function(){$('#errorTips').hide()},1000)
                return false;
            } else {

               // $('#errorTips').text('');
              //  $(this).text('已发送');

                var wait=60;
                function time(o) {
                    if (wait == 0) {
                        o.removeAttribute("disabled");
                        o.value="获取验证码";
                        wait = 60;


                    } else {
                        o.setAttribute("disabled", true);
                        o.value="重新发送(" + wait + ")";
                        wait--;
                        setTimeout(function() {
                                time(o)
                            },
                            1000)
                    }
                }
                time(this);




                isSend = false;
                $.ajax({
                    type: 'POST',
                    url: hosturl + '/ajax_user/sendSms',
                    data: {
                        mobile: regParams.name,
                        type: 'reg'
                    },
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                    }
                });
                var timer = setInterval(function(){
                    if(t < 1){

                    }else{

                    }
                },1000)
            }
        }
    });

    //关闭提示
    $('#popTips').on('click',function(){
        $('#popTips').hide().find('.box').html('');
    });


    //密码显示切换



    $(".visible").click(function () {
        if($(this).hasClass("password_on")){

            $(this).removeClass("password_on");
             $(this).css({"background":"url(images/botton-off.png) no-repeat right"});
             $(this).parent().find("input").attr({"type": "password"})
        }else{
            $(this).addClass("password_on");
              $(this).css({"background":"url(images/botton-on.png) no-repeat right"});
             $(this).parent().find("input").attr({"type": "text"})
        }
    });
    //我的订单

    $(".order-details .tab li").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");

        var i = $(this).index();

        $(".tab-box").addClass("active").eq(i).siblings().removeClass("active");


    })





});