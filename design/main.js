var timesAwoken,
    timesAwokenGrouped,
    timesAwokenCategories,
    timesAwokenCounts,

    minutesTillSleep,
    minutesTillSleepGrouped,
    minutesTillSleepCategories,
    minutesTillSleepCounts;

timesAwoken = {"sleep-awakeningsCount":[{"dateTime":"2013-05-04","value":"11"},{"dateTime":"2013-05-05","value":"29"},{"dateTime":"2013-05-06","value":"22"},{"dateTime":"2013-05-07","value":"15"},{"dateTime":"2013-05-08","value":"13"},{"dateTime":"2013-05-09","value":"4"},{"dateTime":"2013-05-10","value":"15"},{"dateTime":"2013-05-11","value":"40"},{"dateTime":"2013-05-12","value":"14"},{"dateTime":"2013-05-13","value":"16"},{"dateTime":"2013-05-14","value":"13"},{"dateTime":"2013-05-15","value":"0"},{"dateTime":"2013-05-16","value":"9"},{"dateTime":"2013-05-17","value":"17"},{"dateTime":"2013-05-18","value":"16"},{"dateTime":"2013-05-19","value":"40"},{"dateTime":"2013-05-20","value":"0"},{"dateTime":"2013-05-21","value":"16"},{"dateTime":"2013-05-22","value":"12"},{"dateTime":"2013-05-23","value":"25"},{"dateTime":"2013-05-24","value":"16"}]};

timesAwokenGrouped = _.groupBy(timesAwoken['sleep-awakeningsCount'], function(day) {
    return day.value;
});
// but this isn't right, we want a range from the min to the max
timesAwokenCategories = Object.keys(timesAwokenGrouped);
timesAwokenCounts = _.map(timesAwokenGrouped, function(group) {
    return group.length;
});

minutesTillSleep = {"sleep-minutesToFallAsleep":[{"dateTime":"2013-05-04","value":"22"},{"dateTime":"2013-05-05","value":"32"},{"dateTime":"2013-05-06","value":"16"},{"dateTime":"2013-05-07","value":"26"},{"dateTime":"2013-05-08","value":"7"},{"dateTime":"2013-05-09","value":"7"},{"dateTime":"2013-05-10","value":"7"},{"dateTime":"2013-05-11","value":"5"},{"dateTime":"2013-05-12","value":"34"},{"dateTime":"2013-05-13","value":"10"},{"dateTime":"2013-05-14","value":"28"},{"dateTime":"2013-05-15","value":"0"},{"dateTime":"2013-05-16","value":"8"},{"dateTime":"2013-05-17","value":"8"},{"dateTime":"2013-05-18","value":"13"},{"dateTime":"2013-05-19","value":"28"},{"dateTime":"2013-05-20","value":"0"},{"dateTime":"2013-05-21","value":"6"},{"dateTime":"2013-05-22","value":"18"},{"dateTime":"2013-05-23","value":"7"},{"dateTime":"2013-05-24","value":"30"}]};

minutesTillSleepGrouped = _.groupBy(minutesTillSleep['sleep-minutesToFallAsleep'], function(day) {
    return day.value;
});
// but this isn't right, we want a range from the min to the max
minutesTillSleepCategories = Object.keys(minutesTillSleepGrouped);
minutesTillSleepCounts = _.map(minutesTillSleepGrouped, function(group) {
    return group.length;
});

$(function(){
    initConnect();
    initMenu();
    initDataVis();
});

function initConnect() {
    $('#connector #connect').click(function(){
        $(this).hide();
        $('#connector .connection-complete').show();
        $('#fitbyte').addClass('connected');
    });
}

function initMenu() {
    var btnsSelector = '#menu li',
        sectionSelector = '.section';
    $(btnsSelector).click(function(){
        $(btnsSelector).removeClass('selected');
        $(this).addClass('selected');
        $(sectionSelector).removeClass('selected');
        $('#' + $(this).data('section')).addClass('selected');
    });
}

function initDataVis() {
    var timesAwokenData,
        minutesTillSleepData,
        timeInBedData;

    timesAwokenData = generateChartData(
        'Times Awoken',
        timesAwokenCategories,
        timesAwokenCounts,
        1
    )
    $('#times-awoken .data-display').highcharts(timesAwokenData);

    minutesTillSleepData = generateChartData(
        'Minutes Till Sleep',
        minutesTillSleepCategories,
        minutesTillSleepCounts,
        1
    )
    $('#minutes-till-sleep .data-display').highcharts(minutesTillSleepData);
}

function generateChartData(title, categories, count, yTick) {
    return {
        chart: {
            renderTo:'container',
            defaultSeriesType:'column',
            borderWidth:0,
            backgroundColor:'#eee',
            borderWidth:1,
            borderColor:'#ccc',
            plotBackgroundColor:'#fff',
            plotBorderWidth:1,
            plotBorderColor:'#ccc'
        },
        credits:{enabled:false},
        exporting:{enabled:false},
        title:{text:title},
        legend:{
            //enabled:false
        },
        tooltip:{
            borderWidth:1,
            formatter:function() {
                return '<b>Minutes:</b><br/> '+ this.x +'<br/>'+
                '<b>Count:</b> '+ this.y;
            }
        },
        plotOptions:{
            column:{
                shadow:false,
                borderWidth:.5,
                borderColor:'#666',
                pointPadding:0,
                groupPadding:0,
                color: 'rgba(204,204,204,.85)'
            },
            spline:{
                shadow:false,
                marker:{
                    radius:1
                }
            },
            areaspline:{
                color:'rgb(69, 114, 167)',
                fillColor:'rgba(69, 114, 167,.25)',
                shadow:false,
                marker:{
                    radius:1
                }
            }
        },
        xAxis:{
            categories: categories,
            labels:{
                rotation:-90,
                y:40,
                style: {
                    fontSize:'8px',
                    fontWeight:'normal',
                    color:'#333'
                },
            },
            lineWidth:0,
            lineColor:'#999',
            tickLength:70,
            tickColor:'#ccc',
        },
        yAxis:{
            title:{text:''},
            //maxPadding:0,
            gridLineColor:'#e9e9e9',
            tickWidth:1,
            tickLength:3,
            tickColor:'#ccc',
            lineColor:'#ccc',
            tickInterval:yTick,
            //endOnTick:false,
        },
        series: [{
            name:'Bins',
            data: count,
        },{
            name:'Curve',
            type:'spline',
            visible:false,
            data: count,
            //color: 'rgba(204,204,255,.85)'
        },{
            name:'Filled Curve',
            type:'areaspline',
            visible:false,
            data: count,
            //color: 'rgba(204,204,255,.85)'
        }]
    }
}
