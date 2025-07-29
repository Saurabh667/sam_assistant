// FOR BACKGROUND VIDEO ANIMATION

// document.addEventListener("DOMContentLoaded", function () {
//     var video = document.getElementById("bg-video");
//     video.playbackRate = 0.2; 
//   });


const msg = new SpeechSynthesisUtterance("initialising sam........");
window.speechSynthesis.speak(msg);
const startBtn = document.querySelector(".mic");
const output = document.querySelector(".output");

// SPEAK FUNCTION
function bolo(audio) {
  speaker = new SpeechSynthesisUtterance(audio)
  window.speechSynthesis.speak(speaker)
}

// TYPING ANIMATION
function animateText(word) {
  let index = 0;
  const output = document.getElementById("output");
  setInterval(() => {
    if (index < word.length) {
      output.innerHTML += word.charAt(index)
      index++;
    }
  }, 60)
}

function getWeather(city) {
    const apiKey = "fc37c7b1397340f4874180522252907";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const location = data.location.name;
                const region = data.location.region;
                const country = data.location.country;
                const tempC = data.current.temp_c;
                const condition = data.current.condition.text;
                const feelsLike = data.current.feelslike_c;

                const result = `The current temperature in ${location}, ${region}, ${country} is ${tempC}°C. It feels like ${feelsLike}°C with ${condition}.`;
                
               animateText(result)
               bolo(result)

            } else {
                const errorMsg = "Sorry, I couldn't find the weather for that location.";
                animateText(errorMsg)
                bolo(errorMsg)
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}


// RECOGNIZATION FUNCTION 

function samjho() {
  let command = '';
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    output.innerText = "Your browser does not support Speech Recognition.";
  } else {
    let recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    startBtn.addEventListener("click", () => {
      output.innerText = "Listening...";
      recognition.start();
    });

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      let command = transcript.toLowerCase()
      output.innerText = `You said: ${transcript}\n`;
      console.log("Transcript:", transcript);
      if (command.includes('open google')) {
        
        window.open('https://google.com', '_blank');
        bolo('opening google sir')
      }
      else if (command.includes('open facebook')) {
        window.open('https://facebook.com', "_blank");
        bolo('opening facebook sir')
      }
      else if (command.includes('open instagram')) {
        window.open('https://instagram.com', "_blank");
        bolo('opening instagram sir')
      }
      else if (command.includes('open telegram')) {
        window.open('https://web.telegram.org/k/', "_blank")
        bolo('opening telegram sir')
      }
      else if (command.includes('open youtube')) {
        window.open('https://www.youtube.com/', "_blank")
      }
      else if (command.includes('who are you') || command.includes('introduce')) {
        i = 'Hello I am SAM a virtual assistant created by my God Lord SAURABH , I get activated by saying Hello I am capable of performing various tasks and personal assistance.I am improving day by day and always remember life has no values without achievements.           Thank you!'
        bolo(i)
        animateText(i)
      }
      else if(command.includes('weather')){

        let parts = command.toLowerCase().split("weather of");

        if (parts.length > 1) {
            let city = parts[1].trim();
            console.log(city); 
            getWeather(city)
        }
        
      }
      else {
        // aiProcess(command)
        fetch("/call-ai/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ command: command })
        })
          .then(response => response.json())
          .then(data => {
            // output.innerText = data.response;
            ai_output=data.response
            animateText(ai_output)
            bolo(ai_output)
          })
          .catch(error => {
            console.error("Error:", error);
            output.innerText = "Something went wrong.";
          });
      }
    };

    recognition.onerror = (event) => {
      output.innerText = `Error occurred: ${event.error}`;
    };
  }

}

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  output.innerText = "Your browser does not support Speech Recognition.";
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  startBtn.addEventListener("click", () => {
    output.innerText = "Listening...";
    recognition.start();

  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.innerText = `You said: ${transcript}`;
    console.log("Raw Transcript:", transcript);
    console.log("Lowercase:", transcript.toLowerCase());
    if (transcript && transcript.toLowerCase() === 'hello.') {
      bolo(transcript)
      samjho()
      bolo('I am activated now')
      bolo('now you can ask any thing you want to ask')
    }
    else {
      bolo('say hello to start ')
    }

  };

  recognition.onerror = (event) => {
    output.innerText = `Error occurred: ${event.error}`;
  };
}

function animateIcon(element) {
  element.classList.add('bounce');

  element.addEventListener('animationend', function handler() {
    element.classList.remove('bounce');
    element.removeEventListener('animationend', handler);
  });
}
