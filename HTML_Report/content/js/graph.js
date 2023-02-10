/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4.0, "series": [{"data": [[200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-4", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-1", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-2", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state", "isController": false}, {"data": [[0.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-0", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-9", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-18", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-7", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-16", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-8", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-13", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "https://w3schools.com/", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3", "isController": false}, {"data": [[19600.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", "isController": false}, {"data": [[1400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", "isController": false}, {"data": [[2300.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 82.0, "series": [{"data": [[0.0, 82.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 17.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 9.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 4.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67597706E12, "maxY": 1.0, "series": [{"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.67597706E12, 1.0], [1.67597712E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-2", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67597712E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 56.0, "minX": 0.0, "maxY": 19671.0, "series": [{"data": [[1.0, 268.0], [0.0, 988.0]], "isOverall": false, "label": "https://w3schools.com/-3", "isController": false}, {"data": [[0.5, 628.0]], "isOverall": false, "label": "https://w3schools.com/-3-Aggregated", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://w3schools.com/-4", "isController": false}, {"data": [[1.0, 285.0]], "isOverall": false, "label": "https://w3schools.com/-4-Aggregated", "isController": false}, {"data": [[1.0, 460.0], [0.0, 132.0]], "isOverall": false, "label": "https://w3schools.com/-1", "isController": false}, {"data": [[0.5, 296.0]], "isOverall": false, "label": "https://w3schools.com/-1-Aggregated", "isController": false}, {"data": [[1.0, 60.0], [0.0, 210.0]], "isOverall": false, "label": "https://w3schools.com/-2", "isController": false}, {"data": [[0.5, 135.0]], "isOverall": false, "label": "https://w3schools.com/-2-Aggregated", "isController": false}, {"data": [[1.0, 1763.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state", "isController": false}, {"data": [[1.0, 1763.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state-Aggregated", "isController": false}, {"data": [[1.0, 974.0], [0.0, 90.0]], "isOverall": false, "label": "https://w3schools.com/-0", "isController": false}, {"data": [[0.5, 532.0]], "isOverall": false, "label": "https://w3schools.com/-0-Aggregated", "isController": false}, {"data": [[1.0, 800.0]], "isOverall": false, "label": "https://w3schools.com/-9", "isController": false}, {"data": [[1.0, 800.0]], "isOverall": false, "label": "https://w3schools.com/-9-Aggregated", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "https://w3schools.com/-18", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "https://w3schools.com/-18-Aggregated", "isController": false}, {"data": [[1.0, 683.0]], "isOverall": false, "label": "https://w3schools.com/-19", "isController": false}, {"data": [[1.0, 683.0]], "isOverall": false, "label": "https://w3schools.com/-19-Aggregated", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "https://w3schools.com/-7", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "https://w3schools.com/-7-Aggregated", "isController": false}, {"data": [[1.0, 633.0]], "isOverall": false, "label": "https://w3schools.com/-16", "isController": false}, {"data": [[1.0, 633.0]], "isOverall": false, "label": "https://w3schools.com/-16-Aggregated", "isController": false}, {"data": [[1.0, 322.0]], "isOverall": false, "label": "https://w3schools.com/-8", "isController": false}, {"data": [[1.0, 322.0]], "isOverall": false, "label": "https://w3schools.com/-8-Aggregated", "isController": false}, {"data": [[1.0, 1086.0]], "isOverall": false, "label": "https://w3schools.com/-17", "isController": false}, {"data": [[1.0, 1086.0]], "isOverall": false, "label": "https://w3schools.com/-17-Aggregated", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://w3schools.com/-5", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://w3schools.com/-5-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://w3schools.com/-14", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://w3schools.com/-14-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "https://w3schools.com/-6", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "https://w3schools.com/-6-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://w3schools.com/-15", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://w3schools.com/-15-Aggregated", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://w3schools.com/-12", "isController": false}, {"data": [[1.0, 296.0]], "isOverall": false, "label": "https://w3schools.com/-12-Aggregated", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "https://w3schools.com/-13", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "https://w3schools.com/-13-Aggregated", "isController": false}, {"data": [[1.0, 1491.0]], "isOverall": false, "label": "https://w3schools.com/-10", "isController": false}, {"data": [[1.0, 1491.0]], "isOverall": false, "label": "https://w3schools.com/-10-Aggregated", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "https://w3schools.com/-11", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "https://w3schools.com/-11-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9-Aggregated", "isController": false}, {"data": [[1.0, 2554.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/", "isController": false}, {"data": [[1.0, 2554.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7-Aggregated", "isController": false}, {"data": [[1.0, 2678.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state", "isController": false}, {"data": [[1.0, 2678.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state-Aggregated", "isController": false}, {"data": [[1.0, 670.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user", "isController": false}, {"data": [[1.0, 670.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user-Aggregated", "isController": false}, {"data": [[1.0, 3208.0]], "isOverall": false, "label": "https://w3schools.com/", "isController": false}, {"data": [[1.0, 3208.0]], "isOverall": false, "label": "https://w3schools.com/-Aggregated", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10", "isController": false}, {"data": [[1.0, 62.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11-Aggregated", "isController": false}, {"data": [[1.0, 721.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp", "isController": false}, {"data": [[1.0, 721.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6-Aggregated", "isController": false}, {"data": [[1.0, 4802.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", "isController": false}, {"data": [[1.0, 4802.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6-Aggregated", "isController": false}, {"data": [[1.0, 1270.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/", "isController": false}, {"data": [[1.0, 1270.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7-Aggregated", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8-Aggregated", "isController": false}, {"data": [[1.0, 311.0], [0.0, 102.5]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1", "isController": false}, {"data": [[0.33333333333333337, 172.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1-Aggregated", "isController": false}, {"data": [[1.0, 218.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5", "isController": false}, {"data": [[1.0, 218.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5-Aggregated", "isController": false}, {"data": [[1.0, 589.0], [0.0, 303.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0", "isController": false}, {"data": [[0.33333333333333337, 398.3333333333333]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0-Aggregated", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6-Aggregated", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3-Aggregated", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3-Aggregated", "isController": false}, {"data": [[1.0, 175.0], [0.0, 1284.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2", "isController": false}, {"data": [[0.5, 729.5]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2-Aggregated", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4-Aggregated", "isController": false}, {"data": [[1.0, 1649.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5", "isController": false}, {"data": [[1.0, 1649.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1-Aggregated", "isController": false}, {"data": [[1.0, 1949.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4", "isController": false}, {"data": [[1.0, 1949.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2-Aggregated", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9", "isController": false}, {"data": [[1.0, 247.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-Aggregated", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4-Aggregated", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3", "isController": false}, {"data": [[1.0, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3-Aggregated", "isController": false}, {"data": [[1.0, 19671.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 19671.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5-Aggregated", "isController": false}, {"data": [[1.0, 274.25]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress", "isController": false}, {"data": [[1.0, 274.25]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-Aggregated", "isController": false}, {"data": [[1.0, 1382.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", "isController": false}, {"data": [[1.0, 1382.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5-Aggregated", "isController": false}, {"data": [[1.0, 2393.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", "isController": false}, {"data": [[1.0, 2393.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6-Aggregated", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3-Aggregated", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4-Aggregated", "isController": false}, {"data": [[1.0, 1448.0], [0.0, 246.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", "isController": false}, {"data": [[0.5, 847.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1-Aggregated", "isController": false}, {"data": [[1.0, 711.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", "isController": false}, {"data": [[1.0, 711.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2-Aggregated", "isController": false}, {"data": [[1.0, 2355.0], [0.0, 1324.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", "isController": false}, {"data": [[0.5, 1839.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0-Aggregated", "isController": false}, {"data": [[1.0, 363.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp", "isController": false}, {"data": [[1.0, 363.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 913.8833333333333, "minX": 1.67597706E12, "maxY": 216589.36666666667, "series": [{"data": [[1.67597706E12, 216589.36666666667], [1.67597712E12, 29107.2]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.67597706E12, 913.8833333333333], [1.67597712E12, 1049.5666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67597712E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.67597706E12, "maxY": 19671.0, "series": [{"data": [[1.67597706E12, 628.0]], "isOverall": false, "label": "https://w3schools.com/-3", "isController": false}, {"data": [[1.67597706E12, 285.0]], "isOverall": false, "label": "https://w3schools.com/-4", "isController": false}, {"data": [[1.67597706E12, 296.0]], "isOverall": false, "label": "https://w3schools.com/-1", "isController": false}, {"data": [[1.67597706E12, 135.0]], "isOverall": false, "label": "https://w3schools.com/-2", "isController": false}, {"data": [[1.67597706E12, 1763.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state", "isController": false}, {"data": [[1.67597706E12, 532.0]], "isOverall": false, "label": "https://w3schools.com/-0", "isController": false}, {"data": [[1.67597706E12, 800.0]], "isOverall": false, "label": "https://w3schools.com/-9", "isController": false}, {"data": [[1.67597706E12, 623.0]], "isOverall": false, "label": "https://w3schools.com/-18", "isController": false}, {"data": [[1.67597706E12, 683.0]], "isOverall": false, "label": "https://w3schools.com/-19", "isController": false}, {"data": [[1.67597706E12, 217.0]], "isOverall": false, "label": "https://w3schools.com/-7", "isController": false}, {"data": [[1.67597706E12, 633.0]], "isOverall": false, "label": "https://w3schools.com/-16", "isController": false}, {"data": [[1.67597706E12, 322.0]], "isOverall": false, "label": "https://w3schools.com/-8", "isController": false}, {"data": [[1.67597706E12, 1086.0]], "isOverall": false, "label": "https://w3schools.com/-17", "isController": false}, {"data": [[1.67597706E12, 211.0]], "isOverall": false, "label": "https://w3schools.com/-5", "isController": false}, {"data": [[1.67597706E12, 62.0]], "isOverall": false, "label": "https://w3schools.com/-14", "isController": false}, {"data": [[1.67597706E12, 205.0]], "isOverall": false, "label": "https://w3schools.com/-6", "isController": false}, {"data": [[1.67597706E12, 58.0]], "isOverall": false, "label": "https://w3schools.com/-15", "isController": false}, {"data": [[1.67597706E12, 296.0]], "isOverall": false, "label": "https://w3schools.com/-12", "isController": false}, {"data": [[1.67597706E12, 221.0]], "isOverall": false, "label": "https://w3schools.com/-13", "isController": false}, {"data": [[1.67597706E12, 1491.0]], "isOverall": false, "label": "https://w3schools.com/-10", "isController": false}, {"data": [[1.67597706E12, 207.0]], "isOverall": false, "label": "https://w3schools.com/-11", "isController": false}, {"data": [[1.67597712E12, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9", "isController": false}, {"data": [[1.67597706E12, 2554.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7", "isController": false}, {"data": [[1.67597706E12, 2678.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state", "isController": false}, {"data": [[1.67597706E12, 670.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user", "isController": false}, {"data": [[1.67597706E12, 3208.0]], "isOverall": false, "label": "https://w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 62.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 721.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 4802.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2", "isController": false}, {"data": [[1.67597706E12, 305.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 121.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 68.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 1270.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 58.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 90.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8", "isController": false}, {"data": [[1.67597706E12, 172.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1", "isController": false}, {"data": [[1.67597712E12, 218.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5", "isController": false}, {"data": [[1.67597706E12, 398.3333333333333]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0", "isController": false}, {"data": [[1.67597712E12, 220.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 419.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3", "isController": false}, {"data": [[1.67597712E12, 263.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 729.5]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2", "isController": false}, {"data": [[1.67597712E12, 169.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4", "isController": false}, {"data": [[1.67597706E12, 1649.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5", "isController": false}, {"data": [[1.67597712E12, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1", "isController": false}, {"data": [[1.67597706E12, 1949.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4", "isController": false}, {"data": [[1.67597712E12, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 247.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 127.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 70.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 276.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp", "isController": false}, {"data": [[1.67597712E12, 211.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 64.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 56.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 19671.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 274.25]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 57.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 269.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp", "isController": false}, {"data": [[1.67597706E12, 1382.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", "isController": false}, {"data": [[1.67597706E12, 2393.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", "isController": false}, {"data": [[1.67597706E12, 319.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", "isController": false}, {"data": [[1.67597706E12, 221.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", "isController": false}, {"data": [[1.67597706E12, 847.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", "isController": false}, {"data": [[1.67597706E12, 711.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", "isController": false}, {"data": [[1.67597706E12, 1839.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", "isController": false}, {"data": [[1.67597712E12, 363.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67597712E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67597706E12, "maxY": 11514.0, "series": [{"data": [[1.67597706E12, 253.0]], "isOverall": false, "label": "https://w3schools.com/-3", "isController": false}, {"data": [[1.67597706E12, 284.0]], "isOverall": false, "label": "https://w3schools.com/-4", "isController": false}, {"data": [[1.67597706E12, 228.0]], "isOverall": false, "label": "https://w3schools.com/-1", "isController": false}, {"data": [[1.67597706E12, 127.0]], "isOverall": false, "label": "https://w3schools.com/-2", "isController": false}, {"data": [[1.67597706E12, 1763.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state", "isController": false}, {"data": [[1.67597706E12, 532.0]], "isOverall": false, "label": "https://w3schools.com/-0", "isController": false}, {"data": [[1.67597706E12, 195.0]], "isOverall": false, "label": "https://w3schools.com/-9", "isController": false}, {"data": [[1.67597706E12, 62.0]], "isOverall": false, "label": "https://w3schools.com/-18", "isController": false}, {"data": [[1.67597706E12, 586.0]], "isOverall": false, "label": "https://w3schools.com/-19", "isController": false}, {"data": [[1.67597706E12, 217.0]], "isOverall": false, "label": "https://w3schools.com/-7", "isController": false}, {"data": [[1.67597706E12, 68.0]], "isOverall": false, "label": "https://w3schools.com/-16", "isController": false}, {"data": [[1.67597706E12, 196.0]], "isOverall": false, "label": "https://w3schools.com/-8", "isController": false}, {"data": [[1.67597706E12, 90.0]], "isOverall": false, "label": "https://w3schools.com/-17", "isController": false}, {"data": [[1.67597706E12, 211.0]], "isOverall": false, "label": "https://w3schools.com/-5", "isController": false}, {"data": [[1.67597706E12, 62.0]], "isOverall": false, "label": "https://w3schools.com/-14", "isController": false}, {"data": [[1.67597706E12, 204.0]], "isOverall": false, "label": "https://w3schools.com/-6", "isController": false}, {"data": [[1.67597706E12, 58.0]], "isOverall": false, "label": "https://w3schools.com/-15", "isController": false}, {"data": [[1.67597706E12, 208.0]], "isOverall": false, "label": "https://w3schools.com/-12", "isController": false}, {"data": [[1.67597706E12, 221.0]], "isOverall": false, "label": "https://w3schools.com/-13", "isController": false}, {"data": [[1.67597706E12, 207.0]], "isOverall": false, "label": "https://w3schools.com/-10", "isController": false}, {"data": [[1.67597706E12, 207.0]], "isOverall": false, "label": "https://w3schools.com/-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9", "isController": false}, {"data": [[1.67597706E12, 589.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7", "isController": false}, {"data": [[1.67597706E12, 2408.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state", "isController": false}, {"data": [[1.67597706E12, 670.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user", "isController": false}, {"data": [[1.67597706E12, 974.0]], "isOverall": false, "label": "https://w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 206.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 2349.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2", "isController": false}, {"data": [[1.67597706E12, 305.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 1270.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 60.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 84.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8", "isController": false}, {"data": [[1.67597706E12, 166.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1", "isController": false}, {"data": [[1.67597712E12, 218.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5", "isController": false}, {"data": [[1.67597706E12, 337.3333333333333]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0", "isController": false}, {"data": [[1.67597712E12, 220.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 121.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3", "isController": false}, {"data": [[1.67597712E12, 200.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 641.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4", "isController": false}, {"data": [[1.67597706E12, 306.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5", "isController": false}, {"data": [[1.67597712E12, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1", "isController": false}, {"data": [[1.67597706E12, 302.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4", "isController": false}, {"data": [[1.67597712E12, 209.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 195.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 69.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 59.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 61.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 206.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 11514.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 274.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp", "isController": false}, {"data": [[1.67597706E12, 224.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", "isController": false}, {"data": [[1.67597706E12, 216.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", "isController": false}, {"data": [[1.67597706E12, 312.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", "isController": false}, {"data": [[1.67597706E12, 221.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", "isController": false}, {"data": [[1.67597706E12, 845.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", "isController": false}, {"data": [[1.67597706E12, 313.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", "isController": false}, {"data": [[1.67597706E12, 1282.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", "isController": false}, {"data": [[1.67597712E12, 63.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67597712E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67597706E12, "maxY": 6004.0, "series": [{"data": [[1.67597706E12, 76.0]], "isOverall": false, "label": "https://w3schools.com/-3", "isController": false}, {"data": [[1.67597706E12, 229.0]], "isOverall": false, "label": "https://w3schools.com/-4", "isController": false}, {"data": [[1.67597706E12, 166.5]], "isOverall": false, "label": "https://w3schools.com/-1", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-2", "isController": false}, {"data": [[1.67597706E12, 1047.0]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state", "isController": false}, {"data": [[1.67597706E12, 367.5]], "isOverall": false, "label": "https://w3schools.com/-0", "isController": false}, {"data": [[1.67597706E12, 131.0]], "isOverall": false, "label": "https://w3schools.com/-9", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-18", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-19", "isController": false}, {"data": [[1.67597706E12, 158.0]], "isOverall": false, "label": "https://w3schools.com/-7", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-16", "isController": false}, {"data": [[1.67597706E12, 137.0]], "isOverall": false, "label": "https://w3schools.com/-8", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-17", "isController": false}, {"data": [[1.67597706E12, 150.0]], "isOverall": false, "label": "https://w3schools.com/-5", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-14", "isController": false}, {"data": [[1.67597706E12, 145.0]], "isOverall": false, "label": "https://w3schools.com/-6", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://w3schools.com/-15", "isController": false}, {"data": [[1.67597706E12, 146.0]], "isOverall": false, "label": "https://w3schools.com/-12", "isController": false}, {"data": [[1.67597706E12, 131.0]], "isOverall": false, "label": "https://w3schools.com/-13", "isController": false}, {"data": [[1.67597706E12, 131.0]], "isOverall": false, "label": "https://w3schools.com/-10", "isController": false}, {"data": [[1.67597706E12, 131.0]], "isOverall": false, "label": "https://w3schools.com/-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9", "isController": false}, {"data": [[1.67597706E12, 522.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7", "isController": false}, {"data": [[1.67597706E12, 1865.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://profile.w3schools.com/api/user", "isController": false}, {"data": [[1.67597706E12, 735.0]], "isOverall": false, "label": "https://w3schools.com/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 139.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 730.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2", "isController": false}, {"data": [[1.67597706E12, 234.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 966.0]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8", "isController": false}, {"data": [[1.67597706E12, 75.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1", "isController": false}, {"data": [[1.67597712E12, 131.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5", "isController": false}, {"data": [[1.67597706E12, 247.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0", "isController": false}, {"data": [[1.67597712E12, 133.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6", "isController": false}, {"data": [[1.67597706E12, 0.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3", "isController": false}, {"data": [[1.67597712E12, 124.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 658.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2", "isController": false}, {"data": [[1.67597712E12, 111.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4", "isController": false}, {"data": [[1.67597706E12, 216.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1", "isController": false}, {"data": [[1.67597706E12, 219.0]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4", "isController": false}, {"data": [[1.67597712E12, 128.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 132.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 139.0]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3", "isController": false}, {"data": [[1.67597706E12, 6004.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp", "isController": false}, {"data": [[1.67597706E12, 165.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", "isController": false}, {"data": [[1.67597706E12, 149.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", "isController": false}, {"data": [[1.67597706E12, 249.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", "isController": false}, {"data": [[1.67597706E12, 163.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", "isController": false}, {"data": [[1.67597706E12, 79.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", "isController": false}, {"data": [[1.67597706E12, 217.0]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", "isController": false}, {"data": [[1.67597706E12, 439.5]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", "isController": false}, {"data": [[1.67597712E12, 0.0]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67597712E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.67597706E12, "maxY": 4802.0, "series": [{"data": [[1.67597706E12, 4802.0], [1.67597712E12, 721.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.67597706E12, 58.0], [1.67597712E12, 56.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.67597706E12, 2381.6], [1.67597712E12, 269.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.67597706E12, 4802.0], [1.67597712E12, 721.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.67597706E12, 442.5], [1.67597712E12, 60.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.67597706E12, 2863.499999999997], [1.67597712E12, 289.0499999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67597712E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 59.5, "minX": 1.0, "maxY": 1570.0, "series": [{"data": [[4.0, 515.0], [1.0, 1270.0], [8.0, 422.0], [2.0, 1570.0], [3.0, 1448.0], [14.0, 64.0], [15.0, 59.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1.0, 275.0], [15.0, 272.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1270.0, "series": [{"data": [[4.0, 312.5], [1.0, 1270.0], [8.0, 157.5], [2.0, 256.5], [3.0, 302.0], [14.0, 60.0], [15.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1.0, 274.0], [15.0, 272.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.8666666666666667, "minX": 1.67597706E12, "maxY": 1.0, "series": [{"data": [[1.67597706E12, 0.8666666666666667], [1.67597712E12, 1.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67597712E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.67597706E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.67597706E12, 0.8333333333333334], [1.67597712E12, 0.31666666666666665]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "301", "isController": false}, {"data": [[1.67597712E12, 0.06666666666666667]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666], [1.67597712E12, 0.6166666666666667]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67597712E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.67597706E12, "maxY": 0.06666666666666667, "series": [{"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/user/state-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-6-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-9-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-2-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-10-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning.w3schools.com/-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-4-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-13-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-10-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-6-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://my-learning.w3schools.com/-2-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-3-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning.w3schools.com/-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://cert-api.w3schools.com/certifications-state-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-12-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-7-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-2-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://w3schools.com/-0-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-2-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-5-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-10-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://w3schools.com/-3-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-14-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-0-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-7-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-9-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning.w3schools.com/-4-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-3-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-6-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-7-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-4-success", "isController": false}, {"data": [[1.67597706E12, 0.05]], "isOverall": false, "label": "https://my-learning.w3schools.com/-1-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-10-success", "isController": false}, {"data": [[1.67597712E12, 0.06666666666666667]], "isOverall": false, "label": "https://myl-api.w3schools.com/api/classic/get-set-topic-progress-failure", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/api/user-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-1-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning-legacy.w3schools.com/api/user/check-creds/-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-3-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-8-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-0-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-10-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-17-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://w3schools.com/-2-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-4-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-19-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-12-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-15-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-11-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-11-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-4-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-1-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-7-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-6-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-8-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-12-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1-success", "isController": false}, {"data": [[1.67597706E12, 0.05]], "isOverall": false, "label": "https://my-learning.w3schools.com/-0-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-11-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-0-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-9-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-8-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-9-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-4-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-0-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-16-success", "isController": false}, {"data": [[1.67597706E12, 0.03333333333333333]], "isOverall": false, "label": "https://w3schools.com/-1-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-18-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-8-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-1-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-11-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-2-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-11-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-12-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-7-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning.w3schools.com/-6-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/css/default.asp-9-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://w3schools.com/-8-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://my-learning.w3schools.com/-3-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-12-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666]], "isOverall": false, "label": "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/js/default.asp-3-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/sql/default.asp-1-success", "isController": false}, {"data": [[1.67597712E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.w3schools.com/html/default.asp-6-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67597712E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.67597706E12, "maxY": 0.9333333333333333, "series": [{"data": [[1.67597706E12, 0.8666666666666667], [1.67597712E12, 0.9333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.67597706E12, 0.016666666666666666], [1.67597712E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67597712E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
