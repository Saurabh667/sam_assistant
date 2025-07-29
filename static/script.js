console.log('hello')
let transcript

document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("bg-video");
    video.playbackRate = 0.2; 
  });
  const msg = new SpeechSynthesisUtterance("initialising sam........");
    window.speechSynthesis.speak(msg);
  const startBtn = document.querySelector(".mic");
  const output = document.querySelector(".output");

function bolo(audio){
  speaker = new SpeechSynthesisUtterance(audio)
  window.speechSynthesis.speak(speaker)
}

function samjho(){
  let command='';
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
        let command=transcript.toLowerCase()
        // command+=transcript
        output.innerText = `You said: ${transcript}`;
        console.log("Transcript:", transcript);
        if(command.includes('open google')){
            console.log('madarchod hai ayush')
            window.open('https://google.com', '_blank');
            bolo('opening google sir')
            }
        else if(command.includes('open facebook')){
          window.open('https://facebook.com',"_blank");
          bolo('opening facebook sir')
        }
        else if(command.includes('open intagram')){
          window.open('https://instagram.com',"_blank");
          bolo('opening instagram sir')
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
        if (transcript && transcript.toLowerCase() === 'hello.'){
            bolo(transcript)
            samjho()
            
            // console.log("Transcript:", transcript);
        //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        //     if (!SpeechRecognition) {
        //       output.innerText = "Your browser does not support Speech Recognition.";
        //       error1="Your browser does not support Speech Recognition.";
        //       bolo(error1)
        //       }
        //     else{
        //       const recognition = new SpeechRecognition();
        //       recognition.continuous = false;
        //       recognition.interimResults = false;
        //       recognition.lang = 'en-US';
        //       startBtn.addEventListener("click",()=>{
        //          output.innerText = "Listening...";
        //          recognition.start();
                 
        //       });
        //       recognition.onresult=(event)=>{
        //         const command = event.results[0][0].command;
        //         output.innerText = `You said: ${command}`;

        //       }
        //     }
        }
        else{
          console.log('thik sa kaam karo')
        }
        
      };

      recognition.onerror = (event) => {
        output.innerText = `Error occurred: ${event.error}`;
      };
    }