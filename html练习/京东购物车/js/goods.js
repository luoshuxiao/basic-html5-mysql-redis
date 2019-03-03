$(function(){
	//1.请求商品数据
	$.get('http://rap2api.taobao.org/app/mock/121200/webinfo',function(re){
		var goodsArray = re['goods']
		for (var s in goodsArray){
			var goodsNode = goodsArray[s]
			//创建标签
			var trNode = $('<tr class="after"></tr>')
			trNode.append($('<td class="chInput"><input type="checkbox"/></td>'))
			trNode.append($('<td class="imggoods"><img src="'+goodsNode['img']+'"/><font>'+goodsNode['desc']+'</font></td>'))
			trNode.append($('<td>'+'￥'+goodsNode['price']+'</td>'))
			trNode.append($('<td class="inputnum"><button>-</button><input type="text" value="'+goodsNode['num']+'"/><button>+</button></td>'))
			var total = Number(Number(goodsNode['num'])*goodsNode['price'])
			trNode.append($('<td id="total">'+'￥'+total+'</td>'))
			trNode.append($('<td id="del">删除</td>'))
			
			$('#goods').append(trNode)
			$('#goods').append($('<tr id="empn"><td colspan="6"></td></tr>'))
		}
		//2.绑定事件
		//点击每个商品前的选中框的事件
		var goodsCh = $('.chInput input').on('click',function(){
			a = $(this).parent()
			
			console.log(a)
			console.log('选中该商品后的操作（总计的钱增加:',$('a #total').text(),'）')
		})
		// 点击全选的事件
		$('#goods #td1').on('click',function(){
			
			$('.after .chInput input').attr('checked')
			
		})
		// 点击删除的事件
		$('.after #del').on('click',function(){
			$(this).parent().next().remove()
			$(this).parent().remove()
		})
		// 点击商品 数量  减 的事件
		$('.inputnum').on('click','.inputnum:first-child',function(){
			console.log(this)
		})
		// 点击商品数量 加 的事件 
		$('.inputnum').on('click','.inputnum:last-child',function(){
			$('')
		})
		
		
	})
})