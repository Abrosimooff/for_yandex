var Not_char = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_-+=|/"№;:?'
var Number_Not_char = 'йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm!@#$%^&*_+=|/"№;:?'



$(document).ready( function(){

    //alert($('textarea').length)
    $('#select_laerned').click( function(){
        $('ul').toggle('normal')
    });


    $('body').click(function(){
        $("input").each(function (i) {

            if ($(this).attr('name') == 'year_birth'){

                if ($(this).val().length > 0) {   // Если введено точно число
                    value = Number($(this).val())
                    if ( (value<=$(this).attr('max')) & (value>=$(this).attr('min')) ){
                        $(this).next('span').remove()
                        $(this).addClass('good')
                    }
                    else {
                        $(this).next('span').remove()
                        $(this).removeClass('good').after('<span class="error">Недопустимое значение</span>')
                    }

               }
                else{
                    $(this).next('span').remove()
                    $(this).removeClass('good')
                }

            }

            if ($(this).attr('name') == 'city'){
                var value =$(this).val()
                if (value.length > 0) {
                    var error = false
                    for ( var i = 0; i < $(this).val().length; i++){
                        for (var iter = 0; iter<Not_char.length; iter++){

                            if ( value.charAt(i) == Not_char[iter] ){
                                error = true
                                break
                            }
                        }

                    }
                    if (error){
                        $(this).next('span').remove()
                        $(this).removeClass('good').after('<span class="error">Недопустимое значение</span>')
                    }
                    else {
                        $(this).next('span').remove()
                        $(this).addClass('good')
                    }
                }

            }

            if ($(this).attr('name') == 'education_year'){

                if ($(this).val().length > 0) {   // Если введено точно число
                    value = Number($(this).val())
                    if ( (value<=$(this).attr('max')) & (value>=$(this).attr('min')) ){
                        $(this).next('span').remove()
                        $(this).addClass('good')
                    }
                    else {
                        $(this).next('span').remove()
                        $(this).removeClass('good').after('<span class="error">Недопустимое значение</span>')
                    }

                }
                else{
                    $(this).next('span').remove()
                    $(this).removeClass('good')
                }

            }
            if ($(this).attr('name') == 'name'){
                var value =$(this).val()
                if (value.length > 0) {
                    var error = false
                    for ( var i = 0; i < $(this).val().length; i++){
                        for (var iter = 0; iter<Not_char.length; iter++){

                            if ( value.charAt(i) == Not_char[iter] ){
                                error = true
                                break
                            }
                        }

                    }
                    if (error){
                        $(this).next('span').remove()
                        $(this).removeClass('good').after('<span class="error">Недопустимое значение</span>')
                    }
                    else {
                        $(this).next('span').remove()
                        $(this).addClass('good')
                    }
                }

            }


        })
    })

    $('li').click( function(){
        $('#select_laerned').html($(this).html()+' ( Изменить выбор )').attr('value',$(this).attr('value'))
        $('#other_learned').hide('normal')
        $('ul').hide()
    });

    $('li:last').click( function(){
        $('#select_laerned').html($(this).html()+' ( Изменить выбор )')
        $('ul').hide()
        $('#other_learned').show('normal')
    });

    $('nav a').click( function(){

        if ($(this).attr('next') == 'right'){
            var count = Number($(this).attr('step'))
            var step = $(this).html()
            $('section').each(function(i){
                var left =$(this).offset().left - (3000 * count)
                $(this).css({'left':left+'px'})
            })
            switch (step) {
                case '1': {$('#progress-bar').html('Шаг 1').css('width','10%'); break;}
                case '2': {$('#progress-bar').html('Шаг 2').css('width','25%'); break}
                case '3': {$('#progress-bar').html('Шаг 3').css('width','50%'); break}
                case '4': {$('#progress-bar').html('Шаг 4').css('width','75%'); break}
            }

        }
        if ($(this).attr('next') == 'left'){
            var count = Number($(this).attr('step'))
            var step = $(this).html()
            $('section').each(function(i){
                var left =$(this).offset().left + (3000 * count)
                $(this).css({'left':left+'px'})
            })
            switch (step) {
                case '1': {$('#progress-bar').html('Шаг 1').css('width','10%'); break;}
                case '2': {$('#progress-bar').html('Шаг 2').css('width','25%'); break}
                case '3': {$('#progress-bar').html('Шаг 3').css('width','50%'); break}
                case '4': {$('#progress-bar').html('Шаг 4').css('width','75%'); break}
            }

        }

    })

    $('.next').click( function(){

        var step = $(this).attr('to_step')
        $('section').each(function(i){
            var left =$(this).offset().left - 3000
            $(this).css({'left':left+'px'})
        })
        switch (step) {
            case '1': {$('#progress-bar').html('Шаг 1').css('width','10%'); break;}
            case '2': {$('#progress-bar').html('Шаг 2').css('width','25%'); break}
            case '3': {$('#progress-bar').html('Шаг 3').css('width','50%'); break}
            case '4': {$('#progress-bar').html('Шаг 4').css('width','75%'); break}
        }

    });

//    $('#error-submit a').live("click", function(){
//        $(this).hide('fast')
//    })

    function form_valid(){
        var errors = false
        $('#error-submit').remove()
        $('body').append('<div id="error-submit"><span>Обнаружены следующие ошибки:</span></div>')
        $('input').each(function(i){
            ////////////////// ГОД РОЖДЕНИЯ //////////////////
            if ( ($(this).attr('name') == 'year_birth') & (! $(this).hasClass('good')) ) {
                    errors = true
                    $('#error-submit').append('<a href="#">Год рождения</a>')
            }
            ////////////////////// ГОД ОКОНЧАНИЯ
            if ( ($(this).attr('name') == 'education_year') & (! $(this).hasClass('good')) ) {
                    errors = true
                    $('#error-submit').append('<a href="#">Год окончания вуза</a>')
            }
            /////////////////////////// ИМЯ ФАМИЛИЯ
            if ( ($(this).attr('name') == 'name') & (! $(this).hasClass('good'))  ){
                    errors = true
                    $('#error-submit').append('<a href="#">Имя, Фамилия</a>')
                }

            ///////////////////// Город
            if ( $(this).attr('name') == 'city' ){

                if ($(this).val().length == 0) {
                    errors = true
                    $('#error-submit').append('<a href="#">Город проживания</a>')
                }
            }
            ////////////////////// ТЕЛЕФОН
            if ( $(this).attr('name') == 'phone' ){

                if ($(this).val().length == 0) {
                    errors = true
                    $('#error-submit').append('<a href="#">Телефон</a>')
                }
                else{
                    for ( var i = 0; i < $(this).val().length; i++){
                        for (var iter = 0; iter<Number_Not_char.length; iter++){

                            if ( $(this).val().charAt(i) == Number_Not_char[iter] ){
                                errors = true
                                $('#error-submit').append('<a href="#">Телефон</a>')
                                break
                            }
                        }

                    }
                }
            }

        })
        //////////////////////// АНГЛИЙСКИЙ
        if ($('input[type="radio"]:checked').size() == 0) {
            errors = true
            $('#error-submit').append('<a href="#">Уровень владения английским языком</a>')
        }
        ////////////////////// Откуда узнали
        if( !($('#select_laerned').attr('value'))  ) {
            errors = true
            $('#error-submit').append('<a href="#">Не указали откуда узнали о ШРИ</a>')
        }
        //////////////////////// СОГЛАШЕНИЕ
        if ($('input[type="checkbox"]:checked').size() == 0) {
            errors = true
            $('#error-submit').append('<a href="#">Без галочки соглашения мы не можем принять анкету!</a>')
        }
        var big_error = false
        $('textarea').each(function(i){
            if ( ($(this).attr('name') != 'other') & ($(this).attr('id') != 'other_learned') ){
                if ($(this).val().length == 0){
                    big_error = true
                }
            }
        })
        if (big_error){
            $('#error-submit').append('<a href="#">Все большие поля должны быть заполнены</a>')
        }

        if (errors) { return false }
        else        { return true  }
    };

    $('#submit').click( function(){
        var data =''
        $('* [name]').each(function (i){
            if ( $(this).attr('value') == undefined ){
               data+= '"' +$(this).attr('name') +'":"'+ $(this).val()+'", '
            }
            else{
               data+= '"' +$(this).attr('name') +'":"'+ $(this).attr('value')+'", '
            }
        })
        if ( form_valid() ){

            var src ="#"

            $.post(src, data ,function(data){
                if(data.success){
                    $('#good-work').css('display','block')
                    $('.next').click()
                    $('#progress-bar').html('Готово').css('width','100%');
                }
                else{
                    $('#error-submit').remove()
                    $('body').append('<div id="error-submit"><span>Данные не отправлены :(</span></div>')
                    $('#error-submit').animate({
                        opacity: 1
                    }, 1000 );
                }
            })

        }
        else{
           $('#error-submit').animate({
               right: '10px',
               opacity: 1
           }, 400 );
        }


    })


    $('#clear').click(function(){
        $('input[type="text"], input[type="url"], input[type="email"], input[type="number"],input[type="file"], textarea').val('')
        $('input[type="radio"]:checked, input[type="checkbox"]:checked').attr('checked', false);
        $('#select_laerned').html('Выбрать').attr('value','')
        $('#other_learned').hide()
        $('.error').remove()
        $('.personal-btn').click()

        $('#personal').animate({
            scrollTop: $("#personal nav").offset().top
        }, 2000);

    })

});