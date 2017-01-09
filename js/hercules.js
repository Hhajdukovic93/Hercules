// ------------------------------------------------------------------------------------- //
// --------------------------------  VARIABLES   --------------------------------------- //
// ------------------------------------------------------------------------------------- //

// -------------------------------- BASIC SVG  ---------------------------------------- //
var svg;
var width =  "100%";
var height = "100%";
var pi = Math.PI;

// --------------------------------  D3  ARC ------------------------------------------- //
var arcTimer;
var arcCycle;
var arcTabatas;

// --------------------------------  USER INPUT  ---------------------------------------- //
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

// ------------------------------    TIMERS  -------------------------------------------- //
var prepareInterval;
var prepareColoringInterval;

var workInterval;
var workColoringInterval;

var restInterval;
var restColoringInterval;

var cyclesInterval;
var cyclesColoringInterval;


var currentTimerArcValue;
var currentCycleArcValue;
var currentTabatasArcValue;


// -------------------------------- COUNTERS  ----------------------------------------- //

var prepareCounter;
var workCounter;
var restCounter;
var cyclesCounter;

// --------------------------------- SOUND  ------------------------------------------- //

var workBeepSound;
var restBeepSound;

// -------------------------------- BOOLEAN   --------------------------------------------- //

var prepareModeIsActive = false;
var workModeIsActive = false;
var restModeIsActive = false;

var secondTurnCycleBoolean = false;
var soundSecondTurnCheacker = false;
var pauseIsOn = false;

// ------------------------------------------------------------------------------------- //




// ------------------------------------------------------------------------------------- //
// --------------------------------  METHODS   ----------------------------------------- //
// ------------------------------------------------------------------------------------- //

// --------------------------  SETUP  METHOD   ---------------------------------------- //
function Setup() 
{
// ---------------------------  GRAPHICS  --------------------------------------------- //  
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

// ------------------------------  TEXT  --------------------------------------------- // 

    //  Text for timer
    svg.append("text")
        .attr("x", "147")
        .attr("y", "90")
        .text("HERCULES")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "gray")
        .attr("id","mainTitle");

    // Text for cycles
    svg.append("text")
        .attr("x", "134")
        .attr("y", "264")
        .text("CYCLES")
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "gray");

    // Text for tabatas
    svg.append("text")
        .attr("x", "234")
        .attr("y", "264")
        .text("TABATAS")
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "gray");

// -------------------------------  NUMBERS  -------------------------------------------- //

    //Add the variable number for MAIN TIMER
    svg.append("text")
        .attr("x", "172")
        .attr("y", "189")
        //.attr("x", function(d) { return d.cx; })
        .text("0")
        .attr("font-family", "sans-serif")
        .attr("font-size", "90px")
        .attr("fill", "black")
        .attr("id", "mainTimerDisplay");

  //Add the variable number for cycles
    svg.append("text")
        .attr("x", "146")
        .attr("y", "282")
        .text("0")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("id", "cyclesTimerDisplay");

  //Add the variable number for tabatas
    svg.append("text")
        .attr("x", "246")
        .attr("y", "282")
        .text("0")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("id", "tabatasTimerDisplay");
}
// ---------------------------------------------------------------------------------- //





// --------------------------  PLAY  METHOD   ---------------------------------------- //
function Play()
{
    if(pauseIsOn)
    {
        if(workModeIsActive)
        {
            Work();
            console.log("Nastavljen u WORK");
        }
        else if(restModeIsActive)
        {
            Rest();
            console.log("Nastavljen u REST");
        }
        else // prepareModeIsActive
        { 
            Prepare();
            console.log("Nastavljen u PREPARE");

            
        }
    }
    else
    {
          //  PREPARE MODE - user input
          prepareValue = document.getElementById("prepare").value;
          topPrepareValue = prepareValue;

          //  WORK MODE  - user input
          workValue = document.getElementById("work").value;
          topWorkValue = workValue;


          //  REST MODE - user input
          restValue = document.getElementById("rest").value;
          topRestValue = restValue;

          //  CYCLES user input
          cyclesValue = document.getElementById("cycles").value;
          topCyclesValue = cyclesValue;
          cyclesCounter = topCyclesValue;

          //  TABATAS user input
          tabatasValue = document.getElementById("tabatas").value;
          topTabatasValue = tabatasValue;

          Prepare(); 
    }
}
// -------------------------------------------------------------------------------------- //





// ---------------------------    PREPARE MODE  METHOD  --------------------------------- //
function Prepare()
{
    console.log("PREPARE sam");

    d3.select("#mainTitle")
      .attr("x", "151")
      .text("PREPARE");
    d3.select("#mainTimerDisplay").text(topPrepareValue);
    d3.select("#cyclesTimerDisplay").text(topCyclesValue);
    d3.select("#tabatasTimerDisplay").text(topTabatasValue);

    prepareModeIsActive = true;
    workModeIsActive = false;
    restModeIsActive = false;

    //  Turn counter, when is zero, terminate PREPARE mode
    prepareCounter = topPrepareValue;

    // Start execution loop (one turn) defined by user
    prepareInterval = setInterval(PrepareCalcute, 1000);
    prepareColoringInterval = setInterval(arcTimerPrepare, 1001);

    pauseIsOn = false;
}

// ------------------------------------------------------------------------------------- //

function PrepareCalcute()
{
    if(prepareCounter<1)
    { 
        d3.select("#mainTimerDisplay").text(topWorkValue);
        Reset();
        Work();
    }
    else
    {
      prepareValue--;
      d3.select("#mainTimerDisplay").text(prepareValue);
      var scale = d3.scaleLinear() 
        .domain([0,topPrepareValue]) 
        .range([0,6.4]);
      var currentDistanceValue = topPrepareValue-prepareValue;
      currentTimerArcValue = scale(currentDistanceValue);
      prepareCounter--;
    }
}
// ---------------------------------------------------------------------------------- //





// ---------------------------    WORK MODE   -------------------------------------- //
function Work()
{ 
    console.log("WORK sam");

    d3.select("#mainTitle")
      .attr("x", "167")
      .text("WORK");
    d3.select("#mainTimerDisplay").text(topWorkValue);
    d3.select("#cyclesTimerDisplay").text(cyclesCounter);

    console.log("P V : " + workValue);

    pauseIsOn = false;

    prepareModeIsActive = false;
    workModeIsActive = true;
    restModeIsActive = false;

    // Refresh decresed value
    workValue = topWorkValue;

    //  Turn counter, when is zero, terminate PREPARE mode
    workCounter = topWorkValue;

    // Start execution loop (one turn) defined by user
    WorkCalcute();
    arcTimerWork();

    workInterval = setInterval(WorkCalcute, 1000);
    workColoringInterval = setInterval(arcTimerWork, 1001);   

    // In first step REST music is not defined, after that we can stop it
    if(soundSecondTurnCheacker)
    {
      // Stop REST sound
      restBeepSound.pause();
    }
    // Start WORK sound
    WorkBeep(); 
}
function WorkCalcute()
{

   if(workCounter<1)
    {
        Reset();
        Rest();
    }
    else
    {
      var top = topWorkValue;
      workValue--;
      d3.select("#mainTimerDisplay").text(workValue);
      var skala = d3.scaleLinear() 
        .domain([0,top]) 
        .range([0,6.4]);
      var opa = top-workValue;
      currentTimerArcValue = skala(opa);
      console.log("Top value:" + top);
      workCounter--;
    }
}
// ---------------------------------------------------------------------------------- //



















// ---------------------------    REST MODE METHOD -------------------------------------- //
function Rest()
{
    cyclesCounter--;

    console.log("REST sam");

    d3.select("#mainTitle")
      .attr("x", "171")
      .text("REST");
    d3.select("#mainTimerDisplay").text(topRestValue);
    d3.select("#cyclesTimerDisplay").text(cyclesCounter);

    console.log("P V : " + restValue);

    pauseIsOn = false;
    
    CyclesCalculate();
    CyclesArcDraw();

    prepareModeIsActive = false;
    workModeIsActive = false;
    restModeIsActive = true;

    // Refresh decresed value
    restValue = topRestValue;

    //  Turn counter, when is zero, terminate PREPARE mode
    restCounter = topRestValue;

    // Start execution loop (one turn) defined by user
    RestCalcute();
    arcTimerRest();

    restInterval = setInterval(RestCalcute, 1000);
    restColoringInterval = setInterval(arcTimerRest, 1001);   

    // REST mode is executed, we can STOP its sound now
    soundSecondTurnCheacker = true;

    // Stop WORK sound
    workBeepSound.pause();

    // Start REST sound
    RestBeep();
}
function RestCalcute()
{

    if(restCounter<1)
    {
        if(cyclesCounter<1)
        {
          GameOver();
        }
        else
        {
          d3.select("#mainTimerDisplay").text(topWorkValue);
          Reset();
          Work();
        }
    }
    else
    {
      var top = topRestValue;
      restValue--;
      d3.select("#mainTimerDisplay").text(restValue);
      var skala = d3.scaleLinear() 
        .domain([0,top]) 
        .range([0,6.4]);
      var opa = top-restValue;
      currentTimerArcValue = skala(opa);
      console.log("Top value:" + top);
      restCounter--;
    }
}
// ---------------------------------------------------------------------------------- //
function GameOver()
{
  restBeepSound.pause();
  Reset();
  ResetCycles();
  d3.select("#mainTimerDisplay").text("0");
  d3.select("#cyclesTimerDisplay").text("0");
  d3.select("#mainTitle")
  .attr("x", "147")
  .text("HERCULES");
}
// ---------------------------------------------------------------------------------- //





// ------------------------    PAUSE   METHODS  ------------------------------------ //
function Pause()
{
  pauseIsOn = true;
  if(workModeIsActive)
  {
      clearInterval(workInterval);
      clearInterval(workColoringInterval);
      workBeepSound.pause();
      console.log("Pauziran u WORK");
  }
  else if(restModeIsActive)
  {
      cyclesCounter++;
      clearInterval(restInterval);
      clearInterval(restColoringInterval);
      restBeepSound.pause();
      console.log("Pauziran u REST");
  }
  else // prepareModeIsActive
  { 
      clearInterval(prepareInterval);
      clearInterval(prepareColoringInterval);
      console.log("Pauziran u PREPARE");
  }
}
// ---------------------------------------------------------------------------------- //





// ------------------------    RESET   METHODS  ------------------------------------ //
function Reset()
{   
  pauseIsOn = false;
  d3.select("#mainTimerDisplay").text("0");
  // Sound methods, turn off
  if(workModeIsActive)
  {
      workBeepSound.pause();
      console.log("Reset in workMode");
  }
  else if(restModeIsActive)
  {
      restBeepSound.pause();
      console.log("Reset in restMode");
  }
  else
  {
    console.log("Reset in prepareMode");
  }

    // Timer cycle
    arcTimer = d3.arc()
      .innerRadius(169)
      .outerRadius(181)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(6.3) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "lightgray")
      .attr("transform", "translate(200,190)");
// ---------------------------------------------------------------------------------- //

    clearInterval(prepareInterval);
    clearInterval(prepareColoringInterval);

    clearInterval(workInterval);
    clearInterval(workColoringInterval);

    clearInterval(restInterval);
    clearInterval(restColoringInterval);
}
// ---------------------------------------------------------------------------------- //
function UserReset()
{  
  Reset();
  ResetCycles(); 
}
// ---------------------------------------------------------------------------------- //
function ResetCycles()
{   
    // Cycles cycle
    arcTimer = d3.arc()
      .innerRadius(25)
      .outerRadius(35)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(6.3) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "lightgray")
      .attr("transform", "translate(150,270)");

    clearInterval(cyclesInterval);
    clearInterval(cyclesColoringInterval);
}
// ---------------------------------------------------------------------------------- //





// ----------------------    VIZUALIZATION METHODS   -------------------------------- //
function arcTimerPrepare()
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

function arcTimerWork()
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
      .attr("fill", "#52FF83")
      .attr("transform", "translate(200,190)");

}

function arcTimerRest()
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
      .attr("fill", "#FF5C36")
      .attr("transform", "translate(200,190)");
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
      .attr("transform", "translate(150,270)");

    //currentTimerArcValue = 0;
    prepareValue = topPrepareValue;
    Prepare();
  }
}
// ---------------------------------------------------------------------------------- //


// ----------------------      CYCLES  VIZUALIZATION  ------------------------------- //
function CyclesCalculate()
{
    cyclesValue--;
    var scale = d3.scaleLinear() 
      .domain([0,topCyclesValue]) 
      .range([0,6.4]);
    var currentDistanceValue = topCyclesValue-cyclesValue;
    currentCyclesArcValue = scale(currentDistanceValue);
}

function CyclesArcDraw()
{
    //checkCycleEnd();
    var currentValue = currentCyclesArcValue;

    console.log("Bojam : " + currentValue);

    arcTimer = d3.arc()
      .innerRadius(25)
      .outerRadius(35)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "#000000")
      .attr("transform", "translate(150,270)");
}
// ---------------------------------------------------------------------------------- //





// ------------------------------  SOUND METHODS  ----------------------------------- //
function WorkBeep() 
{
    //var snd = new Audio("data:audio/wav;base64,//uQRAA");  
    workBeepSound = new Audio("../sounds/workSound.mp3"); 
    workBeepSound.play();
}

function RestBeep() 
{
    //var snd = new Audio("data:audio/wav;base64,//uQRAA");  
    restBeepSound = new Audio("../sounds/restSound.mp3"); 
    restBeepSound.play();
}
// ---------------------------------------------------------------------------------- //





// --------------------------  INPUT  METHODS    -------------------------------- //
function InputCheckPrepare()
{
  var checkValue = document.getElementById("prepare").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheck(checkValueINT);
  document.getElementById("prepare").value = checkValue;
}
function InputCheckWork()
{
  var checkValue = document.getElementById("work").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheck(checkValueINT);
  document.getElementById("work").value = checkValue;
}
function InputCheckRest()
{
  var checkValue = document.getElementById("rest").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheck(checkValueINT);
  document.getElementById("rest").value = checkValue;
}
function InputCheckCycle()
{
  var checkValue = document.getElementById("cycles").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheck(checkValueINT);
  document.getElementById("cycles").value = checkValue;
}
function InputCheckTabatas()
{
  var checkValue = document.getElementById("tabatas").value;
  var checkValueINT = parseInt(checkValue);


  checkValue = DirectCheck(checkValueINT);
  document.getElementById("tabatas").value = checkValue;
}
// ---------------------------------------------------------------------------------- //
function DirectCheck(directValue)
{
    checkValueINT = directValue;
    if (isNaN(checkValueINT)) 
    {
      alert("You have not entered a number. \n\n Please enter a number!");
      return 4;
    }
    if ((checkValueINT < 1 ) || (checkValueINT > 300))
    {
      alert("Please enter number that can be used in this application. Thank you.");
      return 4;
    }
    else 
    {
      return checkValueINT;
    }
}
// ---------------------------------------------------------------------------------- //