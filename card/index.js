$(document).ready(function() {
	var $shopchecked = $('.shop-header .checked'); // 店铺
	var $goodchecked = $('.good .checked'); // 商品点击
	// 店铺点击
	$shopchecked.click(function() {
		var $this = $(this);
		var checked = $this.hasClass('select');
		shopClickFun($this, checked);
		checkedAll();
	});
	// 商品点击
	$goodchecked.click(function() {
		var status = $(this).hasClass('select');
		var $shopchecked = $(this).parents('.shop').find('.shop-header').find('.checked');
		var $goodlist = $(this).parents('.shoplist').find('.good');
		if (status) {
			$(this).removeClass('select');
		} else {
			$(this).addClass('select');
		}
		var checked = true;
		$goodlist.each(function() {
			var statusPrev = $(this).find('.checked').hasClass('select');
			if (!statusPrev) {
				checked = statusPrev;
			}
		});
		if (checked) {
			$shopchecked.addClass('select');
		} else {
			$shopchecked.removeClass('select');
		}
		toalPrice(); // 计算总价
	});
	$('.num span').click(function() {
		var state = Number($(this).attr('state'));
		var num = Number($(this).siblings('input').val());
		num = num + state > 1 ? num + state : 1; // 等价于下面注释 双比目运算
		// if (num + state > 1) {
		// 	num = num + state;
		// } else {
		// 	num = 1;
		// }
		$(this).siblings('input').val(num);
		toalPrice();
	});
	// 点击全部选中按钮
	$('footer .checked').click(function() {
		allShop();
	});
	function allShop() {
		var $allbtn = $('footer .checked');
		var checked = $allbtn.hasClass('select');
		$('.warp .shop').each(function() {
			var $this = $(this).find('.shop-header .checked');
			var selectChecked = $this.hasClass('select');
			shopClickFun($this, checked, function(state) {});
		});
		if (!checked) {
			$allbtn.addClass('select');
		} else {
			$allbtn.removeClass('select');
		}
	}
	// 计算总价
	function toalPrice() {
		var toal = 0;
		var $shop = $('.shop');
		$shop.find('.good').each(function() {
			var checked = $(this).find('.checked').hasClass('select');
			if (checked) {
				toal +=
					Number($(this).find('input').val()) *
					Number($(this).find('input').attr('price'));
			}
		});
		$('.price-num span').text(toal);
	}

	// 店铺点击
	function shopClickFun($this, checked) {
		var $goodlist = $this.parents('.shop').find('.good');
		var checkedStatus = true;
		if (checked) {
			$this.removeClass('select');
		} else {
			$this.addClass('select');
		}
		$goodlist.each(function() {
			var $statusPrev = $(this).find('.checked');
			if (checked) {
				$statusPrev.removeClass('select');
			} else {
				$statusPrev.addClass('select');
			}
		});
		toalPrice(); // 计算总价
		checkedAll();
	}
	// 检查是否全选
	function checkedAll() {
		var checkedAll = true;
		$('.warp .shop').each(function() {
			var checked = $(this).find('.shop-header .checked').hasClass('select');
			if (!checked) {
				checkedAll = !checkedAll;
			}
		});
		if (checkedAll) {
			$('footer .checked').addClass('select');
		} else {
			$('footer .checked').removeClass('select');
		}
	}
});
