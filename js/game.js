// елементи нода $
var $start = document.querySelector('#start')
var $win = document.querySelector('#win')
var $btn = document.querySelectorAll('.num')
var $tablo = document.querySelector('.tablo')
var $time = document.querySelector('#time')
var $time2 = document.querySelector('#time2')
var $itogi = document.querySelector('#itogi')
var $fixblock = document.getElementById('fixblock')

var $numone = document.querySelector('#numone')
var $numtotal = document.querySelector('#numtotal')
var $vkm = document.querySelector('#vkm')
var score = 1
// для статистики
var $numpop3 = document.querySelector('#numpop3')
var $numone3 = document.querySelector('#numone3')
var $tablo3 = document.querySelector('#tablo3')
var $numtotal3 = document.querySelector('#numtotal3')
var $time3 = document.querySelector('#time3')
var $molodec = document.querySelector('#molodec')

function statistOk(){
    $numpop3.textContent = score++
    $numone3.textContent = $numone.textContent
    $tablo3.textContent = $vkm.textContent
    $numtotal3.textContent = $numtotal.textContent
    $time3.textContent = $time2.textContent
    $molodec.textContent = 'молодесь.'
    $itogi.insertAdjacentHTML('afterend', $itogi.textContent + '<br>')
}
function statistBad(){
    $numpop3.textContent = score++
    $numone3.textContent = $numone.textContent
    $tablo3.textContent = $vkm.textContent
    $numtotal3.textContent = $numtotal.textContent
    $time3.textContent = $time2.textContent
    $molodec.textContent = 'не в этот раз, вышло время.'
    $itogi.insertAdjacentHTML('afterend', $itogi.textContent + '<br>')
}
 
// значення за замовчуванням
var isGameStarted = false
$win.classList.add('hide')  


// обробник події на натискання
$start.addEventListener('click', startGame)
$win.addEventListener('click', winClose)

function winClose(){
    $win.classList.add('hide') 
    startGame()
}

// початок гри
function startGame() {
    isGameStarted = true
    keyb()
    var numone = getRandom(1, 200)
    var numtotal = getRandom(numone, numone + 100)
    $numone.textContent = numone
    $numtotal.textContent = numtotal
    $vkm.textContent = numtotal - numone
    $start.classList.add('hide')
    $time2.textContent = 0
    let ppp = 0
    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)
        var time2 = parseFloat($time2.textContent)
        
        if (time <= 0) {
            // end game
            statistBad()
            clearInterval(interval)
            $start.classList.remove('hide')
            $fixblock.classList.add('hide')
            endGame()
            $tablo.innerHTML = 0
            $time.textContent = 9.9
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
            $time2.textContent = (time2 + 0.1).toFixed(1)
            ppp = ppp - 4
            $fixblock.classList.remove('hide')
            $fixblock.style.top = ppp +'px'
            if (($tablo.innerHTML) === ($vkm.textContent)) {
                statistOk()
                clearInterval(interval);
                var audio = new Audio();
                audio.src = 'files/golos-knopka.mp3';
                $fixblock.classList.add('hide')
                winGame();
            } 
        }
    }, 100)
}

// натискання на клавіатуру
function keyb(){
    document.onkeypress = function (e) {
        if (!isGameStarted){
            return
        }
        if (e.keyCode < 48 || e.keyCode > 57) {
                audioClickDel()

                $tablo.innerHTML = $tablo.innerHTML.slice(0, -1)
                if ($tablo.innerHTML === '') {
                    $tablo.innerHTML = 0
                }                
        }
        else {
                $tablo.innerHTML = Number($tablo.innerHTML  + e.key)
                audioClick()
                if ($tablo.innerHTML > 999) {
                    $tablo.innerHTML = $tablo.innerHTML.slice(0, -1)
                }

                
            }
        return false;
    }
}

// КРАСАВА !!!
function winGame() {
    $win.classList.remove('hide') 
    var audio = new Audio();
        audio.src = 'files/golos-knopka.mp3';
        audio.autoplay = true;
        $tablo.innerHTML = 0
        $time.textContent = 9.9
        isGameStarted = false
}

// закінчення гри
function endGame() {
    isGameStarted = false
}

// звук для кнопок від 0 до 9
function audioClick(){
    var audio = new Audio();
    audio.src = 'files/computer-keyboard-button-press-release_m1pp3tnd.mp3';
    audio.autoplay = true;
}

// звук для кнопки DEL
function audioClickDel(){
    var audio = new Audio();
    audio.src = 'files/large-button-depress_z10ogpnd.mp3';
    audio.autoplay = true;
}


// натискання цифр на екрані
$btn.forEach(function(element) {
    element.onclick = function () {
        if (!isGameStarted){
            return
        }
        audioClick()
        $tablo.innerHTML = Number($tablo.innerHTML  + this.innerHTML);
        // this.classList.add('numhover')
        if ($tablo.innerHTML > 999) {
            $tablo.innerHTML = $tablo.innerHTML.slice(0, -1)
        }
    }
}
)

// натискання на DEL на екрані
document.querySelector('.num.ent').onclick = function () {
    audioClickDel()
    $tablo.innerHTML = $tablo.innerHTML.slice(0, -1)
    if ($tablo.innerHTML === '') {
        $tablo.innerHTML = 0
    }
}

// випадкові числа для полів додати і тотал
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

