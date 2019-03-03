var cityArray = ['北京','上海','天津','重庆','河北','山西','河南','辽宁','吉林','黑龙','江内','蒙古','江苏','山东','安徽','浙江','福建','湖北','湖南','广东','广西','江西','四川','海南','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆','港','澳','台湾','钓鱼岛']
$(function(){
	var cityBox=$('.addr')
	for(var s in cityArray){
		var cityName=cityArray[s]
		var cityNode = $('<font class="city"></font>')
		cityNode.text(cityName)
		cityBox.append(cityNode)
	}
	//保存当前选中的城市
	var currentCityNode = $('.addr font:first')
	currentCityNode.css('background-color','red')
	currentCityNode.css('color','white')
    // 添加事件
    cityBox.on('click','.city',function(){
    	var cityName = $(this).text()
    	$('.addr_menu font').text(cityName)
    	//修改样式
    	currentCityNode.css('background-color','white')
    	currentCityNode.css('color','#A0A0A0')
    	currentCityNode = $(this)
    	currentCityNode.css('background-color','red')
    	currentCityNode.css('color','white')
    	
    })
	//鼠标悬停事件
	cityBox.parent().on('mouseover',function(){
		cityBox.css('display','block')
	})
	cityBox.parent().on('mouseleave',function(){
		cityBox.css('display','none')
	})
})