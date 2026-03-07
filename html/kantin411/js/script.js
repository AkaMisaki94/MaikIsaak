//---------Order-Shopping-cart----------


$(document).ready(function(){
	update_amounts();
	$('.quantity, price').on('keyup keypress blur change',function(e) {
		update_amounts();
	});
});

function update_amounts(){
	var sum = 0.0;
	$('.table > tbody > tr').each(function() {
		var qty = $(this).find('.quantity').val();
		var price = $(this).find('.price').val();
		var amount = (qty*price)
		sum+=amount;
		$(this).find('.amount').text(''+amount);
	});
	$('.total').text(sum);
}


//----------Order-quantity-----------


var incrementQty;
var decrementQty;
var plusBtn = $(".plus");
var minusBtn = $(".minus");
var incrementQty = plusBtn.click(function() {
	var $n = $(this).parent(".button-container").find(".quantity");
	$n.val(Number($n.val())+1 );
	update_amounts();
});

var decrementQty = minusBtn.click(function(){
	var $n = $(this).parent(".button-container").find(".quantity");
	var QtyVal = Number($n.val());
	if (QtyVal > 0) {
		$n.val(QtyVal-1);
	}
	update_amounts();
});


//--------- Scroll Up Action --------


$(function(){
	$('a[href*="#"]').click(function() {
		if (location.pathname.replace(/^\//,") == this.pathname.replace(/^\//,")
			&& location.hostname == this.hostname) {
			var $target = $(this.hash);
		$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
		if ($target.length) {
			var targetOffset = $target.offset().top;
			$('html,body').animate({scrollTop: targetOffset}, 1000);
			return false;
			}
		}
	});
});

$('.toggle-menu').click(function(){
	$('.main-header').toggleClass('menu-open');
});