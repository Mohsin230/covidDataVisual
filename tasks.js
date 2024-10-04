var svgWidth = 600, svgHeight = 600;

var radius = Math.min(svgWidth/6, svgHeight/2);

var  svg = d3.select("#svg1")
.attr("height", svgHeight)
.attr("width", svgWidth)

var  svg2 = d3.select("#svg2")
.attr("height", svgHeight/2)
.attr("width", svgWidth);

var  svg3 = d3.select("#svg3")
.attr("height", svgHeight/2)
.attr("width", svgWidth/2)

var  svg4 = d3.select("#svg4")
.attr("height", svgHeight/2)
.attr("width", svgWidth/2)

var  svg5 = d3.select("#svg5")
.attr("height", svgHeight/2)
.attr("width", svgWidth);

var barWidth = (svgWidth / 4);

var xScale = d3.scaleLinear()
        .domain([0,100])
        .range([0,(svgWidth-120)]);

var yScale = d3.scaleBand()
      .range([(svgHeight-400),0])
      .domain(2)
      .padding(.1);


//var xAxisTranslate = svgHeight - 20



function update(data){

        barData = [+data['Cases in the last 7 days'], +data['Cases in the preceding 7 days']];
        barData2 = [+data['Deaths in the last 7 days'], +data['Deaths in the preceding 7 days']];
        pieData = [Math.abs(data['Weekly Case % Change']), 100-Math.abs(data['Weekly Case % Change'])];
        pieData2 = [Math.abs(data['Weekly Death % Change']), 100-Math.abs(data['Weekly Death % Change'])];

        //console.log(barData);
        //console.log(Math.max.apply(null, barData));


        var y_axis = d3.axisLeft().scale(yScale);

        pieChart = svg3.append("g")
        .attr("transform", "translate(" + svgWidth / 4 + "," + svgHeight / 4 + ")");

        pieChart2 = svg4.append("g")
        .attr("transform", "translate(" + svgWidth / 4 + "," + svgHeight / 4 + ")");

        var pie = d3.pie();
        var arc = d3.arc().innerRadius(0).outerRadius(radius);

        //Generate groups
        var color = d3.scaleOrdinal(['#4daf4a','#D3D3D3']);
        var negColor = d3.scaleOrdinal(['#f03939','#D3D3D3']);

        var arcs = pieChart.selectAll("arc")
                    .data(pie(pieData))
                    .enter()
                    .append("g")
                    .attr("class", "arc");

        svg3.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/4 - 10)
        .attr('y', svgHeight/4)
        .text(data['Weekly Case % Change'] + "%")
        .attr("font-weight", "bold");

        svg3.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/4 - 80)
        .attr('y', svgHeight/2- 30)
        .text('Weekly Case % Change')
        .attr("font-weight", "bold");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                if(data['Weekly Case % Change'] >= 0){
                  return negColor(i);
                }
                return color(i)
                
            })
            .attr("d", arc);
        
        var arcs2 = pieChart2.selectAll("arc")
            .data(pie(pieData2))
            .enter()
            .append("g")
            .attr("class", "arc");

        svg4.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/4 - 10)
        .attr('y', svgHeight/4)
        .text(data['Weekly Death % Change'] + "%")
        .attr("font-weight", "bold");

        svg4.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/4 - 80)
        .attr('y', svgHeight/2- 30)
        .text('Weekly Death % Change')
        .attr("font-weight", "bold");

        //Draw arc paths
        arcs2.append("path")
            .attr("fill", function(d, i) {
              if(data['Weekly Death % Change'] >= 0){
                return negColor(i);
              }
              return color(i)
            })
            .attr("d", arc);

        svg2.append("g")
        .transition()
        .duration(1000)
        .attr("class", 'y axis')
        .attr("transform", "translate(20, 50)")
        .call(y_axis);

        xScale
          .domain([0, Math.max.apply(null, barData)]);
           
        var x_axis = d3.axisBottom().scale(xScale);
        
        var barChart = svg2.selectAll("rect")
        .data(barData)


        let count = 100;
        barChart.enter()
        .append("rect")
        .attr("class", "rect")
        .merge(barChart)
        .transition()
        .duration(1000)
        .attr("height", 50)
        .attr("width", function(d){return xScale(d);})
        .attr("x", 20)
        .attr("y", function(d){count = count-70; return count+150;})
        .attr("fill", d3.color("steelblue"));


        svg2.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/2 - 70)
        .attr('y', 40)
        .text(data['Country/Other']);

        svg2.append("text")
        .transition()
        .duration(1000)
        .attr('x', 0)
        .attr('y', 40)
        .text("Population: " + data['Population']);

        svg2.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/2 - 70)
        .attr('y', 300)
        .text("Total Cases");

        svg2.append("text")
        .transition()
        .duration(1000)
        .attr('x', 30)
        .attr('y', 140)
        .text('Cases in the preceding 7 days');

        svg2.append("text")
        .transition()
        .duration(1000)
        .attr('x', 30)
        .attr('y', 210)
        .text('Cases in the last 7 days');

        xaxisEle = svg2.append("g")
        .merge(barChart)
        .transition()
        .duration(1000)
        .attr("transform", "translate(20," + (svgHeight-350) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

        barChart
                .exit()
                .remove();
            
        svg5.append("g")
        .transition()
        .duration(1000)
        .attr("class", 'y axis')
        .attr("transform", "translate(20, 50)")
        .call(y_axis);

        xScale
          .domain([0, Math.max.apply(null, barData2)]);
            
        var x_axis = d3.axisBottom().scale(xScale);
        
        var barChart2 = svg5.selectAll("rect")
        .data(barData2)


        let count2 = 100;
        barChart2.enter()
        .append("rect")
        .attr("class", "rect")
        .merge(barChart2)
        .transition()
        .duration(1000)
        .attr("height", 50)
        .attr("width", function(d){return xScale(d);})
        .attr("x", 20)
        .attr("y", function(d){count2 = count2-70; return count2+150;})
        .attr("fill", d3.color("steelblue"));


        svg5.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/2 - 70)
        .attr('y', 40)
        .text(data['Country/Other']);

        svg5.append("text")
        .transition()
        .duration(1000)
        .attr('x', 30)
        .attr('y', 140)
        .text('Deaths in the preceding 7 days');

        svg5.append("text")
        .transition()
        .duration(1000)
        .attr('x', 30)
        .attr('y', 210)
        .text('Deaths in the last 7 days');

        svg5.append("text")
        .transition()
        .duration(1000)
        .attr('x', svgWidth/2 - 70)
        .attr('y', 300)
        .text("Total Deaths");

        xaxisEle2 = svg5.append("g")
        .merge(barChart2)
        .transition()
        .duration(1000)
        .attr("transform", "translate(20," + (svgHeight-350) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

        barChart2
                .exit()
                .remove()
        

}
// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(120)
  .center([-50,50])
  .translate([svgWidth / 2, svgHeight / 2]);

var continentSpecify = 0;
// Data and color scale
var data = d3.map();
var data2 = d3.map();
var colorSchemeGreen = ["#0eff00", "#1fc600", "#089000", "#0a5d00", "#063b00"];
var colorSchemeRed = ["#f26161", "#f03939", "#ea0909", "#9a0707", "#300000"];
var posColorScale = d3.scaleLinear()
  .domain([0, 100, 1000, 10000, 150000])
  .range(colorSchemeGreen);
var negColorScale = d3.scaleLinear()
  .domain([0, 100, 1000, 10000, 150000])
  .range(colorSchemeRed);
var naDataset = [];
var saDataset = [];
var naSaDataset = [];
var sortedDataset
  d3.csv("north_america_covid_weekly_trend.csv", function(error, data) {// with header.. 
  //console.log(data);
  data.sort((a, b) => {
    return parseInt(a['Cases in the last 7 days/1M pop']) - parseInt(b['Cases in the last 7 days/1M pop']);
  });
    data.forEach(function(d) {
              naSaDataset.push(d);
              naDataset.push(d);
      });

      });
      d3.csv("covid_south_america_weekly_trend.csv", function(error, data2) {// without header..
        data2.sort((a, b) => {
          return parseInt(a['Cases in the last 7 days/1M pop']) - parseInt(b['Cases in the last 7 days/1M pop']);
        });
        data2.forEach(function(d2) {
                  naSaDataset.push(d2);
                  saDataset.push(d2);
          });
          naSaDataset.sort((a, b) => {
            return parseInt(a['Cases in the last 7 days/1M pop']) - parseInt(b['Cases in the last 7 days/1M pop']);
          });
          let topLabels = 0;
          svg.selectAll("text")
          .data(naSaDataset.slice(0,5))
          .enter()
          .append("text")
          .transition()
          .duration(1000)
          .attr('x', 400)
          .attr('y', function(d){
            topLabels = topLabels + 20;
            return 90 + topLabels;
          })
          .attr("font-size", "15px")
          .text(function(d){
            return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
          });
          //console.log(naSaDataset.splice(0,5) + naSaDataset.splice(-5));
          topLabels = 0;
          svg.selectAll("text.labels")
          .data(naSaDataset.slice(-5))
          .enter()
          .append("text")
          .transition()
          .duration(1000)
          .attr('x', 400)
          .attr('y', function(d){
            topLabels = topLabels + 20;
            return 240 + topLabels;
          })
          .attr("font-size", "15px")
          .text(function(d){
            return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
          });
          });
  //let highestToLowest = numbers.sort((a, b) => b-a);
  console.log(naSaDataset);
  console.log(naDataset);
  d3.queue()
  .defer(d3.json, "nasa2geo.json")
  .defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { console.log(d);
        data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })
  .defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { console.log(d);
        data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })      
  .await(ready);
console.log(data);
function ready(error, topo) {

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 390)
  .attr('y', 80)
  .text("Bottom 5 cases this week/1M pop")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 390)
  .attr('y', 230)
  .text("Top 5 cases this week/1M pop")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 10)
  .attr('y', 550)
  .text("Increase in cases this week: Red")
  .attr("font-size", "15px")
  .attr("fill", "red");

  svg.selectAll('rect.values').data(colorSchemeRed).enter()
  .append("rect")
  .attr("class", "rect")
  .attr("height", 15)
  .attr("width", 10)
  .attr("x", 20)
  .attr("y", function(d,i){
    return 440 + i*15;
  })
  .attr("fill", function(d){
    return d;
  });

  svg.selectAll('rect.labels').data(colorSchemeGreen).enter()
  .append("rect")
  .attr("class", "rect")
  .attr("height", 15)
  .attr("width", 10)
  .attr("x", 30)
  .attr("y", function(d,i){
    return 440 + i*15;
  })
  .attr("fill", function(d){
    return d;
  });

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 10)
  .attr('y', 530)
  .text("Decrease in cases this week: Green")
  .attr("font-size", "15px")
  .attr("fill", "green");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 10)
  .attr('y', 430)
  .text("Total absolute Cases this week:")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 50)
  .attr('y', 450)
  .text("0 - 99")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 50)
  .attr('y', 465)
  .text("100 - 999")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 50)
  .attr('y', 480)
  .text("1000 - 9999")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 50)
  .attr('y', 495)
  .text("10000 - 149999")
  .attr("font-size", "15px");

  svg.append("text")
  .transition()
  .duration(1000)
  .attr('x', 50)
  .attr('y', 510)
  .text("150000+")
  .attr("font-size", "15px");

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }
  // Draw the map
  if(continentSpecify > 0){
    topo.features = topo.features.filter(function(d){ return d.properties.continent=="North America"})
  }
  else if(continentSpecify < 0){
    topo.features = topo.features.filter(function(d){ return d.properties.continent=="South America"})
  }
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.cases = data.get(d.properties.name) || 0;
        //d.cases = data2.get(d.properties.name_long) || data2.get(d.properties.name) || data2.get(d.properties.id) || data2.get(d.properties.adm0_a3_us) || data2.get(d.properties.name_long.replace(" and", "")) || 0;
        //console.log(data.get(d.properties.name));
        if(Math.sign(d.cases) >= 0){
                return negColorScale(Math.abs(d.cases));
        }
        else{
                return posColorScale(Math.abs(d.cases));
        }

      })
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      .on("click", function(d){
        //d.objName = d.properties.name_long || d.properties.name || d.properties.id || d.properties.adm0_a3_us || d.properties.name_long.replace(" and", "");
        myObj = naSaDataset.find(obj => obj['Country/Other'] == d.properties.name);
        //console.log(d.properties.name_long);
        //console.log(d.objName);
        svg2.selectAll("*").transition()
        .duration(50)
        .remove();

        svg3.selectAll("*").transition()
        .duration(50)
        .remove();

        svg4.selectAll("*").transition()
        .duration(50)
        .remove();

        svg5.selectAll("*").transition()
        .duration(50)
        .remove();
        update(myObj);

        //console.log(myObj);
      });
      
    }

function zoomNa(){
        svg.selectAll("*").transition()
        .duration(50)
        .remove();
        continentSpecify = 1;
        d3.queue()
        .defer(d3.json, "nasa2geo.json")
        .defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { console.log(d);
              data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })
        .await(ready);
        
        //console.log(naDataset.splice(0,5));
        let topLabels = 0;
        svg.selectAll("text.values")
        .data(naDataset.slice(0,5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 90 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
        //console.log(naDataset.splice(0,5) + naSaDataset.splice(-5));
        topLabels = 0;
        svg.selectAll("text.labels")
        .data(naDataset.slice(-5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 240 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
}

function zoomSa(){
        svg.selectAll("*").transition()
        .duration(50)
        .remove();
        //projection.scale(700);
        continentSpecify = -1;
        d3.queue()
        .defer(d3.json, "nasa2geo.json")
        .defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { console.log(d);
              data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })
        .await(ready);

        let topLabels = 0;
        svg.selectAll("text.values")
        .data(saDataset.slice(0,5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 90 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
        //console.log(naDataset.splice(0,5) + naSaDataset.splice(-5));
        topLabels = 0;
        svg.selectAll("text.labels")
        .data(saDataset.slice(-5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 240 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
}

function zoomDef(){
        svg.selectAll("*").transition()
        .duration(50)
        .remove();
        continentSpecify = 0;
        d3.queue()
        .defer(d3.json, "nasa2geo.json")
        .defer(d3.csv, "north_america_covid_weekly_trend.csv", function(d) { console.log(d);
              data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })
        .defer(d3.csv, "covid_south_america_weekly_trend.csv", function(d) { console.log(d);
              data.set(d['Country/Other'],  +Math.sign(d['Weekly Case % Change'] +0.1) * d['Cases in the last 7 days']); })      
        .await(ready);

        let topLabels = 0;
        svg.selectAll("text.values")
        .data(naSaDataset.slice(0,5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 90 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
        //console.log(naDataset.splice(0,5) + naSaDataset.splice(-5));
        topLabels = 0;
        svg.selectAll("text.labels")
        .data(naSaDataset.slice(-5))
        .enter()
        .append("text")
        .transition()
        .duration(1000)
        .attr('x', 400)
        .attr('y', function(d){
          topLabels = topLabels + 20;
          return 240 + topLabels;
        })
        .attr("font-size", "15px")
        .text(function(d){
          return d['Cases in the last 7 days/1M pop'] + ": " + d['Country/Other'];
        });
}