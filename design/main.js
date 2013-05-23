$(function(){
    initConnect();
    initDataVis();
});

function initConnect() {
    $('#connector #connect').click(function(){
        $(this).hide();
        $('#connector .connection-complete').show();
        $('#fitbyte').addClass('connected');
    });
}

function initDataVis() {
    var btnsSelector = '#menu li',
        sectionSelector = '.section';
    $(btnsSelector).click(function(){
        $(btnsSelector).removeClass('selected');
        $(this).addClass('selected');
        $(sectionSelector).removeClass('selected');
        $('#' + $(this).data('section')).addClass('selected');
    });
}
