$(document).ready(function () 
{
    $('.letter').keyup(function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        if (/^[a-zA-Z]+$/.test($(this).val())) {
            $(this).next().focus();
        }

        var letter1 = $('#letter1').val();
        var letter2 = $('#letter2').val();
        var letter3 = $('#letter3').val();
        var letter4 = $('#letter4').val();
        var letter5 = $('#letter5').val();

        if (letter1 && letter2 && letter3 && letter4 && letter5) {
            if (letter1 == 'S' && letter2 == 'N' && letter3 == 'D' && letter4 == 'B' && letter5 == 'X') {
                console.log($('input.letter'));
                $('input.letter').css('border-bottom', 'solid green 2px');
                $('input.letter').css('color', 'green');

                setTimeout(function(){
                    location.href = 'art.html';    
                }, 1000);
            } else {
                $('input.letter').css('border-bottom', 'solid red 2px');
                $('input.letter').css('color', 'red');
            }    
        }
    });
});