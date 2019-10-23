

// 加入動畫效果
$(function() {
    $(".list-mv01").on("inview", function(s, i, t, n) {
        i ? $(this).stop().addClass("mv01") : $(this).stop().removeClass("mv01")
    })
    $(".list-mv02").on("inview", function(s, i, t, n) {
        i ? $(this).stop().addClass("mv02") : $(this).stop().removeClass("mv02")
    })
    $(".list-mv03").on("inview", function(s, i, t, n) {
        i ? $(this).stop().addClass("mv03") : $(this).stop().removeClass("mv03")
    })
})