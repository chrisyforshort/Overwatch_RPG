$(document).ready(function () {

    // Global Variables //
    var chosenHero
    var chosenEnemy
    var isHeroChosen
    var isEnemyChosen
    var isHeroAlive
    var isEnemyAlive

    // Character Attributes //
    var charArr = [
        {
            name: 'reaper',
            health: 200,
            attack: 25,
            image: 'assets/images/reaper_chibi.png',
            counter: 25,
            sound: 'assets/audio/backfrom.mp3',
        },

        {
            name: 'soldier 76',
            health: 210,
            attack: 19,
            image: 'assets/images/soldier76.png',
            counter: 28,
            sound: 'assets/audio/wereallsoldiers.mp3',
        },
        {
            name: 'dva',
            health: 300,
            attack: 16,
            image: 'assets/images/Chibi_D.va.png',
            counter: 20,
            sound: 'assets/audio/winkyface.mp3',
        },
        {
            name: 'genji',
            health: 250,
            attack: 18,
            image: 'assets/images/genji_chibi.png',
            counter: 30,
            sound: 'assets/audio/genjiis.mp3',
        },
    ]

    // Game starts //
    function initGame() {
        $("#restartBTN").hide()
        isHeroChosen = false
        isEnemyChosen = false
        let newHero = new Audio('assets/audio/newhero.mp3')
        newHero.play()
        // Brings list of character to screen //
        for (var i = 0; i < charArr.length; i++) {
            var num = Math.floor(12 / charArr.length)
            var charThing = $("<div class='myChar col-md-" + num + "' value='" + i + "'><p id='select'>Select</p><img src='" + charArr[i].image + "' style='width:150px;height:150px;'</div>")
            $("#characters").append(charThing)
        }
    }

    // Selecting hero and enemy //
    $(document).on("click", ".myChar", function () {
        if (isHeroChosen == false) {
            chosenHero = charArr[$(this).attr("value")]
            $(this).addClass("fader")
            var heroSound = new Audio(chosenHero.sound);
            heroSound.play();
            isHeroChosen = true
            var myHeroThing = $("<div id='" + chosenHero.name + "' ><img src='" + chosenHero.image + "'style='width:200px;height:200px;'/><p>"
                + chosenHero.name + "</p><p>HP</p><p id='heroHealth'>" + chosenHero.health + "</p></div>")
            $("#myHero").html(myHeroThing)
        }
        else if (isEnemyChosen == false && chosenHero.name != charArr[$(this).attr("value")].name) {
            chosenEnemy = charArr[$(this).attr("value")]
            $(this).addClass("fader")
            var enemySound = new Audio(chosenEnemy.sound);
            enemySound.play();
            isEnemyChosen = true
            var myEnemyThing = $("<div id='" + chosenEnemy.name + "' ><img src='" + chosenEnemy.image + "'style='width:200px;height:200px;'/><p>"
                + chosenEnemy.name + "</p><p>HP</p><p id='enemyHealth'>" + chosenEnemy.health + "</p></div>")
            $("#myEnemy").html(myEnemyThing)
        }
        else if (isHeroChosen == true && isEnemyChosen == true) {
            $(".myBattleRow").html("<p id='words'>Click the 'Attack' button to continue ...")
        }
    })

    // Attack Button //
    $("#attackBTN").on("click", function(){
        if (isHeroChosen == false || isEnemyChosen == false) {
            $(".myBattleRow").html("<p id='words'>Please choose your Hero or Enemy first")
        }
        if (isHeroChosen == true && isEnemyChosen == true) {
            $("#characters").hide()
            $(".myBattleRow").empty()
            var num1 = Math.floor(Math.random()*chosenEnemy.attack)
            var num2 = Math.floor(Math.random()*chosenHero.attack)
            // var num2 = chosenHero.counter
            chosenEnemy.health -= num1
            $("#enemyHealth").text(chosenEnemy.health)
            $(".myBattleRow").html("<p id='words'>" + chosenHero.name + " attacked " + chosenEnemy.name + " for " + num1 + " points! </p>")
            chosenHero.health -= num2
            $("#heroHealth").text(chosenHero.health)
            $(".myBattleRow").append("<p id='words'>" + chosenEnemy.name + " attacked " + chosenHero.name + " for " + num2 + " points! </p>")
                if (chosenEnemy.health <= 0) {
                    $(".myBattleRow").html("<p id='wordsVic'> Victory! Choose your new Enemy.</p>")
                    let victory = new Audio('assets/audio/victory.mp3')
                    victory.play()
                    isEnemyChosen = false
                    $(chosenEnemy).hide()
                    $("#characters").show()
                    chosenHero.attack*20
                }
                else if (chosenHero.health <= 0) {
                    $(chosenHero).hide()
                    $(".myBattleRow").html("<p id='wordsDef'> You have been defeated! Try again.</p>")
                    let defeat = new Audio('assets/audio/defeat.mp3')
                    defeat.play()
                    $("#restartBTN").show()
                }
        }
    })
    
    // Reset function //
    function reset() {
        $("#characters").empty()
        $("#myChar").empty()
        $("#myHero").empty()
        $("#myEnemy").empty()
        $(".myBattleRow").empty()
        }


    // Reset values //
    function resetValue() {
    isHeroChosen = ""
    isEnemyChosen = ""
    chosenHero = ""
    chosenEnemy = ""
    isHeroAlive = true
    isEnemyAlive = true
    charArr = [
        {
            name: 'reaper',
            health: 200,
            attack: 25,
            image: "assets/images/reaper_chibi.png",
            counter: 25,
            sound: 'assets/audio/backfrom.mp3',
        },

        {
            name: 'soldier 76',
            health: 200,
            attack: 19,
            image: "assets/images/soldier76.png",
            counter: 28,
            sound: 'assets/audio/wereallsoldiers.mp3',
        },
        {
            name: 'dva',
            health: 350,
            attack: 16,
            image: "assets/images/Chibi_D.va.png",
            counter: 20,
            sound: 'assets/audio/winkyface.mp3',
        },
        {
            name: 'genji',
            health: 250,
            attack: 18,
            image: "assets/images/genji_chibi.png",
            counter: 30,
            sound: 'assets/audio/genjiis.mp3',
        },
    ]
    }

    // When you click the Restart Button it starts all the reset functions //
    $(document).on("click", "#restartBTN", function(){
        reset()
        resetValue()
        initGame()
        $("#characters").show()
        $("#restartBTN").hide()
    });

    // Calling the game to start //
    initGame()

})