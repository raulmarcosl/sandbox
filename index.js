$(document).ready(function () 
{
    $('.letter').keyup(function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        if (/^[a-zA-Z0-9]+$/.test($(this).val())) {
            $(this).next().focus();
        }

        var letter1 = $('#letter1').val().toUpperCase();
        var letter2 = $('#letter2').val().toUpperCase();
        var letter3 = $('#letter3').val().toUpperCase();
        var letter4 = $('#letter4').val().toUpperCase();
        // var letter5 = $('#letter5').val();

        if (letter1 && letter2 && letter3 && letter4) {
            if (letter1 == 'A' && letter2 == 'R' && letter3 == 'T' && letter4 == '1') {
                $('input.letter').css('border-bottom', 'solid #a0fa98 5px');

                setTimeout(function(){
                    location.href = 'art1.html';
                }, 700);
            } else if (letter1 == 'A' && letter2 == 'R' && letter3 == 'T' && letter4 == '2') {
                $('input.letter').css('border-bottom', 'solid #a0fa98 5px');

                setTimeout(function(){
                    location.href = 'art2.html';    
                }, 700);
            } else {
                $('input.letter').css('border-bottom', 'solid #f57a7a 5px');
            }    
        }
    });
});