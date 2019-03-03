#一.BOM模型：browser object model(浏览器对象模型)
**js中提供了一个全局的window对象，用来表示当前浏览器,js中声明的全局变量，其实都是 绑定在window对象中的属性，（使用window属性和方法时，可省略window）**
##1.window基本操作：
###a.打开新窗口：window.open()

    window.open('http://www.baidu.com')
###b.关闭窗口：window.close()


	function windowAction(){
		myWindow= window.open('','',width=200,height=300)
		mywindow.moveTo(400,400)
		//c.调整窗口大小 --myWindow.resizeTo(500,500)
		myWindow.resizeTo(500,500)
		//d.刷新 -- window.reload(true)
		window.reload(true)
	}
###f.获取浏览器宽高
	console.log(window.innerWidth,window.innerHeight)  // 浏览器显示内容部分的宽度和高度
	console.log(window.outerWidth,window.outerHeight)  //  整个浏览器的宽高
##3.弹框  
	window.alert('弹框')
	window.confirm('是否删除')   // 弹出框有取消和确认按钮  ，点确认返回值为true，点取消返回值是false
	window.prompt('massage','输入值')  // 弹窗一个带输入框和取消，确定按钮的提示框
	                                  //点取消，返回值是null，点确认返回值是输入框中输入的内容
#二.定时事件
##1.每隔一段时间调用一次函数（时间单位是毫秒）--- setInterval(函数,时间)
##2.clearInterval(定时对象)  -- 停止定时
	var interval1 = window.setInterval(function(){
		num++
		timeNode.innerHTML=num
		// 3.clearTnterval -- 到指定时间后停止计时
		if(num == 30){
			window.clearInterval(interval1)
		}
	},1000)
##3.setTimeout(函数，时间)  --  隔指定时间的调用一次函数（只会调用一次）
##4.clearTimeout(定时对象) - 停止定时
	var massage = 'time is out!'
	var boom1=window.setTimeout(function(){
		console.log(massage)
	},1000)
	function clearBoom(){
		window.clearTimeout(boom1)
	}
#三.事件类型：js是事件驱动语言
##1.事件三要素：事件源、事件、事件驱动程序：点击按钮，弹出弹框窗-- 事件源：按钮，事件：点击，事件驱动程序：弹出弹窗
	 
##2.绑定事件：
	 第一步：获取事件源
	 第二步：绑定事件1
	 第三步：写驱动程序
	 a.在标签内部给事件源的事件属性赋值：如果被绑定的驱动程序是函数，函数中的this关键字是window
	 b.通过节点绑定事件：标签节点.事件属性 = 函数  (函数中的this是事件源)

	var butNode = document.getElementById('button2')
	//    函数直接写成匿名函数（也可以先声明函数，在调用函数名赋值）
	butNode.onclick=function(){
		butNode.style.backgroundColor = 'red'
	}
	// 通过节点绑定事件 :可以给同一个节点绑定多个事件驱动程序（以前的事件驱动程序不会被覆盖）
	var butNode1= document.getElementById('button3')
	butNode1.addEventListener('click',function(){
		this.style.color = 'yellow'
	})
##3.获取事件对象：当获取事件驱动程序是函数时，函数中可以设置一个参数，来获取当前事件的事件对象
	var divNode = document.getElementById('div')
	divNode.onclick=function(event){    // event就是事件对象
		console.log(event.clientX,event.clientY)  //  clientX和clientY是鼠标点击位置相对于内容的坐标
		console.log(event.offsetX,event.offsetY)
		if(event.offsetX*2<300){
			this.style.backgroundColor='red'
		}else{
			this.style.backgroundColor='black'
		}
	}
##4.常见事件类型：
	a.onload -- 页面加载完成对应的事件
     1.鼠标事件
       onmouseover :鼠标覆盖
       onmouseout  ：鼠标移出
       onmousedown ：鼠标按下
       onmouseup   ：鼠标弹起
       onmousewheel：鼠标滚轮滚动
     2.键盘事件
       onkeydown
       onkeyup
       onkeypress
     3.输入完成事件
       onchange -- 输入框状态输入结束

	
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
			<script type="text/javascript">
				//  在页面加载完成过后才去获取节点
				window.onload =function(){
					var pNode = document.getElementById('p1')
					console.log(pNode)
					
					pNode.onclick=function(){
						alert('别点我啊aaaaaaa！')
						
					}	
					pNode.onmouseover=function(){
						this.innerText='鼠标进入'
						this.style.backgroundColor='red'
					}
					pNode.onmouseout=function(){
					    this.innerText='鼠标退出'
						this.style.backgroundColor='black'
					}
					pNode.onmousedown=function(){
						this.innerText='鼠标按下'
						
					}
					pNode.onmouseup=function(){
						this.innerText='鼠标弹起'
					}
					
					pNode.onmousewheel=function(){
						this.innerText='鼠标滚轮'
					}
					
					
					
					
				}
			</script>
		</head>
		<body>
			<p id='p1'>我是段落</p>
			<img src="https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/810a19d8bc3eb135312324e2a01ea8d3fc1f4486.jpg" alt="" />
			<input type="" name="" id="" value="" />
		</body>
	</html>
	<script type="text/javascript">
		var imgNode = document.getElementsByTagName('img')[0]
		console.log(imgNode)
		alert('加载完成')
		
		
		var inpNode = document.getElementsByTagName('input')[0]
		inpNode.onkeypress=function(event){
			console.log(event)
			var keycode = event.keyCode
			
		}
		
		
		
		inpNode.onchange=function(){
			alert('输入完成状态')
		}
		
		
	</script>