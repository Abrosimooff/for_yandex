var Arr_Nominal = new Array('2','3','4','5','6','7','8','9','10','B','D','K','T')
var Arr_Mast = new Array('K','P','H','B')// Крсти Пики Черви Буби
var Arr_Koloda = new Array() // Сформированная колода
var Arr_Players = new Array()// Массив объектов-игроков
var Arr_Table = new Array()// карты что сейчас на столе
var Arr_Kopilka = new Array() // Массив для складывания карт при ничье
var standoff =  false// Флаг ничьи
var auto_play = false
for (var iter = 0; iter < Arr_Nominal.length ; iter++)
{
    for (var i = 0; i < Arr_Mast.length ; i++)
    {
       Arr_Koloda.push( Arr_Nominal[iter] + Arr_Mast[i] )
    }
}// Колода Готова

// Тусовка Колоды
function tusovka()
{
    return Arr_Koloda.sort( function()
                            { return Math.random() - Math.random() }
                          )
}

// Задать количество Игроков
function set_count_player(count){
    for (var i = 0; i < count; i++)
    { player = new Object()
        player.koloda = new Array()
        player.loser = false
        player.my_step = false
        if (i == 0) player.my_step = true

        player.put = function()
        { // Положить карту на стол
            $('#pole_play').append('<img src="koloda/'+this.koloda[0]+'.jpg">')
            Arr_Table.push(this.koloda[0])
            this.koloda.shift()
        }
        player.put_face_down = function() {
            // Положить карту рубашкой вверх
            if (this.koloda.length >2)
            {
                $('#pole_play').append('<img src="koloda/RUB.jpg"><img src="koloda/'+this.koloda[1]+'.jpg">')
                Arr_Kopilka.push(this.koloda[0])
                Arr_Table.push(this.koloda[1])
                this.koloda.shift()
                this.koloda.shift()
            }
            if (this.koloda.length == 2)
            {
                $('#pole_play').append('<img src="koloda/RUB.jpg"><img src="koloda/'+this.koloda[1]+'.jpg">')
                Arr_Kopilka.push(this.koloda[0])
                Arr_Table.push(this.koloda[1])
                this.koloda.shift()
                this.koloda.shift()
                this.loser=true
            }
            if (this.koloda.length == 1)
            {
                $('#pole_play').append('<img src="koloda/RUB.jpg">')
                Arr_Kopilka.push(this.koloda[0])
                this.koloda.shift()
                this.loser=true
            }

        }
        player.take = function(koloda){
            // Забрать себе
            for (var i = 0; i< koloda.length; i++ )
            {
                this.koloda.push(koloda[i])
            }

        }

        Arr_Players.push(player)
    }
    //alert($('#viewer').attr('checked'))
    if ($('#viewer').prop("checked"))
        {auto_play = true}
    if (auto_play)
    {
        $('#controls span:first, #viewer').hide();
        $('#controls').css('height', '50px')
        $('.mini-button').hide();
        game_start()
    }
    else
    {
        $('#controls span:first, #viewer').hide();
        $('#controls').css('height', '80px')
    }

    $('.mini-button').remove();
    $('span').html('Осталось только раздать карты ;)');
    $('#controls').append('<button class="mini-button" onclick="razdat()"> Раздать колоду</button>')
    if (auto_play) $('#controls button').hide()


}

function razdat(){

    New_koloda = tusovka()
    for (var i = 0; i< Arr_Players.length; i++)
    {
        for (iter = i; iter < New_koloda.length; iter=iter+Arr_Players.length)
        {
            Arr_Players[i].koloda.push(New_koloda[iter])
        }

    }

    for (var i = 0; i< Arr_Players.length; i++){
        player = i+1
        $('#play').append('<div id="pl_panel'+player+'" class="player_panel"><span>Игрок '+player+'</span><legend id="player'+i+'">'+Arr_Players[i].koloda.length+' карт</legend></div>')
        $('#play').css('bottom','0px')
    }

    $('.mini-button').remove();
    $('#controls span').html('Игра начата.');
    $('#controls').append('<button class="mini-button" onclick="step()">Сделать Ход</button>')
    if (auto_play) $('#controls button').hide()
}
function exit (player)
{   $('#controls').empty()
    $('#controls').append('<span>Поздравляем! Победу одержал Игрок '+player+'</span>')
    $('#controls').css('height','100%')

}
//////////////////////////////////////// ВЕС КАРТ /////////////////////////////
function get_Arr_weight(Arr)
{   var Arr_Weight = new Array
    for (var i =0; i < Arr.length;i++)
    {
        Arr_Weight.push(get_weight(Arr[i]))
    }
    return Arr_Weight
}
function get_weight(str)
{
    if (str.length == 3) return Number(10)
    else
      if (str.charAt(0) == 'T') return Number(11)
      else
        if (str.charAt(0) == 'B') return Number(2)
        else
          if (str.charAt(0) == 'D') return Number(3)
          else
          if (str.charAt(0) == 'K') return Number(4)
          else return Number(str.charAt(0))
}
//////////////////////////////////////////////////////////////////////////

// Функция все игроки делают ход
function step(){
    $('#controls span').html('Играем..')
    var no_loser_count = 0
    var id_happy
    for (var i = 0; i < Arr_Players.length; i++)
    {
        if (!Arr_Players[i].loser) {no_loser_count++; id_happy = i+1}
    }
    if (no_loser_count == 1) exit(id_happy)

    for (var k =0; k< Arr_Table.length;k++)
    {
        Arr_Kopilka.push(Arr_Table[k])
    }
    Arr_Table = []

    if (!standoff) // Если не ничья
    {
        for (var i = 0; i < Arr_Players.length; i++)
        {  var id = i+1
            if (Arr_Players[i].loser == false){  Arr_Players[i].put()   }
//            percent =Math.round (Arr_Players[i].koloda.length *100 / 52)
//           $('#pl_panel'+id+' legend').html(Arr_Players[i].koloda.length+' карт');
//            $('#pl_panel'+id+' div').remove();
//            $('#pl_panel'+id+' legend').after('<div title="Процент близости к победе" class="percent" >'+percent+'%</div>')
        }
    }
    else
    {
        for (var i = 0; i < Arr_Players.length; i++)
        {   var id = i+1
            if (Arr_Players[i].loser == false)
            {

                Arr_Players[i].put_face_down()
            }
            $('#pl_panel'+id+' legend').html(Arr_Players[i].koloda.length+' карт');
        }

    }
    $('#controls button').attr('onclick','sravni()');

}

// Функция сравнить карты
function sravni()
{
    indexs = new Array() // Массив игроков у которых максимальаня ничья
    var Arr_Weight = get_Arr_weight(Arr_Table) // Получаем массив с весом карт
    max = Math.max.apply({},Arr_Weight)

    for (var iter = 0; iter< Arr_Weight.length; iter++)
        {
            if (Arr_Weight[iter] == max) indexs.push(iter)
        }

    if (indexs.length == 1)
    {   standoff = false
    }

    else
    {   standoff = true // ничья
     }



    if (!standoff) // Если есть явный победитель
    {
        standoff = false
        finish_step(indexs[0])
        //$('#controls button').attr('onclick','finish_step('+indexs[0]+')');
    }
    else
    {
        standoff = true // Ничья
        $('#controls span').html('Ничья..продолжаем играть!')
        finish_step(-1)
        //$('#controls button').attr('onclick','finish_step(-1)');
    }

}

function finish_step(player_for_take)
{
    if (player_for_take != -1) // Если не ничья
    {  var k = 0
        for (i=0; i<Arr_Players.length;i++)
        {
            if (!Arr_Players[i].loser)
            {
                if ( k ==player_for_take)
                {
                    Arr_Players[i].take(Arr_Table)
                    Arr_Players[i].take(Arr_Kopilka)
                    Arr_Table =[]
                    Arr_Kopilka =[]

                    $('#pole_play img').each(function (i)
                    {
                        $(this).css({'width':'0px'})

                    })
                    setTimeout(function ()
                    {
                        $('#pole_play').empty()
                    },1000)
                    $('#controls span').html(i+1+' Игрок забирает карты.')
                }
                k++
            }

        }



        // Проверка не проиграл ли кто
        for (var i = 0; i < Arr_Players.length; i++)
        {   var id = i+1
            if (Arr_Players[i].koloda.length == 0) // Если проиграл
            {
                Arr_Players[i].loser = true;
                $('#pl_panel'+id).remove()

            }
            else
            $('#pl_panel'+id+' legend').html(Arr_Players[i].koloda.length+' карт');
            $('#pl_panel'+id+' div').remove();
            percent =Math.round (Arr_Players[i].koloda.length *100 / 52)
            $('#pl_panel'+id+' legend').after('<div title="Процент близости к победе" class="percent" >'+percent+'%</div>')

        }
    }

    else{
        $('#controls span').html('Ничья..продолжаем играть!')
    }

    $('#controls button').attr('onclick','step()');
}

function game_start()
{
    setTimeout(function () {

        $('button:first').click()
        game_start()

    }, 2000);

}
