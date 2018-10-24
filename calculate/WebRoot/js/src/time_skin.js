    var num;
    var time;
    var a;
    var timer_is_on = 0;

    /**
     * 统计时间
     */
    function jishi() {
        time--;

        document.getElementById('time').innerHTML = calTime(time); //倒计时
        a = setTimeout(jishi, 1000);

        if (time == num * 0.5) {
            alert("考试时间还剩一半！");
        }
        if(time == 0) {
            clearTimeout(a);
            alert("时间到,测试结束！");
        }
    }
    document.getElementById("timeOut").onclick = function() {

        if (!timer_is_on) {
            timer_is_on = 1;
            time = 120;
            jishi();
        }
    }
    document.getElementById("begin").onclick = function() {
            if (!timer_is_on) {
                timer_is_on = 1;
                num = document.getElementById("count").value;
                time = num * 120;
                jishi();
            }
        }
    function calTime(time) {
        var spit = ":";
        var hour = "00";
        var second = "00";
        var min = "00";
        var result = "";

        if (time % 60 != 0) { //秒
            if (time % 60 >= 10) {
                second = time % 60;
            } else {
                second = "0" + time % 60;
            }
        }

        if (parseInt(time / 60) != 0) { //分
            if (parseInt(time / 60) >= 10) {
                min = parseInt(time / 60);
            } else {
                min = "0" + parseInt(time / 60);
            }
        }

        if (parseInt(time / 3600) != 0) { //时
            if (parseInt(time / 3600) >= 10) {
                hour = parseInt(time / 3600);
            } else {
                hour = "0" + parseInt(time / 3600);
            }
        }

        result = hour + spit + min + spit + second;

        return result;
    }

    /**
     * 切换背景皮肤
     * @param color
     * @constructor
     */
    function Changecolor(color) {
        document.getElementById("body").style.backgroundImage = color;
        document.getElementById("body").style.backgroundRepeat="no-repeat";
        // document.getElementById("body").style.backgroundAttachment="fixed";
        document.getElementById("body").style.backgroundSize = "cover";

    }


