/*  ------------------------------------------------ *\
*   BASIC SVG 
\*  ------------------------------------------------ */

var svg;
var width =  "100%";
var height = "100%";
var pi = Math.PI;



/*  ------------------------------------------------ *\
*   D3  ARC 
\*  ------------------------------------------------ */

var arcTimer;



/*  ------------------------------------------------ *\
*   USER INPUT
\*  ------------------------------------------------ */

// New one for CD
var countdownValue,
    topCountdownValue;    

var prepareValue,
    topPrepareValue;

var workValue,
    topWorkValue;

var restValue,
    topRestValue;




/*  ------------------------------------------------ *\
*   TIMERS
\*  ------------------------------------------------ */

var prepareInterval;
var prepareColoringInterval;

var workInterval;
var workColoringInterval;

var restInterval;
var restColoringInterval;

var startCountingCountdownInterval;

var currentTimerArcValue;


//  Displaying minutes and second for countdown
var minutesAndSecondDisplay;



/*  ------------------------------------------------ *\
*   COUNTERS
\*  ------------------------------------------------ */


var prepareCounter;
var workCounter;
var restCounter;





/*  ------------------------------------------------ *\
*   SOUND
\*  ------------------------------------------------ */

var workBeepSound;
var restBeepSound;
var catBeepSound; // New one



/*  ------------------------------------------------ *\
*   BOOLEAN 
\*  ------------------------------------------------ */

var playIsActive = false;

var prepareModeIsActive = false;
var workModeIsActive = false;
var restModeIsActive = false;

var secondTurnCycleBoolean = false;
var soundSecondTurnCheacker = false;
var pauseIsOn = false;

//  Important for cat sound. 
var iAmInSoundArray = false;


//  Am i started any timer, important for total time
var appIsRunning = false,
    appIsRunningWithTimer = false,
    appIsRunningWithCD = false;

//  Boolean for countdown method
var countdownIsActive = false;

//  Boolean for CD reset status
var iAmResetInCD = false;

// ------------------------------------------------------------------------------------- //

var playButton;
var pauseButton;
var resetButton;
var countdownButton;



/*  ------------------------------------------------ *\
*   CONSTANTS
\*  ------------------------------------------------ */
var time = 0;




/*  ------------------------------------------------ *\
*   CAT SOUND
\*  ------------------------------------------------ */


//  DEAFULT NUMBER, was describe by CYCLES now we need nem metodology
var deafultMJAU = 2;

// Do that in variables PART????
//topCyclesValue = 4; // Extande this default value to all variables in this part, MAYBE!

//  Maximal sound actions
var mainSoundActionCounter;  // IN HC there is 8 sound actions

//  Zero is first index in array and first beep in Hercules
var endSoundsCounter = 0;

//  Index is 1/4, not random but static with random time of showing
var mjauINDEX = 0.1;   //   1/4

//  Number of MJAU sound
var maximalMjauSounds;


// Array with all end actions number
var endsFollowedBySound = []; 

//  Array with mode end actions with MJAU sound
var mrnjauSoundArray = [];





/*  ------------------------------------------------ *\
*   SETUP METHODS
\*  ------------------------------------------------ */

function Setup() 
{
/*  ------------------------------------------------ *\
*   TIMER BUTTONS LISTENER
\*  ------------------------------------------------ */

  playButton = document.getElementById("js-play");
  playButton.addEventListener("click", function onclick(event) 
  {
    appIsRunning = true;
    if (!appIsRunningWithCD && !appIsRunningWithTimer) {
      totalTimeInHercules();
    }
    Play();
    event.preventDefault();
  }
  );

  pauseButton = document.getElementById("js-pause");
  pauseButton.addEventListener("click", function onclick(event) 
  {
    Pause();
    event.preventDefault();
  }
  );

  resetButton = document.getElementById("js-reset");
  resetButton.addEventListener("click", function onclick(event) 
  {
    UserReset();
    event.preventDefault();
  }
  );

/*  ------------------------------------------------ *\
*   COUNTODOWN BUTTONS LISTENER
\*  ------------------------------------------------ */

  countdownPlayButton = document.getElementById("js-playCD");
  countdownPlayButton.addEventListener("click", function onclick(event) 
  {
    appIsRunning = true;
    if (!appIsRunningWithTimer && !appIsRunningWithCD) {
      totalTimeInHercules();
    }
    //  Reject button click after countdown is active
    if(!countdownIsActive) {
      Countdown();
    }
    //  After reset it is allowed to start CD over again
    if (iAmResetInCD && !countdownIsActive) {
      Countdown();
    }
    event.preventDefault();
  }
  );

  countdownPauseButton = document.getElementById("js-pauseCD");
  countdownPauseButton.addEventListener("click", function onclick(event) 
  {
    //Pause();
    event.preventDefault();
  }
  );

  countdownResetButton = document.getElementById("js-resetCD");
  countdownResetButton.addEventListener("click", function onclick(event) 
  {
    resetCD();
    event.preventDefault();
  }
  );



/*  ------------------------------------------------ *\
*   FIRST TIMER
\*  ------------------------------------------------ */

    //  SVG area for first circle
    svg = d3.select("#js-clock")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //  Timer circle
    svg.append("circle")
      //  X,Y coordintates
      .attr("cx","200")
      .attr("cy","190")
      //  Circle radius
      .attr("r","175")
      //  Circle colors
      .style("stroke","lightgray")
      .style("fill","white")
      //  Circle width
      .style("stroke-width","16"); //    CHANGED TO 16 from 8

// ------------------------------  TEXT  --------------------------------------------- // 

    //  Text for timer, heading "HERCULES"
    svg.append("text")
        .attr("x", "147")
        .attr("y", "90")
        .text("HERCULES")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "gray")
        .attr("id","mainTitle");

    svg.append("text")
        .attr("x", "165")
        .attr("y", "230")
        .text("TOTAL")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "gray")
        .attr("id","mainTitle");

// -------------------------------  NUMBERS  -------------------------------------------- //

    //  Add the variable number for MAIN TIMER
    svg.append("text")
        .attr("x", "172")
        .attr("y", "189")
        //.attr("x", function(d) { return d.cx; })
        .text("0")
        .attr("font-family", "sans-serif")
        .attr("font-size", "90px")
        .attr("fill", "black")
        .attr("id", "mainTimerDisplay");

    //  Add the variable number for TOTAL
    svg.append("text")
      .attr("x", "162")
      .attr("y", "279")
      //.attr("x", function(d) { return d.cx; })
      .text("00:00")
      .attr("font-family", "sans-serif")
      .attr("font-size", "30px")
      .attr("fill", "black")
      .attr("id", "total"); // new ID, search for his connetions




/*  ------------------------------------------------ *\
*   SECOND TIMER
\*  ------------------------------------------------ */

  //  SVG area for second circle
  svg2 = d3.select("#js-clock2")
      .append("svg")
      .attr("width", width)
      .attr("height", height);


// ------------------------------  CIRCLE  --------------------------------------------- // 

  //  Timer circle
  svg2.append("circle")
      //  X,Y coordintates
      .attr("cx","200")
      .attr("cy","190")
      //  Circle radius
      .attr("r","150")
      //  Circle colors
      .style("stroke","lightgray")
      .style("fill","white")
      //  Circle width
      .style("stroke-width","16"); //    CHANGED TO 16 from 8
                  

// ------------------------------  TEXT  --------------------------------------------- // 

  //  Text for timer, heading "COUNTDOWN"
  svg2.append("text")
     .attr("x", "120")
     .attr("y", "150")
     .text("COUNTDOWN")
     .attr("font-family", "sans-serif")
     .attr("font-size", "24px")
     .attr("fill", "gray")
     .attr("id","mainTitle");


// -------------------------------  NUMBERS  -------------------------------------------- //

    //Add the variable number for MAIN TIMER
    svg2.append("text")
       .attr("x", "115")
       .attr("y", "220")
       //.attr("x", function(d) { return d.cx; })
       .text("00:00")
       .attr("font-family", "sans-serif")
       .attr("font-size", "70px")
       .attr("fill", "black")
       .attr("id", "countdownDisplay");





// ---------------------------------------------------------------------------------- //

    // Create music objects for sounds
    WorkBeep();
    RestBeep();   
    CatBeep(); 
    CountdowntBeep(); 
}





/*  ------------------------------------------------ *\
*   PLAY  METHOD 
\*  ------------------------------------------------ */

function Play()
{
  //  Total Hercules time is activated by timer play button
  appIsRunningWithTimer = true;



  //  Play or continue depending od boolean variables, Play button double nature
  if(!playIsActive || pauseIsOn)
  {
      playIsActive = true;

      if(pauseIsOn)
      {
          if(workModeIsActive)
          {
              workValue++;
              Work();
              console.log("Nastavljen u WORK");
          }
          else if(restModeIsActive)
          {
              restValue++;
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


            // in case where there is not PREPARE mode, HC version
            if(prepareValue==0) {
              //  Maximal sound actions
              mainSoundActionCounter = deafultMJAU * 2;  // IN HC there is 8 sound actions
              //  Number of MJAU sound
              maximalMjauSounds = mainSoundActionCounter * mjauINDEX;
              //  Define random cat sound (MJAU)
              RandomCatSound();
              Work();
            }
            else {
              //  Maximal sound actions
              mainSoundActionCounter = deafultMJAU * 2;  // IN HC there is 8 sound actions
              //  Number of MJAU sound
              maximalMjauSounds = mainSoundActionCounter * mjauINDEX;
              //  Define random cat sound (MJAU)
              RandomCatSound();
              Prepare(); 
            }



            
      }
  }
}
// -------------------------------------------------------------------------------------- //





/*  ------------------------------------------------ *\
*   PREPARE/WORK/REST METHODS
\*  ------------------------------------------------ */

function Prepare()
{
    console.log("PREPARE sam");

    if(pauseIsOn)
    {
      d3.select("#mainTimerDisplay").text(prepareValue);
    }
    else
    {
      // Write display for PREPARE mode
      PrepareBasicDisplay();
    }

    // Set modes status
    prepareModeIsActive = true;
    workModeIsActive = false;
    restModeIsActive = false;

    pauseIsOn = false;

    // Start execution loop (one turn) defined by user
    prepareInterval = setInterval(PrepareCalcute, 1000);
    prepareColoringInterval = setInterval(arcTimerPrepare, 1001);
}

// ------------------------------------------------------------------------------------- //

function PrepareCalcute()
{
    correctPositionDisplay();
    if(prepareValue<1)
    { 
        d3.select("#mainTimerDisplay").text(topWorkValue);
        Reset();
        Work();
    }
    else
    {
      prepareValue--;
      console.log("Value(P) : " + prepareValue);
      d3.select("#mainTimerDisplay").text(prepareValue);
      var scale = d3.scaleLinear() 
        .domain([0,topPrepareValue]) 
        .range([0,6.4]);
      var currentDistanceValue = topPrepareValue-prepareValue;
      currentTimerArcValue = scale(currentDistanceValue);
    }
}
// ------------------------------------------------------------------------------------- //
function PrepareBasicDisplay()
{ 
  d3.select("#mainTitle")
    .attr("x", "151")
    .text("PREPARE");
  d3.select("#mainTimerDisplay").text(topPrepareValue);

  if(prepareValue>9)
  {
    d3.select("#mainTimerDisplay")
        .attr("x", "145")
        .attr("y", "189");
  }
}
// ---------------------------------------------------------------------------------- //
 




// ---------------------------    WORK MODE   -------------------------------------- //
function Work()
{ 
    //  Define position/MODE
    console.log("WORK sam");


    //  Tell me about mjau counter
    console.log("Mjau counter (W): " + endSoundsCounter);

    if(pauseIsOn)
    {
      d3.select("#mainTimerDisplay").text(workValue);
    }
    else
    {
      WorkBasicDisplay();
    } 

    prepareModeIsActive = false;
    workModeIsActive = true;
    restModeIsActive = false;

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
    /// CHECK THIS BECAUSE OF MJAU !!!!!!!!!!!!!!!!!!
    if(!pauseIsOn)
    {
      //  Check if MRNJAU sound is possible
      for (var i=0;i<maximalMjauSounds;i++) {
        
          if (endSoundsCounter == mrnjauSoundArray[i]) {
            catBeepSound.play();
            iAmInSoundArray = true;
          }
      }

      if (iAmInSoundArray==false) 
      {
          workBeepSound.play();
          //catBeepSound.play();
      }

      // Increase  sound  counter after every mode BEEP
      endSoundsCounter++;

      //  Return sound boolean to false
      iAmInSoundArray = false;

    }

    playIsActive = true;
    pauseIsOn = false;

}

// ------------------------------------------------------------------------------------- //

function WorkCalcute()
{
    correctPositionDisplay();
    if(workValue<1)
    {
        workValue = topWorkValue;
        Reset();
        Rest();
    }
    else
    {
      workValue--;
      console.log("Value(W) : " + workValue);
      d3.select("#mainTimerDisplay").text(workValue);
      var skala = d3.scaleLinear() 
        .domain([0,topWorkValue]) 
        .range([0,6.4]);
      currentTimerArcValue = skala(topWorkValue-workValue);
    }
}
// ---------------------------------------------------------------------------------- //

function WorkBasicDisplay()
{
  correctPositionDisplay();
  d3.select("#mainTitle")
    .attr("x", "167")
    .text("WORK");
  d3.select("#mainTimerDisplay").text(topWorkValue);
}

// ---------------------------------------------------------------------------------- //





// ---------------------------    REST MODE METHOD -------------------------------------- //
function Rest()
{
    //  Define position/MODE
    console.log("REST sam");

    //  Tell me about mjau counter
    console.log("Mjau counter (R): " + endSoundsCounter);

    prepareModeIsActive = false;
    workModeIsActive = false;
    restModeIsActive = true;

    d3.select("#mainTimerDisplay").text(restValue);

    RestBasicDisplay();

    if(!pauseIsOn)
    {
      //CyclesCalculate();
      //CyclesArcDraw();
    }

    // Start execution loop (one turn) defined by user
    RestCalcute();
    arcTimerRest();     

    restInterval = setInterval(RestCalcute, 1000);
    restColoringInterval = setInterval(arcTimerRest, 1001);   

    // REST mode is executed, we can STOP its sound now
    soundSecondTurnCheacker = true;

    // Stop WORK sound
    workBeepSound.pause();

    if(!pauseIsOn)
    {
      //  Check if MRNJAU sound is possible
      for (var i=0;i<maximalMjauSounds;i++) {
        
          if (endSoundsCounter == mrnjauSoundArray[i]) {
            catBeepSound.play();
            iAmInSoundArray = true;
          }
      }

      if (iAmInSoundArray==false) 
      {
          restBeepSound.play();
      }

      // Increase  sound  counter after every mode BEEP
      endSoundsCounter++;

      //  Return sound boolean to false
      iAmInSoundArray = false;
    }

    playIsActive = true;
    pauseIsOn = false;
}



// ---------------------------------------------------------------------------------- //

function RestCalcute()
{
    correctPositionDisplay();
    if(restValue<1)
    {
      d3.select("#mainTimerDisplay").text(topWorkValue);
      Reset();
      Work();
      restValue = topRestValue;
    }
    else
    {
      restValue--;
      console.log("Value(R) : " + restValue);
      d3.select("#mainTimerDisplay").text(restValue);
      var skala = d3.scaleLinear() 
        .domain([0,topRestValue]) 
        .range([0,6.4]);
      currentTimerArcValue = skala(topRestValue-restValue);
    }
}
// ---------------------------------------------------------------------------------- //

function RestBasicDisplay()
{
  correctPositionDisplay();
  d3.select("#mainTitle")
    .attr("x", "171")
    .text("REST");
  d3.select("#mainTimerDisplay").text(topRestValue);
}
// ---------------------------------------------------------------------------------- //

function GameOver()
{
  restBeepSound.pause();
  Reset();
  ResetCycles();
  d3.select("#mainTimerDisplay").text("0");
  d3.select("#mainTitle")
    .attr("x", "147")
    .text("HERCULES");
}
// ---------------------------------------------------------------------------------- //

function correctPositionDisplay()
{
  if(prepareModeIsActive)
  {
    if(prepareValue>10)
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "145")
          .attr("y", "189");
    }
    else
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "172")
          .attr("y", "189");
    }
  }

  if(workModeIsActive)
  {
    if((workValue>10))
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "145")
          .attr("y", "189");
    }
    else
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "172")
          .attr("y", "189");
    }
  }

  if(restModeIsActive)
  {
    if((restValue>10))
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "145")
          .attr("y", "189");
    }
    else
    {
      d3.select("#mainTimerDisplay")
          .attr("x", "172")
          .attr("y", "189");
    }
  }
}
// ---------------------------------------------------------------------------------- //






/*  ------------------------------------------------ *\
*   VIZUALIZATION METHODS
\*  ------------------------------------------------ */

function arcTimerPrepare()
{
    checkCircleEnd();
    var currentValue = currentTimerArcValue;

    console.log("Bojam : " + currentValue);

    arcTimer = d3.arc()
      .innerRadius(167)  // Old 170
      .outerRadius(183)  // Old 180
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "#D8FF1A")
      .attr("transform", "translate(200,190)");
}
// ---------------------------------------------------------------------------------- //

function arcTimerWork()
{
    checkCircleEnd();
    var currentValue = currentTimerArcValue;

    console.log("Bojam : " + currentValue);

    arcTimer = d3.arc()
      .innerRadius(167)
      .outerRadius(183)
      .startAngle(1 * (pi/180)) //converting from degs to radians
      // MAX -  6.30(2*PI) 
      // MIN -  0
      .endAngle(currentValue) //just radians

    svg.append("path")
      .attr("d", arcTimer)
      .attr("fill", "#52FF83")
      .attr("transform", "translate(200,190)");

}
// ---------------------------------------------------------------------------------- //

function arcTimerRest()
{
    checkCircleEnd();
    var currentValue = currentTimerArcValue;

    console.log("Bojam : " + currentValue);

    arcTimer = d3.arc()
      .innerRadius(167)
      .outerRadius(183)
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
      .innerRadius(167)
      .outerRadius(183)
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




/*  ------------------------------------------------ *\
*   PAUSE  METHOD 
\*  ------------------------------------------------ */

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




/*  ------------------------------------------------ *\
*   RESET  METHOD 
\*  ------------------------------------------------ */

function Reset()
{   
  pauseIsOn = false;
  playIsActive = false;
  d3.select("#mainTimerDisplay").text("0");
  d3.select("#mainTimerDisplay")
          .attr("x", "172")
          .attr("y", "189");

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
    .innerRadius(166.5)  // old 169
    .outerRadius(183.5)  // old 181
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

  clearInterval(workInterval);
  clearInterval(workColoringInterval);

  clearInterval(restInterval);
  clearInterval(restColoringInterval);


  // Determine cat sounds again
  RandomCatSound();
}
// ---------------------------------------------------------------------------------- //

function UserReset()
{  
  Reset();
  // Determine cat sounds again
  RandomCatSound();
}
// ---------------------------------------------------------------------------------- //




/*  ------------------------------------------------ *\
*   SOUND METHODS
\*  ------------------------------------------------ */

function WorkBeep() 
{  
    workBeepSound = new Audio("sounds/buzzer.mp3"); 
}

function RestBeep() 
{
    restBeepSound = new Audio("sounds/buzzer.mp3"); 
}

function CountdowntBeep() 
{
    countdownBeepSound = new Audio("sounds/countdown.mp3"); 
}
// ---------------------------------------------------------------------------------- //

function CatBeep() 
{
    catBeepSound = new Audio("sounds/cat.mp3"); 
}

function RandomCatSound() {

  //  Fill array with possible numbers
  for(i=0; i<mainSoundActionCounter; i++) {
      endsFollowedBySound[i] = i;
  }
  console.log("First array : " + endsFollowedBySound);


  //  FOR Loop goes to maximal MJAU number, index is 1/4
  for(i=0; i<maximalMjauSounds; i++) {

          var maxPoolLength = endsFollowedBySound.length;
          console.log("Array length (1) : " + maxPoolLength);

          
          var xSound = Math.floor((Math.random() * maxPoolLength)); // Number from 1 to max
          console.log("Random sound : " + xSound);


          // In this case there is two numbers, 3 and 1 for example
          var choosenNumber = endsFollowedBySound[xSound];

          //  Add random mode end action which will has MJAU sound
          mrnjauSoundArray.push(choosenNumber);

          //  Remove/slice selected random number
          endsFollowedBySound.splice(choosenNumber, 1);


          // Decrease size of array because of pop and push
          console.log("Array length (2) : " + endsFollowedBySound.length);
      
  }

  console.log("Second array : " + endsFollowedBySound);

  console.log("Mjau numbers " + mrnjauSoundArray);
}
// ---------------------------------------------------------------------------------- //



/*  ------------------------------------------------ *\
*   INPUT CHECK METHODS
\*  ------------------------------------------------ */

function InputCheckCountdown()
{
  var checkValue = document.getElementById("countdown").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheckCountdown(checkValueINT);
  document.getElementById("countdown").value = checkValue;
}

function InputCheckPrepare()
{
  var checkValue = document.getElementById("prepare").value;
  var checkValueINT = parseInt(checkValue);

  checkValue = DirectCheckPrepare(checkValueINT);
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

function DirectCheckPrepare(directValue)
{
    checkValueINT = directValue;
    if (isNaN(checkValueINT)) 
    {
      alert("You have not entered a number. \n\n Please enter a number!");
      return 4;
    }
    if ((checkValueINT < 0 ) || (checkValueINT > 300))
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

function DirectCheckCountdown(directValue)
{
    checkValueINT = directValue;
    if (isNaN(checkValueINT)) 
    {
      alert("You have not entered a number. \n\n Please enter a number!");
      return 300;
    }
    if ((checkValueINT < 30 ) || (checkValueINT > 3600))
    {
      alert("Please enter number that can be used in this application. Thank you.");
      return 300;
    }
    else 
    {
      return checkValueINT;
    }
}
// ---------------------------------------------------------------------------------- //

function Countdown() 
{
  //  Countdown is activated
  countdownIsActive = true;

  //  Total Hercules time is activated by countdown play button
  appIsRunningWithCD = true;

  //  COUNTDOWN MODE - user input, independent from any other input
  countdownValue = document.getElementById("countdown").value;
  topCountdownValue = countdownValue;


  var time = topCountdownValue;
  //var time = 662;
  var minutes_float = time/60;
  var minutes = Math.floor(minutes_float);
  var seconds = time%60;


  //console.log("Minutes : " + minutes + " min");
  //console.log("Seconds : " + seconds + " sec");


  //  Invode display method
  NiceCountdownDisplay();

  //  Inside function, needs outside variables for functionallity
  function NiceCountdownDisplay() {
      //  Take care about one-digit numbers (min and sec)
      //  THERE IS A BETTER APPROACH  !!!
      //  Minutes are less then 10
      if(minutes<10) {
          //  Minutes are less then 10 and seconds are less then 10
          if (seconds<10) {
              minutesAndSecondDisplay = "0" + minutes  + ":"  + "0"  + seconds;
          }
          //  Minutes are less then 10 and seconds are gretter then 10
          else {
              minutesAndSecondDisplay = "0" + minutes  + ":" + seconds;
          }
      }
      // Minutes are gretter then 10
      if(minutes>9) {
          //  Minutes are less then 10 and seconds are less then 10
          if (seconds<10) {
              minutesAndSecondDisplay = "" + minutes  + ":"  + "0"  + seconds;
          }
          //  Minutes are less then 10 and seconds are gretter then 10
          else {
              minutesAndSecondDisplay = "" + minutes  + ":" + seconds;
          }
      }

      //  Take SVG counter text and display new value
      d3.select("#countdownDisplay").text(minutesAndSecondDisplay);

      //  Test
      //console.log("Minutes : " + minutes + " min");
      //console.log("Seconds : " + seconds + " sec");
  }
  
  //  Set counting time interval for countdown option
  startCountingCountdownInterval = setInterval(CountCountdown, 1000);

  //  Invoke countodown timer 
  function CountCountdown() {

    //  Every second decrease one second  :)
    seconds--;

    //  If second are under 0, decrease minutes and put seconds to 59
    if(seconds<0) {
      minutes--;
      seconds = 59;
    }

    //  Now display minutes and second again
    NiceCountdownDisplay();

    //  If there is 5min or 2min then make some noise
    if((minutes==5 && seconds==0) || (minutes==2 && seconds==0)) {
      //countdownBeepSound.play();
      countdownBeepSound.play();
    }
    
    // Take care about end
    if(minutes == 0  && seconds==0) {
      clearInterval(startCountingCountdownInterval);
      countdownBeepSound.play();
    }

  }
}
// ------------------------------------------------------------------------------------------------- //


function resetCD()
{   
  //pauseIsOn = false;
  //playIsActive = false;


  d3.select("#countdownDisplay").text("00:00");
  clearInterval(startCountingCountdownInterval);

  countdownIsActive = false;
  iAmResetInCD = true;


  // Sound methods, turn off
/*  if(workModeIsActive)
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
  }*/
}
// ---------------------------------------------------------------------------------- //









function totalTimeInHercules() 
{
  var totalAPPRunningTime;

  var minutes_float = time/60;
  var minutes = Math.floor(minutes_float);
  var seconds = time%60;


  console.log("Minutes : " + minutes + " min");
  console.log("Seconds : " + seconds + " sec");


  //  Invoke display method
  NiceCountdownDisplay();

  //  Inside function, needs outside variables for functionallity
  function NiceCountdownDisplay() {
      //  Take care about one-digit numbers (min and sec)
      //  THERE IS A BETTER APPROACH  !!!
      //  Minutes are less then 10
      if(minutes<10) {
          //  Minutes are less then 10 and seconds are less then 10
          if (seconds<10) {
              totalAPPRunningTime = "0" + minutes  + ":"  + "0"  + seconds;
          }
          //  Minutes are less then 10 and seconds are gretter then 10
          else {
              totalAPPRunningTime = "0" + minutes  + ":" + seconds;
          }
      }
      // Minutes are gretter then 10
      if(minutes>9) {
          //  Minutes are less then 10 and seconds are less then 10
          if (seconds<10) {
              totalAPPRunningTime = "" + minutes  + ":"  + "0"  + seconds;
          }
          //  Minutes are less then 10 and seconds are gretter then 10
          else {
              totalAPPRunningTime = "" + minutes  + ":" + seconds;
          }
      }

      console.log("TOTAL : " + totalAPPRunningTime);

      //  Take SVG counter text and display new value
      d3.select("#total").text(totalAPPRunningTime);

      //  Test
      //console.log("Minutes : " + minutes + " min");
      //console.log("Seconds : " + seconds + " sec");
  }
  

  //  Set counting time interval for total option
  var  totalHerculesTime = setInterval(CountCountdown, 1000);

  //  Invoke countodown timer 
  function CountCountdown() {

    //  Every second increase one second  :)
    seconds++;

    //  If second are more then 59, increase minutes and put seconds to 00 :)
    if(seconds>59) {
      minutes++;
      seconds = 00;
    }

    //  Now display minutes and second again
    NiceCountdownDisplay();
  } 
}

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //















































//  Sth