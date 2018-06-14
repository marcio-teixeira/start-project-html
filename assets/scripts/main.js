$(document).ready(function(){
    $("#menuMobile").mmenu({
        offCanvas: {
            position: "right"
        },
        onClick: {
            setSelected: true
        },
        navbar:{
            titleLink: "parent",
            title	: "MENU"
        }
    });
    $("#telMobile").mmenu({
        offCanvas: {
            position: "right"
        },
        onClick: {
            setSelected: true
        },
        navbar:{
            titleLink: "parent",
            title	: "RESERVAS"
        }
    });
    $('.pbox-imagem').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.sliderDepoimentos').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    /* Datepicker */

    $.datepicker.regional['pt-BR'] = {
        closeText: 'Fechar',
        prevText: '&#x3c;Anterior',
        nextText: 'Pr&oacute;ximo&#x3e;',
        currentText: 'Hoje',
        monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
                     'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
                          'Jul','Ago','Set','Out','Nov','Dez'],
        dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);

    var today = new Date().getTime(),
        tomorrow = new Date(today + 24 * 60 * 60 * 1000);

    $('.checkin').datepicker({
        minDate: 0,
        onSelect: function(date, inst) {
            // debugger;
            var nextDay = new Date($(this).datepicker('getDate').getTime() + 24 * 60 * 60 * 1000);

            $('.checkout').datepicker('setDate', nextDay);
            $('.checkout').datepicker( "option", "minDate", nextDay);

            //console.log( $(this).datepicker('getDate') );

            setTimeout(function(){
                $('.checkout').datepicker("show");
            },50);
        }
    });
    $(".checkout").datepicker({
        minDate: tomorrow
    });

    /* Abre Formulário Newsletter */

    $('input.emailNews').keypress(function() {
        var thisLength = $(this).val();

        if( thisLength !== '' ) {
            $('.abreNews').addClass('aberto');
            $(this).addClass('aberto');
        } else {
            $('.abreNews').removeClass('aberto');
            $(this).removeClass('aberto');
        }
    });
    $('.abreNews').click(function () {
        $(this).hide();
        $('.newsHide').slideToggle();
    });

    ///////////////////////////////////
    // Mascaras formulario
    /////////////////////////////////

    $('.tel').mask('(00) 0000-0000');
    $('.data').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');
    $('.ano').mask('0000');
    $('.horas').mask('00:00');
    $('.cep').mask('000-000');
    $('.money').mask('R$ 000.000.000.000.000,00', {reverse: true});

    $(".cel").bind('focusin', function(event) {
        var target, phone, element;
        target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        element = $(target);
        element.unmask();
        element.mask("(00) 00000-0000");
    }).bind('focusout', function(event) {
        var target, phone, element;
        target = (event.currentTarget) ? event.currentTarget : event.srcElement;
        phone = target.value.replace(/\D/g, '');
        element = $(target);
        element.unmask();
        if(phone.length > 10) {
            element.mask("(00) 00000-0000");
        } else {
            element.mask("(00) 0000-0000");  
        }
    });

    //Formulário

    $('#formHotel').submit(function(event){

        var hotel = $('#idHotel').val();
        var chegada = $('#chegada').val();
        var saida = $('#saida').val();
        var quartos = $('#quartos-hotel').val();
        var adultos = $('#adultos-hotel').val();
        var criancas = $('#criancas-hotel').val();
        var promocode = $('#promocode').val();

        url = "https://myreservations.omnibees.com/default.aspx?";
        url += "q=" + hotel;
        url += "&NRooms=" + quartos;
        url += "&ad=" + adultos;
        url += "&ch=" + criancas;
        url += "&CheckIn=" + chegada.replace(/\//g,"");
        url += "&CheckOut=" + saida.replace(/\//g,"");
        url += "&Code=" + promocode;
        alert(url);
        window.open(url, "_self");
        event.preventDefault();
    });
});



