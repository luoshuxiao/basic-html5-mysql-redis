#一.DOM模型：document object model
**模型是一种倒着的树结构，里面是各种节点组成**
##a.document对象是js中写好的一个对象，代码是网页内容的结构，通过document对象可以拿到网页中所有对应的节点
##b.获取节点：在js中获取html标签
#二.节点操作：
##1.直接获取节点：
###a.通过标签的id值来获取节点：document.getElementById(id值) -- 返回值是节点对象

**如果html中同样的id对应的标签有多个，只会取一个（一般情况下id在html中要有唯一性）**
	var pNode = document.getElementById('p1')
	console.log(pNode)
##b.通过标签名来获取指定的标签： document.getElementByTagName(标签名) -- 返回值是数组，数组的元素是节点
	var aNode=document.getElementsByTagName('a')
	for(x in aNode){
		if(typeof(aNode[x])=='object'){
			console.log(aNode)
		}
	}
##c.通过类名来获取指定标签 :document.getElenmentsByClassName(类名) -- 返回值是数组，数组元素是节点
	var bNode = document.getElementsByClassName('c1')
	console.log(bNode)
#2.间接获取节点
##a.获取父节点：子节点.parentElenment/子节点.parentNode
	var box11Node = document.getElementById('box11')
	var box1Node  = box11Node.parentElement
	var box1Node2 = box11Node.parentNode
	console.log(box1Node,box1Node2)
##b.获取子节点
	// 获取所有子节点： 父节点.children--返回数组对象
	var allchild=box1Node.children
	console.log(allchild)
	// 获取父节点下所有内容（节点和文本）： 父节点.childNodes -- 返回数组 对象
	var allchild1=box1Node.childNodes
	console.log(allchild1)
	//获取第一个子节点: 父节点.firstElementChild -- 返回对象
	var firstchild1 = box1Node.firstElementChild
	console.log(firstchild1)
#二.创建、添加、删除节点
##1.创建节点：document.createElement(标签名) --  创建指定标签节点

      标签对象中有相应的标签相关的属性，可以通过标签节点获取或者修改这些属性值
	    例如：a标签节点有：href属性，id属性，className属性，style属性等
	    img标签节点有：src属性，id属性，style属性，alt属性，title属性等
	    innerHTML： 双标签的标签内容（包含其他标签）
	    innerText：双标签的标签内容（侧重只有文字）

	// 创建超链接和图片节点
	var aNode = document.createElement('a')
	var imgNode = document.createElement('img')
	//  修改img节点的图片src属性
	imgNode.src='img/img/a1.jpg'
##2.添加节点
###a.在指定的标签中添加一个子标签：父节点.appendChild

	var divNode = document.getElementById('div1')
	div1Node.appendChild(imgNode)
	function addDiv(){
		var divNode = document.createElement('div')
		divNode.innerHTML='我是box1'
		div1Node.append(divNode)
	}
###b.父节点.insertBefore（新节点，指定节点） -- 在父节点中的指定节点插入新节点

    div1Node.insertBefore(imgNode,divNode.firstChild)
###c.直接删除节点:节点.remove()
###d.删除子节点
	//父节点.removeChild（子节点） -- 删除父节点中指定的子节点
	divNode.removeChild(imgNode)
	divNode.innerHTML = null     //  清空父标签所有子标签   
	
		5.隐藏
		    设置style属性中的display值为none --  节点.style.display = 'none'
		6.Math.random() -- 产生随机数0到1之间的小数
		    parseInt()  -- 转换成整数
	        parseFloat() -- 转换成小数
	    7.拷贝节点 -- 节点.cloneNode() --  浅拷贝，只会拷贝当前节点，不会拷贝它的子节点
	        节点.cloneNode(true)  --  深拷贝，连它的子节点一起拷贝
	    8.替换节点--父节点.raplaceChild -- 替换父节点的子节点



#三.属性的操作
##1.属性的语法操作： 节点.属性 -- 获取属性值； 节点.属性 = 新值  --  修改属性的值
##2.通过相应方法对属性进行操作
###a.获取属性 --  节点.getArrtribute(属性名)
	var imgNode = document.getElementsByTagName('img')
	var srcAttr = imgNode.getAttribute(name)
	console.log(srcAttr)
###b.属性赋值 --  节点.setAttribute(属性名，值)
	imgNode.setAttribute('title','帅哥')
###c.删除属性  --  节点.removeAttribute()
	var buttonNode = document.getElementsByTagName('button')
	buttonNode.removeAttribute('disabled')


###练习：增加、删除标签

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
			<style type="text/css">
				*{
					margin: 0;
					padding: 0;
					position: relative;
				}
				#top{
					margin-left: 60px;
					margin-top: 60px;
				}
				#top div{
					width: 200px;
					height: 50px;
					color: white;
					font-size: 20px;
					margin-bottom: 2px;
					text-align: center;
					line-height: 50px;
				}
				#top div font{
					position: absolute;
					right: 3px;
					/*将光标变成手*/
					cursor: pointer;
				}
				
				#bottom{
					margin-left: 60px;
				}
				#bottom #text{
					display: inline-block;
					width: 200px;
					height: 50px;
					border: none;
					outline: none;
					/*让光标在中间*/
					text-align: center;
					border-bottom: 2px solid lightgrey;
					font-size: 16px;
				}
				#bottom #button{
					display: inline-block;
					width: 100px;
					height: 30px;
					border: none;
					outline: none;
					background-color: coral;
					color: white;
				}
			</style>
		</head>
		<body>
			<div id="top">
			</div>
			<!--添加默认的水果标签-->
			<script type="text/javascript">
					var fruitArray = ['香蕉', '苹果', '草莓', '火龙果'];
					for(index in fruitArray){
						fruitName = fruitArray[index];
						creatFruitNode(fruitName, 'darkgreen')
					}
					//==========删除水果=============
					function delFruit(){
						//在这儿，点击的是哪个标签this就指向谁
						this.parentElement.remove()
					}
					//添加节点
					function creatFruitNode(fruitName, color1){
						//创建标签
						var fruitNode = document.createElement('div')
						fruitNode.innerHTML = fruitName;
						var fontNode = document.createElement('font');
						fontNode.innerText = '×';
						//给点击事件绑定驱动程序
						fontNode.onclick = delFruit;
						fruitNode.appendChild(fontNode);
						//设置背景颜色
						fruitNode.style.backgroundColor = color1
						//添加标签
						var topNode = document.getElementById('top')
						topNode.appendChild(fruitNode)
					}
				</script>
			<div id="bottom">
				<input type="text" name="" id="text" value="" />
				<input type="button" name="" id="button" value="确定" onclick="addFruit()"/>
			</div>
			<script type="text/javascript">
				//=========产生随机颜色=============
				function randomColor(){
					var num1 = parseInt(Math.random()*255);
					var num2 = parseInt(Math.random()*255);
					var num3 = parseInt(Math.random()*255);
					return 'rgb('+num1+','+num2+','+num3+')';
				}
				//==========添加水果==============
				function addFruit(){
					//获取输入框中的内容
					var inputNode = document.getElementById('text');
					var addName = inputNode.value;
					if(addName.length == 0){
						alert('输入的内容为空！');
						return;
					}
					//清空输入框中的内容
					inputNode.value = '';
					//创建标签
					var fruitNode = document.createElement('div');
					fruitNode.innerHTML = addName;
					var fontNode = document.createElement('font');
					fontNode.innerText = '×';
					//给点击事件绑定驱动程序
					fontNode.onclick = delFruit;
					fruitNode.appendChild(fontNode);
					//创建随机颜色
					//'rgb(255, 0, 0)'
					fruitNode.style.backgroundColor = randomColor();
					var topNode = document.getElementById('top');
					topNode.insertBefore(fruitNode, topNode.firstChild);
				}
			</script>
		</body>
	</html>
