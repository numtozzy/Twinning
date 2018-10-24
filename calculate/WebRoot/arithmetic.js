	var record=0;
	var op= new Array( "+", "-", "*", "/" );  //运算符

    var num;//题目个数
    var time;//解题时间
    var a;//记录setTimeout()方法返回的 ID 值。
    var timer_is_on = 0;//判断按键是否按下

        //开始按钮监听
		$("#begin").click(function(){
            if(document.getElementById("begins").firstChild.nodeValue == "开始" && timer_is_on==0){
                var intReg = /^[1-9]+\d*$/;
                num = document.getElementById("count").value;
                if (!(intReg.test(num))) {
                    alert(num + "请输入题目个数(正整数)：");
                    document.getElementById("number").focus();
                    return;
                }

                time = num * 60;
                jishi();
            }


            //开始/下一题的监听事件
            var s2 = $("input[name='options']:checked").val();
            document.getElementById("begins").innerText = "下一题";
            document.getElementById("answer").value = "";
            document.getElementById("result").value = "";
            if (s2 == "basic") {
                document.getElementById("option2").value = "basic";
                var count = parseInt(document.getElementById("count").value);
                for (var i = 0; i < 1; i++) {
                    var question = MakeFormula();
                    var result = Solve(question);
                    //过滤掉答案不为负数的
                    if ("invalid" == result) {
                        i--;
                        continue;
                    }
                    document.getElementById("formula").value = question + '=';

                    //提交的监听事件
                    $("#submit").click(function () {
                        var answerNode = document.getElementById("answer");
                        var answers = answerNode.value;
                        var numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                        var reg = /^\s*|\s*$/g;
                        var temp = answers;
                        temp = temp.replace(reg, "");
                        answerNode.value = temp;
                        if (temp == "") {
                            alert("请输入答案");
                            return false;
                        } else if (!(numReg.test(answers))) {
                            alert("请输入合法的答案");
                            return false;
                        } else if (result == answers) {

                            document.getElementById("result").value = "    恭喜你答对了！";
                            record++;
                        } else {

                            document.getElementById("result").value = "正确答案为：" + result + "    很遗憾答错了！";
                        }
                        return false;
                    });

                }
            }
            else {
                var tReg = /^[1-9]+\d*$/;
                document.getElementById("option1").value = "jiecheng";
                var count = parseInt(document.getElementById("count").value);  //获取用户输入的n阶乘
                if (!(tReg.test(count))) {
                    alert(count + "请输入题目个数(正整数)：");
                    document.getElementById("number").focus();
                    return;
                }
                var results = jiecheng(count);  //计算阶乘答案
                document.getElementById("formula").value = count + '! =';
                $("#submit").click(function () {

                    var answers = document.getElementById("answer").value;
                    document.getElementById("count").value = "";
                    if (results == answers) {
                        document.getElementById("result").value = "    恭喜你答对了！";
                        record++;
                    }
                    else {
                        document.getElementById("result").value = "正确答案为：" + results + "    很遗憾答错了！";
                    }

                });
            }

	});


	
	
	//阶乘
	function jiecheng(n)
	{
		var s= new Stack();
		if(n==0)
		{
				return 1;
		}
		while(n>1)
		{
			s.push(n--);
		}
		var product = 1;
		while(s.length()>0)
		{
			product*=s.pop();
		}
		return product;
		
	}
	
	
    function Score()
    {
    	return record*10;
    }
    
    
    /**
     * 随机生成运算式子
     * @resulturn
     */
    function MakeFormula(){
    	
        var build="";
        var count =parseInt((Math.random() * 2)+1,10);        //2-3个运算符
        var number1 = parseInt((Math.random() * 99) + 1,10);  //1-100之内的随机数
        var start = 0;
        build+=number1;
        while (start <= count)
		{
        	var operation = parseInt((Math.random() * 3)+1,10); // 随机的运算符
        	var number2 = parseInt((Math.random() * 99) + 1,10);
            build=build+(op[operation])+(number2);
            start++;
		}
        
        return build.toString();
    }

    /**
     * 运算符优先级
     * @param formula
     * @resulturn
     */
    function Solve(formula){
        var tempStack = new Stack();//放数字，运算符
        var operatorStack = new Stack();//放运算符
        var len = formula.length; 
        var k = 0;
        var mark = "invalid";
        for(var j = -1; j < len - 1; j++){
            var formulaChar = formula.charAt(j+1);  //index 0 返回 第一个数
            if(j == len - 2 || formulaChar == '+' || formulaChar == '-' || formulaChar == '/' || formulaChar == '*') {
                if (j == len - 2) {
                	
                	tempStack.push(formula.substring(k));
                    
                }
                else {
                        tempStack.push(formula.substring(k, j + 1));
                    if(operatorStack.dataStore == false){
                        operatorStack.push(formulaChar); // 在栈中放入第一个符号
                    }else{
                        var stackChar = operatorStack.peek();
                        if ((stackChar == '+' || stackChar == '-')
                                && (formulaChar == '*' || formulaChar == '/')){
                            operatorStack.push(formulaChar);
                        }else {
                        	
                            tempStack.push(operatorStack.pop());
                            operatorStack.push(formulaChar);
                        }
                    }
                }
                k = j + 2; 
            }
        }
      while(operatorStack.dataStore.length>0){
    	 
            tempStack.push(operatorStack.pop());
            operatorStack.dataStore.length--;
            
        }
        var calcStack = new Stack();
        // 遍历
      
        for(var i=0;i<tempStack.dataStore.length;i++){
            if(tempStack.dataStore[i]!="+" && tempStack.dataStore[i]!="-" && tempStack.dataStore[i]!="/" && tempStack.dataStore[i]!="*") {
                calcStack.push(tempStack.dataStore[i]); // 把数字存入栈
            }else{
            	var a = 0;
            	var b = 0;
            	while(calcStack.dataStore.length>0){
               	 
            		b = parseFloat(calcStack.pop());
            		a = parseFloat(calcStack.pop());
            		calcStack.dataStore.length=calcStack.dataStore.length-2;
                    
                }
                	
                switch (tempStack.dataStore[i]) {
                    case "+":
                       calcStack.push(String(a + b));
                        break;
                    case "-":
                       calcStack.push(String(a - b));
                        break;
                    case "*":
                        calcStack.push(String(a * b));
                        break;
                    default:
                        calcStack.push(String(a / b));
                        break;
                }
            }
        }
        if(parseFloat(calcStack.peek())<0){
        	return mark;
        }
        return calcStack.pop();
    }
//    function isEmptyObject(obj) {   
//    	　　for (var key in obj){
//    	　　　　return false;//返回false，不为空对象
//    	　　}　　
//    	　　return true;//返回true，为空对象
//    	}
   
    
    /*使用栈stack类的实现*/
    function Stack() {
        this.dataStore = [];//保存栈内元素，初始化为一个空数组
        this.top = 0;//栈顶位置，初始化为0
        this.push = push;//入栈
        this.pop = pop;//出栈
        this.peek = peek;//查看栈顶元素
        this.clear = clear;//清空栈
        this.length = length;//栈内存放元素的个数
    }

    function push(element){
        return this.dataStore[this.top++] = element;
    }

    function pop(){
        return this.dataStore[--this.top];
    }

    function peek(){
        return this.dataStore[this.top-1];
    }

    function clear(){
        this.top = 0;
    }

    function length(){
        return this.top;
    }




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
            jieshu();
            location.reload();
        }
    }
    $("#over").click(function(){
        jieshu();
        alert("用时："+ timeOfUse(num * 60 - time));
        location.reload();
    });
    function timeOfUse(time){
        var hour = Math.floor(time/3600%24);
        var min = Math.floor(time/60%60);
        var second = time - hour*3600 - min*60;
        return (hour + "时" + min + "分" + second + "秒");
    }
    function jieshu() {
        //结束按钮的监听事件
        document.getElementById("formula").value="";
        document.getElementById("result").value="";
        document.getElementById("answer").value="";
        alert("你共答对"+record+"题，分数为"+Score());
        if(timer_is_on = 1){
            alert("用时："+ timeOfUse(120));
        }else{
            alert("用时："+ timeOfUse(num * 60));
        }

    }
    document.getElementById("timeOut").onclick = function() {

        if (!timer_is_on) {
            timer_is_on = 1;
            time = 120;
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


