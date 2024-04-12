var except_number = [];
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
            if(except_number.indexOf(number)<0){
                lotto[cnt] = number; 
                cnt++;
            }
        }
        flag = true; 
    }
    sort_lotto = lotto.sort(function (a,b){ return a-b; });
    return sort_lotto;
}
function check_count(j){
    if(except_number.indexOf(j)<0){
        except_number.push(j);
    }
    else{
        except_number.remove(j);
    }
}
function milli() {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve('resolved');
        }, 100);
    });
}

$(document).ready(function(){
    var except_number;
    // Function to add redraw button at the top
    function addRedrawButtonAtTop() {
        var redrawButton = $('<button id="redraw-button-semiauto">다시 뽑기</button>');
        
        redrawButton.click(function() {
            var count = parseInt($('.numberdiv').length);
            adddiv(count);
        });
        $('.main').prepend(redrawButton); // Prepend redraw button to the main div
        $('#redraw-button-semiauto').hide();
    }

    // Function to add numbers to the screen
    async function adddiv(j){
        $('#div').empty();
        $('body').css('padding-bottom', '0');
        $('.footer').hide();
        $('#redraw-button-semiauto').hide();
        for(i=0;i<j;i++) {   
            await milli();
            lottoarray = randomlottoNumber();
            $('#div').append($('<div class="numberdiv"><div class="top-div"><div class="top-div-name">'+(i+1)+'번째 오늘의번호</div></div><div class="numberset"><div class="lottocircle"><p class="value">'+lottoarray[0]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[1]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[2]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[3]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[4]+'</p></div><div class="lottocircle"><p class="value">'+lottoarray[5]+'</p></div></div></div>'));
            drawcolor();
        }
        // Determine additional space based on the number of generated numbers
        var additionalSpace = 0;
        if (j >= 10 && j < 15) {
            additionalSpace = 250;
        } else if (j >= 15 && j < 20) {
            additionalSpace = 750;
        } else if (j >= 20) {
            additionalSpace = 1250;
        }
        $('body').css('padding-bottom', additionalSpace + 'px');
        
        $('#redraw-button-semiauto').show();
        $('.footer').show();
    }

    // Event handler for option clicks
    $('#option1').click(function(){ 
        $("#checkselect").hide();
        adddiv(1);
    });
    $('#option5').click(function(){ 
        $("#checkselect").hide(); 
        adddiv(5);
    });
    $('#option10').click(function(){ 
        $("#checkselect").hide();
        adddiv(10);
    });
    $('#option15').click(function(){ 
        $("#checkselect").hide();
        adddiv(15);
    });
    $('#option20').click(function(){ 
        $("#checkselect").hide(); 
        adddiv(20);
    });

    // Add redraw button at the top when the document is ready
    addRedrawButtonAtTop();
});