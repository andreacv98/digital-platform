posizione_ancore = '';
var minifiedHeader_H;
var contentPageAnchors_H;
var contentFederationBar_H;
var contentHeader_H;


/* sposta la pagina in base alla navigazione ad ancore sul click */
function vai_ancora(page_anchor_container) {
    if ($(page_anchor_container).length > 0) {

        $(page_anchor_container).removeClass('clicked_nav');

        $(page_anchor_container + ' ul#anchor-submenu li a[href^="#"]').on('click', function (e) {

            $(page_anchor_container + ' ul#anchor-submenu li a').removeClass('clicked_nav');
            //if ($(this).parents(page_anchor_container).length > 0) {

            e.preventDefault();
            var target = this.hash;

            myanimationScroll(target);

            $(this).addClass('clicked_nav');
        });
    }
}


function myanimationScroll(mytarget) {
    if (mytarget.match(/^#[a-zA-Z]/) && $(mytarget).length > 0) {

        var myPanelHeading = $(mytarget).prev('.panel-heading').outerHeight();
        var offsetExtra;
        if(($('#header-poste-italiane.nav-corporate').length > 0)){
            offsetExtra = contentFederationBar_H + contentHeader_H + myPanelHeading + 10; /* sito corporate */
        } else{
            offsetExtra = minifiedHeader_H + contentPageAnchors_H - 5; /* altri siti */
        }
        if ((mq_Detect == "xs") || (mq_Detect == "sm")) {
            offsetExtra = 0;
        }

        $('html, body').stop().animate({
            'scrollTop': $(mytarget).offset().top - offsetExtra
        }, 1200, 'swing', function () {
            // window.location.hash = mytarget;
        });

    }
}

/* sposta la pagina in base alla navigazione ad ancore sullo scroll */
function activeOnScroll(page_anchor_container) {

    if ($(page_anchor_container).length > 0) {
        var scrollPos = $(document).scrollTop();

        $(page_anchor_container + ' ul#anchor-submenu li a').each(function () {
            var refElement = $($(this).attr('href'));

            if (refElement.length > 0) {
                //writeWarning('scrollpos =' + scrollPos);
                //writeInfo ('altezza '+$(document).outerHeight());

                /*var mionumarrayAnchor = $(page_anchor_container + ' ul#anchor-submenu li a').length - 1;
                var lastAnchor = $(page_anchor_container + ' ul#anchor-submenu li a')[mionumarrayAnchor];
                var lastAnchorId = $(lastAnchor).attr('href');
                if(scrollPos > $(lastAnchorId).offset().top - $(lastAnchorId).outerHeight() - 100 ){
                    writeError('');
                }*/

                if ((refElement.offset().top - (minifiedHeader_H + contentPageAnchors_H) < scrollPos) && (refElement.offset().top - (minifiedHeader_H + contentPageAnchors_H) + refElement.outerHeight() > scrollPos)) {
                    $(page_anchor_container + ' ul#anchor-submenu li a').removeClass('active');
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }


            }




        });
    }
}

/* fissa il menu delle ancore (chiamata onscroll)*/
function fixOnScroll() {
    if (posizione_ancore != '') {
        if ($(this).scrollTop() + minifiedHeader_H > posizione_ancore) {
            if (!$('.content-page-anchors-fixed').length > 0) {
                $('.content-page-anchors').addClass('content-page-anchors-fixed');
                $('.content-hero .container-fluid').css('margin-top', $('.content-page-anchors').outerHeight());
                $('.nohero').css('margin-top', $('.content-page-anchors').outerHeight());
            }
        }
        if ($(this).scrollTop() + minifiedHeader_H <= posizione_ancore) {
            if ($('.content-page-anchors-fixed').length > 0) {
                $('.content-page-anchors').removeClass('content-page-anchors-fixed');
                $('.content-hero .container-fluid').removeAttr('style');
                if ($('.nohero').length > 0) {
                    $('.nohero').removeAttr('style');
                }
            }
        }

        /*if ($('.content-page-anchors-fixed').length > 0) {
            $('.sticky-active #bracket').css('top', $('.content-page-anchors-fixed').outerHeight());
        }*/
    }
}



/*******************/
/* go Top function */
/*******************/
function vaiTop() {

    //setta in pixel dopo quanto visualizzare top a seconda del cutpoint

    if (mq_Detect == 'sm' || mq_Detect == 'xs') {
        var offset = 350;
    } else {
        var offset = 1200;
    }

    var duration = 1000;

    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);

            //verifica che lo scroll sia inattivo e dopo 1sec nasconde il top
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function () {
                $('.back-to-top').fadeOut('slow');
            }, duration + duration));

        } else {
            $('.back-to-top').fadeOut(duration);
            //$('.back-to-top').toggleClass('truetop');
        }
    });

    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });

}






function animationScrollAccordion(){
    $('.main-pills .panel-group-accordion.panel-group-unique').on('shown.bs.collapse', function (e) {
        
        var offset = $(this).find('.collapse.in').prev('.panel-heading');

       var offsetExtra;
       if(($('#header-poste-italiane.nav-corporate').length > 0)){
           offsetExtra = contentFederationBar_H + contentHeader_H + 10; /* sito corporate */
       } else{
           offsetExtra = minifiedHeader_H + contentPageAnchors_H + 10; /* altri siti */
       }
       if ((mq_Detect == "xs") || (mq_Detect == "sm")) {
           offsetExtra = 0;
       }

    
        if (offset) {
            $('html,body').animate({
                scrollTop: $(offset).offset().top - offsetExtra
            }, 500);
        }
    });
}




function accordionOpenByUrl(){
    myUrlHash = window.location.hash;

    if(myUrlHash.length>0 && myUrlHash.indexOf("#!") !== 0 && myUrlHash.indexOf("#/") !== 0 && $('.panel-group-accordion ').length>0){
        if($('.panel-group-accordion '+ myUrlHash).hasClass('in')){
            animationScrollAccordion();
        }
        else{
            $('.panel-group-accordion .panel-heading a[href="'+ myUrlHash +'"]').trigger( "click" );
        }
        
    }
}











$(document).ready(function () {

  /************************/
  /* check url e apertura accordion */
  /************************/
    accordionOpenByUrl();



  /************************/
  /* ancore generiche con scroll lento */
  /************************/

  $('.animate-scroll').click(function (event) {
      myanimationScroll($(this).attr('href'));
  });


    /************************/
    /* controllo attivazione minified Header */
    /************************/

    if ((minifiedHeaderStatus) && ((mq_Detect == "md") || (mq_Detect == "lg"))) {
        minifiedHeader_H = $('.content-federation-bar-minified').outerHeight();
    } else {
        minifiedHeader_H = 0;
    }

    /************************/

    if (($('.content-page-anchors').length > 0) && ((mq_Detect == "md") || (mq_Detect == "lg"))) {
        posizione_ancore = $('.content-page-anchors').offset().top;
        contentPageAnchors_H = $('.content-page-anchors').outerHeight();
    } else {
        contentPageAnchors_H = 0;
    }

    /************************/
    /* controllo presenza header corporate */
    /************************/
    if (($('#header-poste-italiane').length > 0)) {
        contentFederationBar_H = $('.content-federation-bar').outerHeight();
        contentHeader_H = $('.content-header').outerHeight();
    }

    /********************/
    /* Accordion scroll */
    /********************/
    animationScrollAccordion();


    /************************/
    /* Stick colonna destra */
    /************************/
    if ($('#bracket').length > 0) {

        if ($('.content-main').length > 0) {
            stLi = '.content-main';
            if ($('.content-page-anchors').length > 0) {
                stickFromTop = ($('.content-page-anchors').outerHeight() * 2) + minifiedHeader_H;
            } else {
                stickFromTop = minifiedHeader_H + 60;
            }
        } else if ($('.content-applicative').length > 0) {
            stLi = '.content-applicative';
            stickFromTop = minifiedHeader_H + 60;
        }

    }


    /********************************************/
    /* lancia funzione per navigazione ancore e */
    /* verifica se posizionare in fixed nav-bar */
    /********************************************/
    if ($('.content-page-anchors').length > 0) {
        vai_ancora('.content-page-anchors');
    }



    /*******************/
    /* go Top function */
    /*******************/
    vaiTop();

});


$(window).scroll(function () {
    if ((mq_Detect == "md") || (mq_Detect == "lg")) {
        fixOnScroll();
    }
    activeOnScroll('.content-page-anchors');
});
