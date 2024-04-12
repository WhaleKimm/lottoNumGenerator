function drawcolor(){
    var number = document.getElementsByClassName("lottocircle");
    for (var i = 0 ; i < number.length ; i++) {
        if(parseInt(number[i].textContent)>=40){
            number[i].style="background-color:#000";
        }else if(parseInt(number[i].textContent)>=30){
            number[i].style="background-color:#ea4c89";
        }else if(parseInt(number[i].textContent)>=20){
            number[i].style="background-color:#0057ff";
        }else if(parseInt(number[i].textContent)>=10){
            number[i].style="background-color:#32c766"; 
        }   
        else{
            number[i].style="background-color:#f48024";  
        } 
    }
}
function randomlottoNumber () {
    var lotto = [];
    var cnt = 0;
    var flag = true;
    while (cnt < 6) {
        var number = 0; 
        number = parseInt(Math.random() * 45) + 1; 
        for (var i = 0; i < cnt; i++) { 
            if (lotto[i] == number) {
                flag = false;
            }
        }
        if (flag==true) { 
            lotto[cnt] = number; 
            cnt++;
        }
        flag = true; 
    }
    sort_lotto = lotto.sort(function (a,b){ return a-b; });
    return sort_lotto;
}
function milli() {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve('resolved');
        }, 100);
    });
}

async function adddiv(j){
    $('#div').empty();
    // Reset the padding-bottom to remove the additional space
    $('body').css('padding-bottom', '0');
    // Hide the footer
    $('.footer').hide();
    // Hide the redraw button initially
    $('#redraw-button').hide();

    // Add a redraw button to redraw the numbers
    $('#redraw-button').click(function(){ 
        var num = $('.numberdiv').length;
        $('.numberdiv').remove();
        adddiv(num);
    });

    for(i=0;i<j;i++)
    {   
        await milli();
        lottoarray = randomlottoNumber();
        $('#div').append($('<div class="numberdiv"><div class="top-div"><div class="top-div-name">'+(i+1)+'번째 오늘의번호</div></div><div class="numberset"><div class="lottocircle"><p class="value">'+lottoarray[0]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[1]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[2]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[3]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[4]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[5]+'</p></div></div></div>'));
        drawcolor();

        window.scrollTo(0,document.body.scrollHeight);
    }
    if (j >= 5 && j < 10) {
        var additionalSpace = 300; // Additional space in pixels for 5개
    }else if (j >= 10 && j < 15) {
        var additionalSpace = 750; // Additional space in pixels for 5개
    } else if (j >= 15 && j < 20) {
        var additionalSpace = 1250; // Additional space in pixels for 10개
    } else if (j >= 20) {
        var additionalSpace = 1750; // Additional space in pixels for 20개
    }
    
    // Add additional space below the main content
    $('body').css('padding-bottom', additionalSpace + 'px');
    
    // Show the redraw button after generating numbers
    $('#redraw-button').show();
    // Show the footer after generating numbers
    $('.footer').show();
}

$(document).ready(function(){
    // Hide the redraw button initially
    $('#redraw-button').hide();
    // Clear the previous numbers
    
    $('#option1').click(function(){ 
        $("#app-cover").hide();
        adddiv(1);
    });
    $('#option5').click(function(){ 
        $("#app-cover").hide(); 
        adddiv(5);
    });
    $('#option10').click(function(){ 
        $("#app-cover").hide(); 
        adddiv(10);
    });
    $('#option15').click(function(){ 
        $("#app-cover").hide(); 
        adddiv(15);
    });
    $('#option20').click(function(){ 
        $("#app-cover").hide(); 
        adddiv(20); 
    });
    
});

