(function($){
    function setDefaultSelectorLocation(){
        var activeLink = $("#woyaobanTab .nav-link.active");
        $(".selector").css({
            "left": activeLink.position().left + parseInt(activeLink.css('marginLeft'),10)+"px"
        });
    }

$(document).ready(function(){
    
    setDefaultSelectorLocation();
    $("#woyaobanTab .nav-link").on("click",function(e){
        e.preventDefault();
        //var activeWidth = $(this).innerWidth();
        var itemPos = $(this).position();
        $(".selector").css({
            "left":itemPos.left+ parseInt($(this).css('marginLeft'), 10) +"px",
            "top": itemPos.top + parseInt($(this).css('marginTop'), 10) + "px"
            //"width":activeWidth+"px"
        });
    })

});
})(jQuery);