$(document).ready(function(){

  var poems = [
    {
    poet: "Michael Robins",
    poem: "His Passion is Doves",
    book: "Ladies & Gentlemen",
    publisher: "Saturnalia Books, 2011",
    lines: ["Bewildered, our pigeons flew ashore long ago", "They mull the rooms of old, coastal motels"]
   },
   {
    poet: "C.D. Wright",
    poem: "from Just Whistle, a valentine",
    book: "Steal Away",
    publisher: "Copper Canyon Press, 2002",
    lines: ["The body, alive, not dead, but dormant, like a cave that had stopped growing, stirred up, awakened"]
  },
  {
    poet: "Elizabeth Hughey",
    poem: "What Bird",
    book: "Sunday Houses The Sunday House",
    publisher: "U. of Iowa Press, 2007",
    lines: ["Bulbs, gravel driveway.", "I had hyacinth on my mouth."]
  },
  {
    poet: "Laura Miller",
    poem: "Wake",
    book: "Subject",
    publisher: "U. of California Press, 2005",
    lines: ["wake: outside the frame beyond his 'fit'", "wake: frothed a blankness in the passage of what", "wake: we waited &nbsp&nbsp(and silence)"]
  }
  ]

  var counter = 60;
  var lines;
  var timedMode = false;
  var usedPoems = [];
  var userText;
  var poemCount = 0;
  var timeCounter;
  var timerStart = false;

  // Click events
  $('#gutModeStart').click(function() {
    gutStart();
  })

  $('.zenMode').click(function() {
    zenMode();
  })

  $('#gutMode').click(function() {
    gutMode();
  })

  $('#pastTab').click(function() {
    pastLines();
  })

  $('#inputTab').click(function() {
    pastLinesBack();
  })

  $('#next').click(function() {
    nextPoem();
    addUserText();
  })

  $('#poetsPoems').click(function() {
    citations();
  })

  $('#again').click(function() {
    timedRestart();
  })

  $('#about').click(function() {
    aboutClick();
  })


  function start() {
    $('.start').addClass('disable');
    $('.main').removeClass('disable');
    getPoem();
    populateLines();
  }

  function gutStart() {
    $('#minutes').removeClass('disable');
    $('#zenModeStart').addClass('disable');
    timer();
    $('#ten').click(function() {
      poemCount = 10;
      start();
      gutMode();
    })
    $('#five').click(function() {
      poemCount = 5;
      start();
      gutMode();
    })
  }

  function getPoem() {
    var index = Math.floor(Math.random() * (poems.length));
    if(usedPoems.length === poems.length) {
      usedPoems = [];
      getPoem();
    } else if(usedPoems.indexOf(index) === -1) {
      lines = poems[index].lines;
      usedPoems.push(index);
    } else {
      getPoem();
    }
  }

  function populateLines() {
    for(var i = 0; i < lines.length; i ++) {
      $('#lines').append("<h2>"+lines[i]+"</h2>");
    }
  }

  function timer() {
    timerStart = true;
    timerCounter = setInterval(function(){
      if(counter == 0) {
        nextPoem();
        clearInterval(timer);
      } else {
        $('#timer').html(counter--);
      }
    }, 1000)
  }

  function gutMode() {
    timedMode = true;
    $('#lines').empty();
    $('#timer, .main').removeClass('disable');
    $('#next, #citations').addClass('disable');
    counter = 60;
    getPoem();
    populateLines();
    if(timerStart === false) {
      timer();
    }
  }

  function zenMode() {
    timedMode = false;
    $('#lines').empty();
    $('#timer, #citations, .start').addClass('disable');
    $('#next, .main').removeClass('disable');
    clearInterval(timeCounter);
    counter = null;
    getPoem();
    populateLines();
  }

  function nextPoem() {
    $('#lines').empty();
    getPoem();
    populateLines();
    addUserText();
    if(timedMode == true) {
      counter = 60;
      poemCount --;
      console.log(poemCount);
      timedModeEnd();
    }
  }

  function pastLines() {
    $('#pastTab, .form-group').addClass('disable');
    $('#inputTab, #pastLines').removeClass('disable');
    if(timedMode = true) {
      console.log('here');
        clearInterval(timeCounter);
    }
  }
  function pastLinesBack() {
    $('#pastTab, .form-group').removeClass('disable');
    $('#inputTab, #pastLines').addClass('disable');
  }

  function addUserText() {
    var inputValue = $('textarea').val();
    userText = "<p>"+inputValue+"</p>"
    $('#pastLines').append(userText);
    $('textarea').val("");
  }

  function citations() {
    clearInterval(timeCounter);
    $('.main, .start, #timer').addClass('disable');
    $('#citations').removeClass('disable');
    for(var i = 0; i < poems.length; i++) {
      $('.poets').append("<ul></ul>");
      $('.poets').children('ul').eq(i).append("<div><li>"+poems[i].poet+"</li></div>");
      $('.poets').children('ul').eq(i).append('<div><li>"'+poems[i].poem+'"</li></div>');
      $('.poets').children('ul').eq(i).append("<div><li><em>"+poems[i].book+"</em></li></div>");
      $('.poets').children('ul').eq(i).append("<div><li>"+poems[i].publisher+"</li></div>");
    }
    $(".poets > ul").addClass('col-xs-6');
  }

  function timedModeEnd() {
    if(poemCount === 0) {
      clearInterval(timeCounter);
      $('#lines').empty();
      $('#lines').append("<h2>Here's what you've written:</h2>");
      $('.form-group, #pastTab, #next, #timer').addClass('disable');
      $('#pastLines, #again').removeClass('disable');
    }
  }

  function timedRestart() {
    poemCount = 5;
    counter = 60;
    $('#lines').empty();
    $('.form-group, #pastTab, #timer').removeClass('disable');
    $('#pastLines, #again').addClass('disable');
    getPoem();
    populateLines();
  }

  function aboutClick() {
    $('.main, #citations, #timer, #minutes').addClass('disable');
    $('.start').removeClass('disable');
    clearInterval(timerCounter);
    poemCount = 0;
    timedRestart = false;
    timedMode = false;
  }

})
