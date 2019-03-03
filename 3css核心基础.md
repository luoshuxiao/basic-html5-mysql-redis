#一.优先级：每一种选择器都有权重值，权重值越大，优先级越高

		标签选择器：0001（1）
		class选择器：0010（2）
		id选择器：0100（4）
		群组选择器：单独看每个选择器的权重
		后代选择器：每个单独选择器的权重和
	
	无论哪一种选择器，内联样式表的优先级最高，权重值一样时，谁后写谁的优先级最高
#二.标准流：（所有标签布局默认都是尽力往上再往左靠）
**css语言的主要作用：对网页布局和样式设置**
##1.标准流：网页中的内容在没有写样式的时候，默认的布局方式，就叫标准流

	标准流中不同类型的标签布局方式不一样：
	   a.如果是块级标签，一个标签占一行，默认的宽度是父标签的宽度，默认的高度是内容的高度，设置框/高有效：
	        比如： h1到h6，p,table,tr,ol,ul,dl,div
	   b.如果是行内标签，一行可以显示多个，默认的宽度和高度是内容的宽高，设置宽高无效
	        比如： font,td,input,a,img,select,tetarea,span
	   c.如果是行内块标签，一行可以显示多个，默认的宽高是内容的宽高，设置宽高有效
##2.display属性值代表标签的类型：
	   1.block -- 块标签
	   2.inline  -- 行内
	   3. inline-block -- 行内块
	  默认情况下我们的标签只有行内和块标签，可以通过修改display属性值来修改标签类型，

**使用行内块标签的时候，有一个不可避免的bug，行内块标签与其他标签之间的间隙无法去除，不建议使用行内块标签**

##3.浮动：
   float :left;左浮动 

  float:right(右浮动)

浮动会脱标（脱离标准流） -- 之前标准流的布局方式无效，所有标签都可以一行显示多个，默认宽高是文字的大小，设置宽、高有效
##4.清除浮动：清除因为浮动而高度坍塌现象
###产生高度坍塌原因：父标签不浮动，纸标签浮动，父标签高度坍塌
###解决方案：清除浮动
####方案一：添加空盒子：在高度会坍塌的父标签最后添加一个空div，并且设置clear的属性为both
####方案二：overflow:选中高度坍塌的标签，设置样式的overflow的值为hidden（原理是隐藏掉子标签超出的部分）

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
			<style type="text/css">  
				#div1{
					overflow: hidden;
					background-color: black;
				}
			</style>
		</head>
		<body>
			<div style="height: 120px;background-color: #FF0000;"></div>
			<div id="div1">
				<div style="background-color: bisque;float: left;width: 50px;height: 100px;"></div>
				<div style="background-color: darkmagenta;float: right;width: 60px;height: 300px;"></div>
				<!--<div style="clear: both;"></div>-->
			</div>
			<div style="height: 120px;background-color: #00ff00;"></div>
		</body>
	</html>
##5.文字环绕效果：被文字环绕的标签浮动，文字对应的标签不浮动
#三.定位属性：
	left  -- 标签左边到指定位置间距（左间距）
	top  -- 标签上边到指定位置间距（上间距）
	right  -- 标签右边到指定位置间距（右间距）
	bottom  -- 标签下边到指定位置间距（下间距）
##1.position属性 -- 设置标签定位时的参考对象（指定位置）
没有设置position属性的标签，默认的position属性值是initial/static（不对任何位置定位）
	
	absolute（绝对定位） -- 相对于第一个非initial/static的父标签定位
	relative（相对定位） -- 相对于当前标签在标准流中位置进行定位（很少用），一般把一个标签的
	position设置为relative是为了让纸标签可以相对自己定位
	fixed -- 相对于浏览器位置进行定位
	sticky -- 当网页中的内容超过一屏（需要滚动），相对于浏览器定位；
	           当网页中的内容没有超过一屏，相对于标准流定位

**注意：定位也会让标签脱标（一行可以显示多个标签，设置宽高有效，默认宽高是文字宽高）**

##四.标签的盒子模型:html中所有的网页上可见的标签都是盒子模型，有固定的结构：content内容，padding、border边框、margin(不可见)

	1.content内容 -- a.设置width和height就是在设置内容大小；
	                 b.标签中添加内容也是添加到content中
	                 c.设置背景颜色，会作用于content
	2.padding -- a.通过padding属性设置padding大小（四个方向）
	             b.设置背景颜色，会设置padding颜色
	3.border(边框) -- a.通过border相关属性设置border属性值（四个方向）
	                 b.单独设置边框的颜色
	4.margin -- a.通过margin相关属性设置margin的大小
	            b.不可见但是占位
