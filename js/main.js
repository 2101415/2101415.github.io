let diffarray = ['かんたん', 'ふつう', 'むずかしい'];
let clocktimecode = 0;
// 難易度=diffarray[clocktimecode]:デフォルト難易度はかんたん
let clocktimearray = ['2000', '1000', '500'];
// オブジェクト出現周期=clocktimearray[clocktimeode]m秒
let resettime = ['1990', '990', '490'];

// let appearLag = clocktimearray[clocktimecode] - resettime[clocktimecode];

let characterarray = ['占い師', '人間', 'ミイラ', '家'];
let charactercode = 1;
// デフォルトキャラは人間
let imageLinks = ['./img/char_fortuneteller.png', './img/char_human.png', './img/char_mummy.png', './img/char_house.png'];
let descriptions = [
    'キャラクター説明:　趣味で占いをやっている。本人曰く数秒先が水晶の導きでわかるという（回避できるかは謎）。',
    'キャラクター説明:　ごく一般的な大学生。手銃で鳥を狙うのが最近のトレンド。',
    'キャラクター説明:　年齢不詳のミイラ。片方の目が隠れているため、目が悪い＆距離感を掴みにくいことに悩んでいる。',
    'キャラクター説明:　家(動かすのは大変だよね）。',
];
let uniqueSkills = [
    'キャラ特性： ❤️X２/爆破直前の列に水晶の導きが出現',
    'キャラ特性： ❤️X６/最上段に鳩が出現',
    'キャラ特性： ❤️X５/最上段の鳩のみ出現/5mおきにライフが一回復(青天井式)',
    'キャラ特性： ❤️X１０/操作にラグが発生'];
let currentCharacterLocation;

let tips = ['　意外なキャラクターが得意だったりするかも？', '　指の位置とプレイヤーの位置を連動して覚えると操作ミスが減るかも？', '難しいと感じたら占い師で練習してみよう', '　爆発場所ではなく安全地帯を覚えて進んでみよう', '　実は爆発の当たり判定は爆発する瞬間のみ']
let charTips = ['　水晶で練習ができたら、！に集中して他キャラに挑戦してみよう', '　実は鳥はあまり役にたたない', '　回復を生かして時にはダメージを甘んじることもできるかも？', '　ラグを考慮して一発で行きたい場所に移動できるように練習しよう']
// 状況判断の定義
// ゲームは未開始
let isGameStarted = false;
// 反復を司るシステムの定義
let gameInterval;


// 各エフェクトの定義
let random;
let randomInt;
let randomnumbers = [];

// プレイヤー初期位置は真ん中
let playerLocation = 2;
let countDistance = 0;

let explocation;

// 画像データの格納
let birdImage = '<img src="./img/bird.png" width="150" height="150">';
let exclamationImage = '<img src="./img/mark_exclamation.png" width="150" height="150">';
let quartzImage = '<img src="./img/quartz.png" width="150" height="150">';
let explosionImage = '<img src="./img/bakuhatsu.png" width="150" height="150">';

// ダメージ判定
let bombArea1;
let bombArea2;
let maxLifeArray = ['2', '6', '5', '10'];
let characterLivesMultiArray = [
    ['❤️❤️', '❤️♡', '♡♡'],
    ['❤️❤️❤️❤️❤️❤️', '❤️❤️❤️❤️❤️♡', '❤️❤️❤️❤️♡♡', '❤️❤️❤️♡♡♡', '❤️❤️♡♡♡♡♡', '❤️♡♡♡♡♡', '♡♡♡♡♡♡'],
    ['❤️❤️❤️❤️❤️', '❤️❤️❤️❤️♡', '❤️❤️❤️♡♡', '❤️❤️♡♡♡', '❤️♡♡♡♡', '♡♡♡♡♡'],
    ['❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️', '❤️❤️❤️❤️❤️❤️❤️❤️❤️♡', '❤️❤️❤️❤️❤️❤️❤️❤️❤️♡♡', '❤️❤️❤️❤️❤️❤️❤️♡♡♡', '❤️❤️❤️❤️❤️❤️♡♡♡♡', '❤️❤️❤️❤️❤️♡♡♡♡♡', '❤️❤️❤️❤️♡♡♡♡♡♡', '❤️❤️❤️♡♡♡♡♡♡♡', '❤️❤️♡♡♡♡♡♡♡♡', '❤️♡♡♡♡♡♡♡♡♡♡♡', '♡♡♡♡♡♡♡♡♡♡♡♡']
]

// ライフ・ダメージカウント
let countDamage = 0;
let currentLife;


// 初期状態のトグル設定
$('.defaultToggled').next().slideToggle();




// リセットボタン
function resetbutton() {
    location.reload();
}


// clocktimearray[clocktimecode]


// キャラ設定・連動データの反映
function Select(setting) {
    charactercode = setting;
    console.log('キャラは' + characterarray[charactercode] + 'です');
    console.log(charactercode);


    $('#characterImage').html('<img src="' + `${imageLinks[charactercode]}` + '" width="300px" height="300px">');
    $('#charName').html('キャラクター名：' + `${characterarray[charactercode]}`);
    $('#charDescription').html(`${descriptions[charactercode]}`);
    $('#uniqueSkill').html(`${uniqueSkills[charactercode]}`);
    currentCharacterLocation = '<img src="' + `${imageLinks[charactercode]}` + '" width="150px" height="150px">';

    $('#charset').html('キャラクター「' + `${characterarray[charactercode]}` + '」で');

    $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
    $('#lifeCounter').html(characterLivesMultiArray[charactercode][countDamage]);



    // ``を見つけるのが大変だった
};

// 難易度設定
function difficulty(diff) {
    clocktimecode = diff;

    $('#diffsets').text('難易度「' + diffarray[diff] + '」　　&');

    console.log('はんぷく時間は' + clocktimearray[diff] + 'msです')
    console.log('反復時間コードは' + clocktimecode + 'です');
    // キャラ設定の確認
    console.log('キャラは' + characterarray[charactercode]);

}





function gamestart() {
    // 複数クリックの防止
    if (isGameStarted === true) {
        return false;
    }
    isGameStarted = true;
    // 最大ライフの定義
    let maxLife = maxLifeArray[charactercode];
    console.log('maxlifeは' + maxLife);
    $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');






    gameInterval = window.setInterval(function () {

        $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
        // 距離カウンター
        if (countDistance === 0) {
            countDistance++;
        }


        // console.log('キャラクターコードは' + charactercode);
        let random = (Math.random() * 10);
        let lineTop = Math.floor(random);

        // 生成した乱数の格納・距離の加算
        randomnumbers.push(lineTop);
        console.log(randomnumbers);
        countDistance++;

        // console.log('格納されている変数の数は:' + randomnumbers.length);

        // 初期値の定義
        if (charactercode === 2 && countDistance % 5 === 0) {
            countDamage--;
        };
        if (charactercode === 2 && countDamage < 0) { $('#lifeCounter').text('❤️❤️❤️❤️❤️+') };
        currentLife = maxLifeArray[charactercode] - countDamage;
        console.log('現在の距離は' + countDistance + 'mです');
        $('#distanceCounter').text('現在の距離は:' + countDistance);

        // 最上段の設定(キャラ設定が人間・ミイラの時のみ有効)
        if (charactercode === 1 || charactercode === 2) {
            if (lineTop === 0 || lineTop === 5 || lineTop === 10) {
                $('.bird1').html(birdImage);
            }
            else if (lineTop === 1 || lineTop === 9) {
                $('.bird2').html(birdImage);
            }
            else if (lineTop === 2 || lineTop === 8) {
                $('.bird3').html(birdImage);
            }
            else if (lineTop === 3 || lineTop === 7) {
                $('.bird4').html(birdImage);
            }
            else if (lineTop === 4 || lineTop === 6) {
                $('.bird5').html(birdImage);
            }
            $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');

        }

        // 二列目の設定(キャラ設定がミイラの時のみこの関数をスキップ)
        if (randomnumbers.length >= 2 && charactercode === 0 || charactercode === 1 || charactercode === 3) {

            let lineSecond = randomnumbers[randomnumbers.length - 2];
            // console.log(lineSecond);
            if (lineSecond === 0 || lineSecond === 5 || lineSecond === 10) {

                $('.change1').html(exclamationImage);
            }
            else if (lineSecond === 1 || lineSecond === 9) {

                $('.change2').html(exclamationImage);
            }
            else if (lineSecond === 2 || lineSecond === 8) {

                $('.change3').html(exclamationImage);

            }
            else if (lineSecond === 3 || lineSecond === 7) {

                $('.change4').html(exclamationImage);
            }
            else if (lineSecond === 4 || lineSecond === 6) {

                $('.change5').html(exclamationImage);
            }
            $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
        }

        // 三列目の設定（キャラ設定が占い師の時のみ有効）
        if (randomnumbers.length >= 3 && charactercode === 0) {
            let lineThird = randomnumbers[randomnumbers.length - 3];
            // console.log(lineThird);
            if (lineThird === 0 || lineThird === 5 || lineThird === 10) {
                $('.quartz1').html(quartzImage);
            }
            else if (lineThird === 1 || lineThird === 9) {
                $('.quartz2').html(quartzImage);
            }
            else if (lineThird === 2 || lineThird === 8) {
                $('.quartz3').html(quartzImage);
            }
            else if (lineThird === 3 || lineThird === 7) {
                $('.quartz4').html(quartzImage);
            }
            else if (lineThird === 4 || lineThird === 6) {
                $('.quartz5').html(quartzImage);
            }
            $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
        }

        // デバッグ用水晶出現コード（開発者チート）
        // if (randomnumbers.length >= 3) {
        //     let lineThird = randomnumbers[randomnumbers.length - 3];
        //     // console.log(lineThird);
        //     if (lineThird === 0 || lineThird === 5 || lineThird === 10) {
        //         $('.quartz1').html(quartzImage);
        //     }
        //     else if (lineThird === 1 || lineThird === 9) {
        //         $('.quartz2').html(quartzImage);
        //     }
        //     else if (lineThird === 2 || lineThird === 8) {
        //         $('.quartz3').html(quartzImage);
        //     }
        //     else if (lineThird === 3 || lineThird === 7) {
        //         $('.quartz4').html(quartzImage);
        //     }
        //     else if (lineThird === 4 || lineThird === 6) {
        //         $('.quartz5').html(quartzImage);
        //     }
        //     $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
        // }

        // 四列目の設定
        if (randomnumbers.length >= 4) {
            console.log('参照する数は: ' + randomnumbers[randomnumbers.length - 4]);
            let explocation = randomnumbers[randomnumbers.length - 4];


            if (explocation === 0 || explocation === 5 || explocation === 10) {
                $('.explode1').html(explosionImage);
                bombArea1 = 3;
                bombArea2 = 5;
            }
            else if (explocation === 1 || explocation === 9) {
                $('.explode2').html(explosionImage);
                bombArea1 = 1;
                bombArea2 = 3;
            }
            else if (explocation === 2 || explocation === 8) {
                $('.explode3').html(explosionImage);
                bombArea1 = 2;
                bombArea2 = 4;
            }
            else if (explocation === 3 || explocation === 7) {
                $('.explode4').html(explosionImage);
                bombArea1 = 1;
                bombArea2 = 4;
            }
            else if (explocation === 4 || explocation === 6) {
                $('.explode5').html(explosionImage);
                bombArea1 = 2;
                bombArea2 = 5;

            }

            if (playerLocation === bombArea1 || playerLocation === bombArea2) {
                countDamage++;
                currentLife = maxLifeArray[charactercode] - countDamage;
                console.log('１ダメージ！現在のライフは' + currentLife);
                // console.log(characterLivesMultiArray[charactercode][countDamage]); 
                // ライフカウンターへの反映





            }
            $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
            $('#lifeCounter').html(characterLivesMultiArray[charactercode][countDamage]);

        }

        // 各エフェクトの定期初期化
        window.setTimeout(function () {
            // 各種エフェクトの定期初期化　
            $('.skyArea').empty();
            $('.exclamation').empty();
            $('.predictArea').empty();
            $('.grass').empty();



        }, resettime[clocktimecode]);

        // ゲームオーバー判定
        // console.log('③' + currentLife);

        if (currentLife === 0) {

            // 各データの初期化
            countDamage = 0;
            countDistance = 0;
            currentLife = maxLife;

            clearInterval(gameInterval);

            isGameStarted = false;
            randomnumbers.length = 0;

            $('#lifeCounter').html(characterLivesMultiArray[charactercode][countDamage]);
            setTimeout(function () {
                alert('残念!ゲームオーバー！\n' + 'Tip:' + `${tips[playerLocation - 1]}` + '\nCharacter Tip:' + `${charTips[charactercode]}`);
            }, 100);
            return false;
        }



    }, clocktimearray[clocktimecode]);


}




// プレイヤー操作
document.addEventListener('keydown', function (event) {

    function playerControl() {
        if (['KeyA', 'KeyS', 'KeyD', 'KeyK', 'KeyO'].includes(event.code)) {
            $('.grass').removeClass('charLocation');

            if (event.code === 'KeyA') {
                // console.log('A');
                $('#pressA').addClass('charLocation');
                playerLocation = 1;

            } else if (event.code === 'KeyS') {
                // console.log('S');
                $('#pressS').addClass('charLocation');
                playerLocation = 2;

            } else if (event.code === 'KeyD') {
                // console.log('D');
                $('#pressD').addClass('charLocation');
                playerLocation = 3;

            } else if (event.code === 'KeyK') {
                // console.log('K');
                $('#pressK').addClass('charLocation');
                playerLocation = 4;
            } else if (event.code === 'KeyO') {
                // console.log('O');
                $('#pressO').addClass('charLocation');
                playerLocation = 5;
            }
            $('.grass').empty();
            $('.charLocation').html('<img src="' + `${imageLinks[charactercode]}` + '" width="120px" height="120px">');
        }
        else {
            console.log('そのキーは対象外');
        }
    }

    // キャラクターが家の時ラグを発生
    if (charactercode === 3) {
        window.setTimeout(playerControl, 200)
    }
    else {
        playerControl();
    }
}, false);



$('h2').on('click', function(){
    $(this).next().slideToggle();
    // $('rotate0').rotate(180);
});