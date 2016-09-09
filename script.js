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
  },
  {
    poet: "Richard Siken",
    poem: "Straw House, Straw Dog",
    book: "Crush",
    publisher: "Yale University, 2005",
    lines: ["But thanks, thanks for calling it &nbsp&nbsp&nbsp <em> the blue sky</em>"]
  },
  {
    poet: "Jim Carroll",
    poem: "To a Poetess",
    book: "Fear of Dreaming",
    publisher: "Penguin Books, 1993",
    lines: ["six doezen wet umbrellas", "the space between them"]
  },
  {
    poet: "Noelle Kocot",
    poem: "The Nowhere Parade",
    book: "Poem for the End of Time and Other Poems",
    publisher: "Wave Books, 2006",
    lines: ["Slender quietness, transubstantiating octave,", "What happened to your velocity", "On this rainy zero?"]
  },
  {
    poet: "Julie Choffel",
    poem: "Synopsis",
    book: "The Hello Delay",
    publisher: "Fordham U. Press, 2012",
    lines: ["Please dial slowly", 'I would like to speak in "hierarchies of thought"']
  },
  {
    poet: "Coral Bracho",
    poem: "VI",
    book: "Firefly Under the Tongue",
    publisher: "New Directions, 2008",
    lines: ["A cool brilliance among the chrysanthemums. A word,", "a texture."]
  },
  {
    poet: "James Poteat",
    peom: "the &nbsp&nbsp&nbsp interference",
    book: "Illustrating the Machine that Makes the World",
    publisher: "U. of Georgia Press, 2009",
    lines: ["&nbsp&nbsp think of", "&nbsp&nbsp&nbsp briars", "riding &nbsp&nbsp&nbsp the skin"]
  },
  {
    poet: "Lauren Ireland",
    poem: "I Should Have Killed You in that Field",
    book: "The Arrow",
    publisher: "Coconut Books, 2014",
    lines: ["Narcissus or burning plastic. &nbsp&nbsp&nbsp Wrong Day.", "Wrong light.&nbsp&nbsp&nbsp Winter scabs the grass.", "Tight grosgrain path&nbsp&nbsp&nbsp around & around"]
  },
  {
    poet: "Piero Heliczer",
    poem: "X Buxtehude",
    book: "A Purchase in the White Botanica",
    publisher: "Granary Books, 2001",
    lines: ["supple submarines aromatise feeling", "a quality of the fingers"]
  },
  {
    poet: "Aly Doerscher",
    poem: "Pieceword",
    book: "If Not, Winter",
    publisher: "personal chapbook",
    lines: ["this is the simple locking mechanism:", "how to trigger dahlias on your hips"]
  },
  {
    poet: "Anne Carson",
    poem: "n/a",
    book: "Nox",
    publisher: "New Directions Books, 2010",
    lines: ["<em>I fall, you fall, I have fallen, fell, a neutral verb, whence casual and casually</em>"]
  }, {
    poet: "Diane Wakoski",
    poem: "Sixteen of Cups",
    book: "Inside the Blood Factory",
    publisher: "Doubleday & Company, 1968",
    lines: ["So what are you hanging around for?", "You want me to give you an orange?", "You know that bird's going to be in it."]
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

  // functions
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
      poemCount = 1;
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
    timeCounter = setInterval(function(){
      if(counter == 0) {
        nextPoem();
        // clearInterval(timeCounter);
        // counter = 60;
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
      poemCount --;
      console.log(poemCount);
      timedModeEnd();
      clearInterval(timeCounter);
      counter = 60;
      timeCounter = setInterval(function(){
        if(counter == 0) {
          nextPoem();
          clearInterval(timeCounter);
          timer();
        } else {
          $('#timer').html(counter--);
        }
      }, 1000)
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
    counter = $('#timer').html();
    timeCounter = setInterval(function(){
      if(counter == 0) {
        nextPoem();
        clearInterval(timeCounter);
      } else {
        $('#timer').html(counter--);
      }
    }, 1000)
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
    $('ul:contains("Noelle Kocot")').css('margin-bottom', '0px');
    $('ul:contains("Lauren Ireland")').css('margin-bottom', '0px');
  }

  function timedModeEnd() {
    if(poemCount === 0) {
      console.log('here');
      clearInterval(timeCounter);
      $('#lines').empty();
      $('#lines').append("<h2>Here's what you've written:</h2>");
      $('.form-group, #pastTab, #next, #timer').addClass('disable');
      $('#pastLines, #again').removeClass('disable');
      return false;
    }
  }

  function timedRestart() {
    clearInterval(timeCounter);
    timedMode = true;
    poemCount = 5;
    counter = 60;
    timeCounter = setInterval(function(){
      if(counter == 0) {
        nextPoem();
      } else {
        $('#timer').html(counter--);
      }
    }, 1000)
    $('#lines').empty();
    $('.form-group, #pastTab, #timer').removeClass('disable');
    $('#pastLines, #again').addClass('disable');
    getPoem();
    populateLines();
  }

  function aboutClick() {
    $('.main, #citations, #timer, #minutes').addClass('disable');
    $('.start').removeClass('disable');
    clearInterval(timeCounter);
    poemCount = 0;
    timedRestart = false;
    timedMode = false;
  }

})
