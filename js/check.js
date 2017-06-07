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
      return 30;
    }
    if ((checkValueINT < 1 ) || (checkValueINT > 300))
    {
      alert("Please enter number that can be used in this application. Thank you.");
      return 30;
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
      return 30;
    }
    if ((checkValueINT < 0 ) || (checkValueINT > 300))
    {
      alert("Please enter number that can be used in this application. Thank you.");
      return 30;
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
      return 20;
    }
    if ((checkValueINT < 0 ) || (checkValueINT > 120))
    {
      alert("Please enter number that can be used in this application. Thank you.");
      return 20;
    }
    else 
    {
      return checkValueINT;
    }
}
// ---------------------------------------------------------------------------------- //