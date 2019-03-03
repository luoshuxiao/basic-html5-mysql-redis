#一.jQuery: javascript的第三方库或者说框架
**主要是对标签操作进行封装，包括节点操作，属性操作，样式操作，事件操作等，让js操作起来更快更方便**
##1.如何写jQuery代码：
**通过script标签导入jQuery文件，$符号代表jQuery**
    <script type="text/javascript" src='js文件'></script>
##2.节点操作：
###a.$(函数) -- 函数中的内容等到页面中所有标签加载完成后才执行
window.onload -- 当网络中的内容全部加载成功后触发的事件（如果有网路图片加载，会等图片加载完成后触发事件）

###b.节点操作：
		<!--导入jQuery本地文件-->
		<script type="text/javascript" src="js/jquery.min.js">
		    //等待页面中所有的标签添加成功，就会触发
		    //  完整版
			$(document).ready(function(){
			
		    })
			// 简写版本
			$(function(){
				//2.获取节点操作（选择器）
				//$(选择器) ---  选择器和js一样
				//a.通过标签名获取节点 --标签选择器
				//$('标签选择器') --- 选择网页中所有的指定标签，返回是jQuery对象不是数组 
				//注意：返回值不是数组，无论选择到几个标签，返回类型都是一样的，可以对整体进行操作
			$('p+a')  // 紧跟着p标签后面的a标签
			$('#div>a') // 获取id是div标签下的标签名为a的子标签
			$('#div')  // 获取所有id是div的标签
			$('a')   //  获取所有a标签
			$('.div') // 获取所有class是div的标签
			$('a,p') //  获取a标签和p标签
			$('#p1~*') // 获取和id是p1平级的所有标签
			$('div:first') //获取网页中的第一个div标签
			$('p:last')  // 获取网页中最后一个p标签
			$('div *:first-child') // 获取网页中所有div标签下第一个子标签	
			
			//  3. 创建标签：$('html语法') --- $('<div>内容</div>')
            var imgNode = $('<div>我是div</div>')
			//   4.添加标签：父标签.append(子标签) --在父标签最后添加
			//            父标签.prepend（子标签) --在父标签最前添加
			$('body').append(imgNode)
			$('body').prepend(imgNode)
			$('h1').before($('<h1></h1>'))
			$('h1').after($('<p></p>'))
			
			//  5.清空标签---标签.empty(清空指定标签内的文本和子标签)
			$('#div').empty()
			// 6.删除标签 -- 标签.remove()
			$('#div').remove()
            $('#id1').append($('<p>我是我是</p>'))
			})		
		</script>

		<!--企业开发的时候，通过cdn加速，去服务器直接导入jQuery文件-->
		<script type="text/javascript" src='网址'></script>

#二.属性和样式：
##1.普通属性的获取和修改：除了内容的部分（innerText,innerHTML,value）
    标签.attr（属性名）  --  获取指定的属性值
    标签.attr(属性名，值) --  修改、添加属性
    srcNode=$('img').attr('src')  //  取第一个img的src属性
    $('img').attr('title','图片一')  //  给所有img标签的title属性修改（添加）：图片一
##2.标签内容：
    $(标签).html() -- 获取标签的内容部分（包括文本和标签），返回值是string
    $(标签).val()  --  获取标签的value值，返回值是string
    $(标签).text() -- 获取标签文本内容(不包括标签，只是获取文本内容)，返回值是string

            console.log($('p').html(),typeof($('p').html()))   //   获取p标签内的所有内容，包括标签
            console.log($('p').text())   //   获取文本内容
        	console.log($('input').val())  //  获取单标签中的value值
##3.class属性：html中一个标签的class值可以是多个，用空格隔开
			标签.addClass(class值) -- 给标签添加class值 
			标签.remove(class值) -- 移出标签指定的class属性值
        	$('#div1').addClass('w')  //  给id为div1的标签添加class值 w 样式
        	$('div').removeClass('a') // 给所有div标签删除class值为a的属性
##4.样式属性：
###a.标签.css（样式属性名) -- 获取样式属性的值 
      $('p').css('height')
###b.标签.css(样式属性名，值)---修改、增加样式属性 
     $('font').css('backgroundColor','red)
      //同时修改或者添加多个属性
     $('#div1').css({
           'border':'0',
          ' color':'red'
     })
##5.事件：标签.on(事件名，回调函数)  --  给标签绑定指定的事件
          //// this是js对象，可以直接写js代码，也可以转换为jQuery对象写jQuery代码：$(js对象)
		  $('.class').on('click',function(){
		        console.log(this)
                $(this).css('background-color','goldenrod')
		})
###5.1 模拟 点击事件： 
       var a = $('.class').on('click',function(){
		        console.log(this)
                $(this).css('background-color','goldenrod')
		})
       a.trigger('click')  //给事件添加trigger函数  （计算机模拟人为点击）
###5.2

##6.父标签事件传递给后代标签：父标签.on(事件,选择器，回调函数) -- 父标签添加事件，传递给选择器（后代标签）---父标签没有事件驱动程序，子标签有事件驱动程序

        	$('#v01').on('click','.v0111',function(){
					console.log(this)
				})

###练习：水果添加、删除

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
			<style type="text/css">
				*{
					border: 0;
					margin: 0;
					position: relative;
					outline: 0;
				}
				.fruit{
					width: 160px;
					height: 40px;
					border: 1px solid black;
					background-color: #D3D3D3;
					color: white;
					text-align: center;
					line-height: 40px;
				}
				font{
					position: absolute;
					right: 10px;
				}
			</style>
			<script type="text/javascript" src="js/jquery.min.js"></script>
	
		</head>
		<body>
			<div id='top'></div>
			<script type="text/javascript">
				$(function(){
					var fruitArray = ['苹果','香蕉','火龙果','荔枝']
					//  遍历数组，取到名字，创建并添加水果标签到父标签
					for(var x in fruitArray){
						var fruitname = fruitArray[x]
						$('#top').append($('<div class="fruit">'+fruitname+'</div>'))
					}
					// 给水果标签添加  X
					$('.fruit').append($('<font>'+"X"+'</font>'))
					// 点击添加标签时，添加水果标签和X标签在父标签中
					$('#add').on('click',function(){
						// 创建水果标签，并把X作为子标签添加到水果标签
						if($('input').val() == ''){
							window.alert('输入为空')
						}else{
							var fruitN=$('<div class="fruit"></div>').text($('input').val()).append($('<font>X</font>'))
							// 将水果标签添加到父标签
							$('#top').append(fruitN)
						}
	
					})
				    // 点击 X 的时候让他的 父标签 移除
					$('#top').on('click','font',function(){
						$(this).parent().remove()
					})
				})
			</script>
			<div id='div2'>
				<input style="border-bottom: 2px solid black;text-align: center;" value="" />
				<button id='add'>添加</button>
			</div>
		</body>
	</html>

#三.Ajax（jQuery的封装）：Asynchronous  Javascript  And XML （js+xml）
**xml基本上已经被淘汰，ajax 一般用来做网络数据请求，和python中的requestes库一样**

##语法：
		a.$.get(url,data,回调函数，返回数据类型)
		    ---url:请求地址（字符串）
		    ---data:参数列表（对象）
		    ---回调函数：请求成功后自动调用函数执行操作（函数名或者匿名函数）
		    ---返回数据类型：请求到的数据的格式
		b.$.ajax({
		     'url':地址,
		     'data':{
		         参数名1：值1，
		         参数名2：值2，
		         ...
		      }
		      type:'GET'/'POST'
		      dataType:返回数据类型，
		      success：function(){
		           代码段
		     }
		})

###练习：用ajax请求数据：

		<!DOCTYPE html>
		
		<html>
			<head>
				<meta charset="UTF-8">
				<title></title>
				<script type="text/javascript" src="js/jquery.min.js"></script>
				
			</head>
			<body>
				<button>刷新</button><br />
				<!--1.get请求-->
				<script type="text/javascript">
					//1.请求数据
					var page = 1;
					function getData(){
						var url = 'https://www.apiopen.top/satinApi'
						page++
						$.get(url, {'type':'2', 'page':page}, function(re){
							//re就是请求结果
			//				console.log(re)
							var allData = re.data;
							for(var x in allData){
								var data = allData[x];
								var bimageuri = data.profile_image;
								var imgNode = $('<img style="width: 100px; height: 100px;"/>').attr('src', bimageuri)
								$('body').append(imgNode)
							}
						});
					}
					//2.刷新
					$('button').on('click',getData);
					
				</script>
			</body>
		</html>



			$.ajax({
				url:url2,
				data:{
					key:'772a81a51ae5c780251b1f98ea431b84',
					word:'人'
			    },
				type:'GET',
				success:function(re){					
				  console.log(re)
				}
			})
			