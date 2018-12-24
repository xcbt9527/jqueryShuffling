$(document).ready(function() {
	var app = {
		init: function() {
			$.ajax({
				type: 'get', //jquey是不支持post方式跨域的
				async: false,
				url: 'https://api.douban.com/v2/book/user/119280372/collections', //跨域请求的URL
				dataType: 'jsonp',
				//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonp: 'callback',
				//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				jsonpCallback: 'success_jsonpCallback',
				//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
				success: function(result) {
					var collections = result.collections;
					var tpml = '';
					for (var i = 0; i < collections.length; i++) {
						// console.log(collections[i].book.author); // 这个是一个数组，要把这个数组转为string类型然后再展示出页面
						var author = collections[i].book.author.join(',');
						tpml +=
							' <div class="box">' +
							'<img src="' +
							collections[i].book.image +
							'" alt="">' +
							'<a class="title" href="#">' +
							collections[i].book.title +
							'</a>' +
							'<div class="author">' +
							author +
							'</div>' +
							'</div>';
					}
					$('.ajaxtpl').append(tpml);
				},
			});
		},
	};
	app.init(); //初始化
});
