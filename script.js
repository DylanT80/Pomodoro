//For Full screen
var element = document.documentElement;

function fullScreen() {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE11 */
    element.msRequestFullscreen();
  }
}

// For timer on screen !!!
const defaultPomoTime = 25 * 60;
const defaultShortBreakTime = 5 * 60;
const defaultLongBreakTime = 10 * 60;
var timeType = "pomo"; // Keeps track of which timer is selected
var time = 25 * 60; // Time that shows, default is 25 mins
var pomoTime = defaultPomoTime; // Time for pomodoro timer
var shortBreakTime = defaultShortBreakTime; // Time for short break timer
var longBreakTime = defaultLongBreakTime; // Time for long break timer
var ogTime = 25 * 60; // track og time to reset to
var intervalId = null;
var timerEl = document.getElementById('timer');

// Change timer based on which selection clicked
function switchTimer(type) {
  // pomo!
  if (type == 1) {
    // Change visual selection
    let selected = document.getElementsByClassName("selectedTimer");
    selected[0].className = "unselectedTimer";
    let timer = document.getElementById("pomodoroBtn")
    timer.className = "selectedTimer";

    pomodoro();
  }

  // Short break!
  else if (type == 2) {
    // Change visual selection
    let selected = document.getElementsByClassName("selectedTimer");
    selected[0].className = "unselectedTimer";
    let timer = document.getElementById("shortBreakBtn")
    timer.className = "selectedTimer";

    shortBreak();
  }

  // Long break!
  else if (type == 3) {
    // Change visual selection
    let selected = document.getElementsByClassName("selectedTimer");
    selected[0].className = "unselectedTimer";
    let timer = document.getElementById("longBreakBtn")
    timer.className = "selectedTimer";

    longBreak();
  }
}

// Update timer to pomodoro duration
function pomodoro() {
  // if (timeType == "pomo")  // Don't reset if already at timer type
  //   return;
  clearInterval(intervalId);
  intervalId = null;
  time = pomoTime + 1;
  updateTime();
  ogTime = pomoTime;
  timeType = "pomo";
}

// Update timer with short break duration
function shortBreak() {
  // // If already at selection
  // if (timeType == "shortBreak")
  //   return;
  clearInterval(intervalId);
  intervalId = null;
  time = shortBreakTime + 1;
  updateTime();
  ogTime = shortBreakTime;
  timeType = "shortBreak";
}

// Update timer with long break duration
function longBreak() {
  // if (timeType == "longBreak")
  //   return;
  clearInterval(intervalId);
  intervalId = null;
  time = longBreakTime + 1;
  updateTime();
  ogTime = longBreakTime;
  timeType = "longBreak";
}

function startTimer() {
  if (intervalId === null) {
    intervalId = setInterval(updateTime, 1000); // 1000ms in 1 sec :D
  }
  // Pause functionality
  else {
    // Stop update timer function repeat
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Stop update function, set timer to original time
function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  time = ogTime + 1;
  updateTime();
}

// Update timer by ticking down 1s
function updateTime() {
  if (time > 0) {
    time--;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerEl = document.getElementById('timer'); // THE FIX!
    timerEl.innerHTML = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    // When timer hits 0
    playAudio();
    clearInterval(intervalId);
    intervalId = null;
  }
}




// For collapsable task sidebar

// Adds dimensions to side bar
function openNav() {
  document.getElementById("mySidebar").style.width = "300px";
}
// Essentially makes the sidebar disappear 
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.width = "0";

}

// Close button to hide item
var close = document.getElementsByClassName("close");
var items = document.getElementsByTagName("li");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }


function newElement() {
  // Create the list item
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  // Checks to see if there is text input
  if (inputValue === '') {
    alert("No task written");
  } else {
    // Add to UL
    document.getElementById("myUL").appendChild(li);
  }
  // Clear input field 
  document.getElementById("myInput").value = ""

  // Creating the delete span button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Adding a delete functionality onclick for all delete spans
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  // Adding a checked functionality onclick for all list items :D
  // By changing classname to css checked styling
  for (i = 0; i < items.length; i++) {
    items[i].onclick = function(e) {
      // Check it
      if (e.target.className !== "checked") {
        e.target.className = "checked";
      }
      // Uncheck it
      else {
        e.target.className = "none";
      }
    }
  }

}

// For settings, opens it and also closes it by pressing on icon
var settings = document.getElementsByName("setting");

function openSettings() {
//   var audioInput = document.getElementById("customAudio");
// audioInput.addEventListener("change", updateAudio);
  
  let div = document.getElementsByClassName("settingsMenu");
  // Close
  if (div[0].style.top == "50%") {
    div[0].style.top = "0";
    div[0].style.transform = "translate(-50%, -100%)";
  }
  // Open
  else {
    div[0].style.top = "50%";
    div[0].style.transform = "translate(-50%, -50%)";
    // Display default setting content
    displaySetting();
  }

  // Sets up behavior of changing between setting options
  // for loop has to be put within a runned function so onclick behavior is created upon click of settings open button (this function openSettings)
  // can only use (e) in this part of js? 
  for (i = 0; i < settings.length; i++) {
    settings[i].onclick = function(e) {
      // Pressed on already selected setting: do nothing
      if (e.target.className == "selected") {
        return;
      }
      // Press on unselected setting
      else {
        // Remove prev selected to unselected class
        let selected = document.getElementsByClassName("selected");
        // Clear current div settings content 
        let prevDivContent = document.getElementById(selected[0].innerHTML);
        prevDivContent.style.display = "none";
        // Change selected to unselected class
        selected[0].className = "unselected";
        // Change unselected to selected class
        e.target.className = "selected";
        displaySetting();
      }
    }
  }

  // Adds "enter press" behavior for input fields
  var inputs = document.getElementsByClassName("settingsContentInput");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        validate(e);
      }
    });
  }
}

// Logically decide which content to display
function displaySetting() {
  let selected = document.getElementsByClassName("selected");
  // let divContent = document.getElementById("mySettingsContent");
  if (selected[0].innerHTML == "TIMERS") {
    displayTimers(selected[0]);

  } else if (selected[0].innerHTML == "BACKGROUNDS") {
    displayBackgrounds(selected[0]);

  } else if (selected[0].innerHTML == "SOUNDS") {
    displaySounds(selected[0]);

  }
}

// Display timer setting content
function displayTimers(timers) {
  // Make timer div reappear
  let timersDiv = document.getElementById(timers.innerHTML);
  timersDiv.style.display = "block"; // block makes it reappear from none
}

// Display backgrounds setting content
function displayBackgrounds(backgrounds) {
  // Make bg div reappear
  let bgDiv = document.getElementById(backgrounds.innerHTML);
  bgDiv.style.display = "block";
}

// Display sounds setting content
function displaySounds(sounds) {
  // Make sounds div reappear
  let soundsDiv = document.getElementById(sounds.innerHTML);
  soundsDiv.style.display = "block";
}

// Value from input fields
// Logic to next function after pressing "enter"
function validate(e) {
  var value = e.target.value;
  // Call function if spotify input
  if (e.target.id == "spotifyPlaylist") {
    changeSpotifyPlaylist(value);
    return;
  }

  // Invalid Cases (makes input box red)
  // Case 1: Negative number
  if (value < 0) {
    e.target.style.border = "solid 2px #fa1e43";
    e.target.style.width = "200px";
    return;
  }
  // Case 2: 2 decimal digits
  if ((value * 10) % 1 != 0) {
    e.target.style.border = "solid 2px #fa1e43";
    e.target.style.width = "200px";
    return;
  }

  // Call function based on which timer to target
  if (e.target.id == "pomodoroInput") {
    changePomodoroTimer(value);
  } else if (e.target.id == "shortBreakInput") {
    changeShortBreakTimer(value);
  } else if (e.target.id == "longBreakInput") {
    changeLongBreakTimer(value);
  }
  // Remove border since correct input
  e.target.style.border = "none";
  e.target.style.width = "475px";
}

// Timer changer functions (independently change the time to avoid switching time selections)
function changePomodoroTimer(num) {
  pomoTime = num * 60;
  if (timeType == "pomo") {
    clearInterval(intervalId);
    intervalId = null;
    time = pomoTime + 1;
    ogTime = pomoTime;
    updateTime();
  }
}

function changeShortBreakTimer(num) {
  shortBreakTime = num * 60;
  if (timeType == "shortBreak") {
    clearInterval(intervalId);
    intervalId = null;
    time = shortBreakTime + 1;
    ogTime = shortBreakTime;
    updateTime();
  }
}

function changeLongBreakTimer(num) {
  longBreakTime = num * 60;
  if (timeType == "longBreak") {
    clearInterval(intervalId);
    intervalId = null;
    time = longBreakTime + 1;
    ogTime = longBreakTime;
    updateTime();
  }
}




function setBackgroundImage(url) {
  document.getElementById("background").style.backgroundImage = "url('" + url + "')";
}

// Appear or dissappear spotify widget
function showSpotify() {
  let div = document.getElementById("spotifyContainer");
  if (div.style.display == "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

// Change spotify playlist
function changeSpotifyPlaylist(playlistSrc) {
  // Extract the url into the iframe element src
  var spotify = document.getElementById("spotify");
  // Counter to know when to set indexes
  var counter = 0;
  // Indexes for substring
  var begin = 0;
  var end = 0;
  for (i = 0; i < playlistSrc.length; i++) {
    if (playlistSrc.charAt(i) == '/') {
      counter += 1;
    }
    // Start of numbers
    if (counter == 4 && begin == 0) {
      begin = i + 1;
    }
    // At '?'
    if (playlistSrc.charAt(i) == '?') {
      end = i + 1;
      break;
    }
  }
  // Extracting src
  let string = playlistSrc.toString();
  let substring = string.slice(begin, end);
  // The specific src format for iframe!
  let extractedSrc = "https://open.spotify.com/embed/playlist/" + substring + "utm_source=generator";

  spotify.src = extractedSrc;
}

// Set the audio
function setAudio(audio) {
  let source = document.getElementById("myAudio");
  source.src = audio;
}

// Play the audio
function playAudio() {
  let audio = document.getElementById("myAudio");
  audio.play();
}

// Volume changer for audio
function changeVolume(volume) {
  let audio = document.getElementById("myAudio");
  // Scale for volume html reasons
  let scaledVolume = volume / 100;
  audio.volume = scaledVolume;
}

// Mute the audio or unmute
function muteAudio() {
  let audio = document.getElementById("myAudio");
  audio.muted = !audio.muted;
}



function updateAudio() {
  let audioInput = document.getElementById("customAudio");
  let fileList = audioInput.files;
  
  
  let opt = document.createElement('option');
  alert(fileList[0].file);
  opt.value = reader.result;
  opt.innerHTML = reader.result.slice(0, -3);

  select = document.getElementById('soundOptions');
  select.appendChild(opt);
  
}

// Reset button (test them audibly though LOL)
function resetAll() {
  // Reset current selection options only
  let selected = document.getElementsByClassName("selected")[0].innerHTML;
  if (selected == "TIMERS") {
    resetAllTimer();
  } else if (selected == "BACKGROUNDS") {
    resetAllBG();
  } else if (selected == "SOUNDS") {
    resetAllSounds();
  }
}

// Reset all timer options
function resetAllTimer() {
  // Reset times
  pomoTime = defaultPomoTime;
  shortBreakTime = defaultShortBreakTime;
  longBreakTime = defaultLongBreakTime;
  // Stop timer
  clearInterval(intervalId);
  intervalId = null;
  // Change current timer 
  if (timeType == "pomo") {
    time = pomoTime + 1;
  } else if (timeType == "shortBreak") {
    time = shortBreakTime + 1;
  } else if (timeType == "longBreak") {
    time = longBreakTime + 1;
  }
  updateTime();
  // Reset visual by changing input fields 
  let fields = document.getElementsByName("timeInput");
  fields[0].value = defaultPomoTime / 60;
  fields[1].value = defaultShortBreakTime / 60;
  fields[2].value = defaultLongBreakTime / 60;

  // Reset input box CSS
  let inputs = document.getElementsByClassName("settingsContentInput");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "none";
    inputs[i].style.width = "475px";
  }
}

function resetAllBG() {
  // Reset background
  // Gets option object and then get value of it
  setBackgroundImage(document.getElementById("bgChanger")[0].value);
  // Reset spotify source
  document.getElementById("spotify").src = "";
  // Reset spotify show
  let div = document.getElementById("spotifyContainer");
  div.style.display = "none";

  // Visually reset all
  document.getElementById("bgChanger").selectedIndex = 0;
  document.getElementById("spotifyPlaylist").value = "";
  document.getElementById("switchSpotify").checked = false;
}

// Reset all sound options
function resetAllSounds() {
  // Reset sound
  setAudio(document.getElementById("soundOptions")[0].value);
  // Reset volume
  changeVolume(100);
  // Reset mute
  let audioMute = document.getElementById("myAudio");
  audioMute.muted = true;

  // Visually reset all
  document.getElementById("soundOptions").selectedIndex = 0;
  document.getElementById("mixer").value = 100;
  document.getElementById("switchSound").checked = false;
}