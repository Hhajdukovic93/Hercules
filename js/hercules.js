//  Elementary SVG variables
var svg;
var width =  "100%";
var height = "100%";

//  D3 arc variables
var arcTimer;
var arcCycle;
var arcTabatas;

//  User defined values
var prepareValue;
var topPrepareValue;

var workValue;
var topWorkValue;

var restValue;
var topRestValue;

var cyclesValue;
var topCyclesValue;

var tabatasValue;
var topTabatasValue;


//  Timer  intervals
var prepareInterval
var prepareColoringInterval;


//  All timer cycle values
var currentTimerArcValue;
var currentCycleArcValue;
var currentTabatasArcValue;


//  Constants
var pi = Math.PI;

// ---------------------------------------------------------------------------------- //



// Boolean counters
var prepareCounter;




// ---------------------------------------------------------------------------------- //

function Setup() 
{
    //  SVG area
    svg = d3.select("#js-clock")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //  Timer circle
    svg.append("circle")
      .attr("cx","200")
      .attr("cy","190")
      .attr("r","175")
      .style("stroke","lightgray")
      .style("stroke-width","8")
      .style("fill","white");
                        
    // Cycle circle
    svg.append("circle")
      .attr("cx","150")
      .attr("cy","270")
      .attr("r","30")
      .style("stroke","lightgray")
      .style("stroke-width","8")
      .style("fill","white");

    // Tabatas circle
    svg.append("circle")
      .attr("cx","250")
      .attr("cy","270")
      .attr("r","30")
      .style("stroke","lightgray")
      .style("stroke-width","8")
      .style("fill","white");
}
// ---------------------------------------------------------------------------------- //

function Play()
{
    //  Prepare mode
    prepareValue = document.getElementById("prepare").value;
    // Global maximal value (top)
    topPrepareValue = prepareValue;
    // Counter for max turns
    prepareCounter = prepareValue;

    Prepare();
}
// ---------------------------------------------------------------------------------- //

function Prepare()
{


      prepareInterval = setInterval(PrepareCalcute, 1000);
      prepareColoringInterval = setInterval(arcTimer, 1100);



      function PrepareCalcute()
      {
        console.log("Brojač : " + prepareCounter);


        var top = topPrepareValue;

        --prepareValue;

        var skala = d3.scaleLinear() 
          .domain([0,top]) 
          .range([0,6.4]);

        var opa = top-prepareValue;

        currentTimerArcValue = skala(opa);

        console.log("Top value:" + top);
        //console.log("Current value:" + currentTimerArcValue);  
        //arcTimer();

        prepareCounter--;
      }
}


// ---------------------------------------------------------------------------------- //

function Reset()
{ 
    // Timer cycle
    arcTimer = d3.arc()
      .innerRadius(170)
      .outerRadius(180)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(6.3) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "lightgray")
      .attr("transform", "translate(200,190)");

    clearInterval(prepareInterval);
    clearInterval(prepareColoringInterval);

}

// ---------------------------------------------------------------------------------- //
function checkCircleEnd()
{
  if(currentTimerArcValue > 6.7)
  {
    arcTimer = d3.arc()
      .innerRadius(170)
      .outerRadius(180)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(6.3) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "lightgray")
      .attr("transform", "translate(200,190)");

    //currentTimerArcValue = 0;
    prepareValue = topPrepareValue;
    Prepare();
  }
}
// ---------------------------------------------------------------------------------- //
function arcTimer()
{
    checkCircleEnd();
    var currentValue = currentTimerArcValue;

    console.log("Bojam : " + currentValue);

    arcTimer = d3.arc()
      .innerRadius(170)
      .outerRadius(180)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "#D8FF1A")
      .attr("transform", "translate(200,190)");
}














































/*      //  Work mode
    workValue = document.getElementById("work").value;
    // Global maximal value (top)
    topWorkValue = workValue;
    //console.log(workValue);
    //  Rest mode
    restValue = document.getElementById("rest").value;
    // Global maximal value (top)
    topPrepareValue = restValue;
    //console.log(restValue);


    // ------------   Mini timers  -------------------------- 
    cyclesValue = document.getElementById("cycles").value;
    topCyclesValue = cyclesValue;
    //console.log(cyclesValue);

    tabatasValue = document.getElementById("tabatas").value;
    topTabatasValue = tabatasValue;
    //console.log(tabatasValue);*/
// ---------------------------------------------------------------------------------- //
/*function Pause()
{
  clearInterval(prepareInterval);
  clearInterval(prepareColoringInterval);
}*/


/*// ---------------------------------------------------------------------------------- //
function arcCycles()
{
    var currentValue = currentCyclesArcValue;

    arcCycle = d3.arc()
      .innerRadius(26)
      .outerRadius(34)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcCycle)
      .attr("fill", "#000")
      .attr("transform", "translate(150,270)");
}
// ---------------------------------------------------------------------------------- //
function arcTabatas()
{
    var currentValue = currentTabatasArcValue;

    arcTabatas = d3.arc()
      .innerRadius(26)
      .outerRadius(34)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcTabatas)
      .attr("fill", "#000")
      .attr("transform", "translate(250,270)");
  }*/
// ---------------------------------------------------------------------------------- //