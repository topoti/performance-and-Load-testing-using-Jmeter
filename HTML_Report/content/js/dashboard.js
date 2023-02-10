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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 96.42857142857143, "KoPercent": 3.5714285714285716};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8008849557522124, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.75, 500, 1500, "https://w3schools.com/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-2"], "isController": false}, {"data": [0.0, 500, 1500, "https://cert-api.w3schools.com/certifications-state"], "isController": false}, {"data": [0.75, 500, 1500, "https://w3schools.com/-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-9"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-18"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-13"], "isController": false}, {"data": [0.5, 500, 1500, "https://w3schools.com/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://w3schools.com/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-9"], "isController": false}, {"data": [0.0, 500, 1500, "https://my-learning.w3schools.com/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://myl-api.w3schools.com/api/user/state"], "isController": false}, {"data": [0.5, 500, 1500, "https://profile.w3schools.com/api/user"], "isController": false}, {"data": [0.0, 500, 1500, "https://w3schools.com/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-11"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.w3schools.com/html/default.asp"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://my-learning.w3schools.com/-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://my-learning-legacy.w3schools.com/api/user/check-creds/"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://my-learning.w3schools.com/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-5"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "https://my-learning.w3schools.com/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://my-learning.w3schools.com/-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-3"], "isController": false}, {"data": [0.75, 500, 1500, "https://my-learning.w3schools.com/-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://my-learning.w3schools.com/-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://my-learning.w3schools.com/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/html/default.asp-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/css/default.asp"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-3"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://myl-api.w3schools.com/api/classic/get-set-topic-progress"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/sql/default.asp"], "isController": false}, {"data": [0.5, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4"], "isController": false}, {"data": [0.75, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2"], "isController": false}, {"data": [0.25, 500, 1500, "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.w3schools.com/js/default.asp"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 112, 4, 3.5714285714285716, 472.1160714285717, 56, 4802, 208.5, 1428.2000000000003, 2368.2999999999997, 4594.780000000007, 1.7002413735521382, 218.54603863684665, 1.7464803248295961], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://w3schools.com/-3", 2, 0, 0.0, 628.0, 268, 988, 628.0, 988.0, 988.0, 988.0, 1.2698412698412698, 77.48635912698413, 0.6516617063492064], "isController": false}, {"data": ["https://w3schools.com/-4", 1, 0, 0.0, 285.0, 285, 285, 285.0, 285.0, 285.0, 285.0, 3.5087719298245617, 55.61609100877193, 1.8160635964912282], "isController": false}, {"data": ["https://w3schools.com/-1", 2, 0, 0.0, 296.0, 132, 460, 296.0, 460.0, 460.0, 460.0, 1.6090104585679805, 135.70211936846337, 0.8084334774738535], "isController": false}, {"data": ["https://w3schools.com/-2", 2, 0, 0.0, 135.0, 60, 210, 135.0, 210.0, 210.0, 210.0, 2.506265664160401, 60.73533442982456, 1.270265507518797], "isController": false}, {"data": ["https://cert-api.w3schools.com/certifications-state", 1, 0, 0.0, 1763.0, 1763, 1763, 1763.0, 1763.0, 1763.0, 1763.0, 0.5672149744753262, 0.10801457033465683, 0.9084302325581396], "isController": false}, {"data": ["https://w3schools.com/-0", 2, 0, 0.0, 532.0, 90, 974, 532.0, 974.0, 974.0, 974.0, 0.9610764055742432, 2.0385331571359924, 0.48288458073041807], "isController": false}, {"data": ["https://w3schools.com/-9", 1, 0, 0.0, 800.0, 800, 800, 800.0, 800.0, 800.0, 800.0, 1.25, 166.661376953125, 0.631103515625], "isController": false}, {"data": ["https://w3schools.com/-18", 1, 0, 0.0, 623.0, 623, 623, 623.0, 623.0, 623.0, 623.0, 1.6051364365971108, 110.71992877207063, 0.8151083467094703], "isController": false}, {"data": ["https://w3schools.com/-19", 1, 0, 0.0, 683.0, 683, 683, 683.0, 683.0, 683.0, 683.0, 1.4641288433382138, 45.76689467423133, 0.7435029282576866], "isController": false}, {"data": ["https://w3schools.com/-7", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 217.0, 4.608294930875576, 86.15801411290323, 2.380652361751152], "isController": false}, {"data": ["https://w3schools.com/-16", 1, 0, 0.0, 633.0, 633, 633, 633.0, 633.0, 633.0, 633.0, 1.5797788309636651, 95.9407089257504, 0.8037741903633491], "isController": false}, {"data": ["https://w3schools.com/-8", 1, 0, 0.0, 322.0, 322, 322, 322.0, 322.0, 322.0, 322.0, 3.105590062111801, 636.0757958074533, 1.5649262422360248], "isController": false}, {"data": ["https://w3schools.com/-17", 1, 0, 0.0, 1086.0, 1086, 1086, 1086.0, 1086.0, 1086.0, 1086.0, 0.9208103130755064, 135.7538774746777, 1.9036674148250459], "isController": false}, {"data": ["https://w3schools.com/-5", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 15.324163210900474, 2.4437203791469195], "isController": false}, {"data": ["https://w3schools.com/-14", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 214.5444808467742, 8.253528225806452], "isController": false}, {"data": ["https://w3schools.com/-6", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 205.0, 4.878048780487805, 44.90282012195122, 2.5200076219512195], "isController": false}, {"data": ["https://w3schools.com/-15", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 236.5638469827586, 8.805899784482758], "isController": false}, {"data": ["https://w3schools.com/-12", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 136.99918179898648, 1.7122835726351353], "isController": false}, {"data": ["https://w3schools.com/-13", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 5.253994626696833, 2.359657805429864], "isController": false}, {"data": ["https://w3schools.com/-10", 1, 0, 0.0, 1491.0, 1491, 1491, 1491.0, 1491.0, 1491.0, 1491.0, 0.670690811535882, 809.3201133886653, 0.3445150067069081], "isController": false}, {"data": ["https://w3schools.com/-11", 1, 0, 0.0, 207.0, 207, 207, 207.0, 207.0, 207.0, 207.0, 4.830917874396135, 102.42583786231884, 2.4673535628019323], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-9", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 7.076075819672131, 9.749615778688526], "isController": false}, {"data": ["https://my-learning.w3schools.com/", 1, 0, 0.0, 2554.0, 2554, 2554, 2554.0, 2554.0, 2554.0, 2554.0, 0.39154267815191857, 807.3632965446359, 2.12939567834769], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-8", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.572642543859649, 10.34813596491228], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-12", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 10.302734375], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-7", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 7.644127155172414, 10.455953663793103], "isController": false}, {"data": ["https://myl-api.w3schools.com/api/user/state", 1, 0, 0.0, 2678.0, 2678, 2678, 2678.0, 2678.0, 2678.0, 2678.0, 0.3734129947722181, 0.9320738424197162, 0.567412714712472], "isController": false}, {"data": ["https://profile.w3schools.com/api/user", 1, 0, 0.0, 670.0, 670, 670, 670.0, 670.0, 670.0, 670.0, 1.492537313432836, 0.890566697761194, 2.044951026119403], "isController": false}, {"data": ["https://w3schools.com/", 1, 0, 0.0, 3208.0, 3208, 3208, 3208.0, 3208.0, 3208.0, 3208.0, 0.3117206982543641, 681.4713704021196, 3.654803421134663], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-10", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 6.961945564516129, 9.592363911290322], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-11", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.572642543859649, 10.382401315789473], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp", 1, 0, 0.0, 721.0, 721, 721, 721.0, 721.0, 721.0, 721.0, 1.3869625520110958, 714.8545856449376, 9.31052791262136], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-8", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.572642543859649, 10.34813596491228], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-9", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 7.44207974137931, 10.25390625], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-6", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 7.644127155172414, 10.455953663793103], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com", 1, 0, 0.0, 4802.0, 4802, 4802, 4802.0, 4802.0, 4802.0, 4802.0, 0.20824656393169513, 356.6301719986464, 0.8695920970428989], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-7", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.514565677966102, 10.278734110169491], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-4", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.649739583333334, 10.074869791666668], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-5", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 10.091145833333334], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-2", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 7.268186475409836, 9.813652663934427], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-2", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 9.977213541666668], "isController": false}, {"data": ["https://my-learning.w3schools.com/-6", 1, 0, 0.0, 305.0, 305, 305, 305.0, 305.0, 305.0, 305.0, 3.278688524590164, 41.38383709016394, 1.7225922131147542], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-1", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.3159427966101696, 9.831832627118645], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-3", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 7.052951388888888, 9.486607142857142], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-0", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 850.0371255165289, 4.140302169421488], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-0", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 954.569666838843, 4.140302169421488], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-1", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 6.347656249999999, 8.530560661764705], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-6", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.514565677966102, 10.278734110169491], "isController": false}, {"data": ["https://my-learning-legacy.w3schools.com/api/user/check-creds/", 1, 0, 0.0, 1270.0, 1270, 1270, 1270.0, 1270.0, 1270.0, 1270.0, 0.7874015748031495, 0.5913201279527559, 0.4006213090551181], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-5", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 10.091145833333334], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-4", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 7.913523706896552, 10.422279094827585], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp-3", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 7.052951388888888, 9.486607142857142], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-7", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 311.60481770833337, 8.544921875], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-8", 1, 0, 0.0, 90.0, 90, 90, 90.0, 90.0, 90.0, 90.0, 11.11111111111111, 696.4084201388889, 5.631510416666667], "isController": false}, {"data": ["https://my-learning.w3schools.com/-1", 3, 0, 0.0, 172.0, 89, 311, 116.0, 311.0, 311.0, 311.0, 3.8314176245210727, 43.95529015006385, 2.1339699074074074], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-5", 1, 0, 0.0, 218.0, 218, 218, 218.0, 218.0, 218.0, 218.0, 4.587155963302752, 14.832102924311927, 2.34733371559633], "isController": false}, {"data": ["https://my-learning.w3schools.com/-0", 3, 0, 0.0, 398.3333333333333, 181, 589, 425.0, 589.0, 589.0, 589.0, 2.912621359223301, 241.50485436893203, 1.5008722694174756], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-6", 1, 0, 0.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 220.0, 4.545454545454545, 41.84126420454545, 2.3304332386363638], "isController": false}, {"data": ["https://my-learning.w3schools.com/-3", 1, 0, 0.0, 419.0, 419, 419, 419.0, 419.0, 419.0, 419.0, 2.3866348448687353, 204.47680489260145, 2.6430116348448687], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-3", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 262.2757248098859, 1.9159933460076044], "isController": false}, {"data": ["https://my-learning.w3schools.com/-2", 2, 0, 0.0, 729.5, 175, 1284, 729.5, 1284.0, 1284.0, 1284.0, 1.0245901639344264, 1.8980933017418034, 0.6013463755122951], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-4", 1, 0, 0.0, 169.0, 169, 169, 169.0, 169.0, 169.0, 169.0, 5.9171597633136095, 2.7158838757396446, 3.5768768491124256], "isController": false}, {"data": ["https://my-learning.w3schools.com/-5", 1, 0, 0.0, 1649.0, 1649, 1649, 1649.0, 1649.0, 1649.0, 1649.0, 0.6064281382656156, 1068.8367002728926, 0.3168350136446331], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-1", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 242.4468994140625, 7.7667236328125], "isController": false}, {"data": ["https://my-learning.w3schools.com/-4", 1, 0, 0.0, 1949.0, 1949, 1949, 1949.0, 1949.0, 1949.0, 1949.0, 0.513083632632119, 91.63453213186249, 0.8432810094920472], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-2", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 232.64695631970258, 1.8768877788104088], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-9", 1, 0, 0.0, 247.0, 247, 247, 247.0, 247.0, 247.0, 247.0, 4.048582995951417, 187.8874620445344, 2.0717358299595143], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-12", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 481.76827017716533, 4.129244586614173], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-10", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 150.62235169491527, 8.673199152542374], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-11", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 826.1439732142857, 7.268415178571428], "isController": false}, {"data": ["https://www.w3schools.com/html/default.asp-0", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 370.8287348977695, 1.865996747211896], "isController": false}, {"data": ["https://www.w3schools.com/css/default.asp", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 391.7855525362319, 27.86033740942029], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-0", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 211.0, 4.739336492890995, 486.6567313388626, 2.3696682464454977], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-2", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.514565677966102, 10.146318855932204], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-1", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.3159427966101696, 9.831832627118645], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-8", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 6.744384765625, 9.21630859375], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-7", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 64.0, 15.625, 6.927490234375, 9.4757080078125], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-9", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 6.851438492063492, 9.440104166666666], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-4", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 8.196149553571429, 10.794503348214285], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-3", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 63.0, 15.873015873015872, 7.052951388888888, 9.486607142857142], "isController": false}, {"data": ["Test", 1, 1, 100.0, 19671.0, 19671, 19671, 19671.0, 19671.0, 19671.0, 19671.0, 0.05083625641807737, 346.59911401936864, 2.951382269584668], "isController": true}, {"data": ["https://www.w3schools.com/js/default.asp-6", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 10.107421875], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-5", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.389322916666667, 10.091145833333334], "isController": false}, {"data": ["https://myl-api.w3schools.com/api/classic/get-set-topic-progress", 4, 4, 100.0, 274.25, 272, 276, 274.5, 276.0, 276.0, 276.0, 0.1307787876806382, 0.03026813738311646, 0.06334597528280914], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-12", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.514565677966102, 10.477356991525424], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-11", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 60.0, 16.666666666666668, 7.194010416666667, 9.86328125], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp-10", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 7.3159427966101696, 10.08011122881356], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-12", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.7782346491228065, 10.844983552631579], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-11", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.572642543859649, 10.382401315789473], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp-10", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 57.0, 17.543859649122805, 7.572642543859649, 10.433799342105262], "isController": false}, {"data": ["https://www.w3schools.com/sql/default.asp", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 449.0009293680297, 28.585327602230482], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-5", 1, 0, 0.0, 1382.0, 1382, 1382, 1382.0, 1382.0, 1382.0, 1382.0, 0.723589001447178, 871.9685577966716, 0.3731005788712012], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-6", 1, 0, 0.0, 2393.0, 2393, 2393, 2393.0, 2393.0, 2393.0, 2393.0, 0.41788549937317176, 147.78128917676557, 0.43951433869619727], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-3", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 319.0, 3.134796238244514, 74.80040164576802, 1.6990350705329154], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-4", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 3.4908795248868776, 2.271281108597285], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-1", 2, 0, 0.0, 847.0, 246, 1448, 847.0, 1448.0, 1448.0, 1448.0, 0.835421888053467, 10.463169642857142, 0.43239609440267335], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-2", 1, 0, 0.0, 711.0, 711, 711, 711.0, 711.0, 711.0, 711.0, 1.4064697609001406, 155.93272020042195, 0.7252109704641351], "isController": false}, {"data": ["https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com-0", 2, 0, 0.0, 1839.5, 1324, 2355, 1839.5, 2355.0, 2355.0, 2355.0, 0.5357621216180016, 92.93536950843826, 0.2854084349049022], "isController": false}, {"data": ["https://www.w3schools.com/js/default.asp", 1, 0, 0.0, 363.0, 363, 363, 363.0, 363.0, 363.0, 363.0, 2.7548209366391188, 297.41843147382923, 21.18037620523416], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["401/Unauthorized", 4, 100.0, 3.5714285714285716], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 112, 4, "401/Unauthorized", 4, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://myl-api.w3schools.com/api/classic/get-set-topic-progress", 4, 4, "401/Unauthorized", 4, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
