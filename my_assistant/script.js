let box=document.querySelector(".box");
let btn=document.querySelector("button");

const speakFunc = (input) => {
    let speakInput= new SpeechSynthesisUtterance(input);
    //speakInput.rate=1;
    //speakInput.pitch=1;
    //speakInput.volume=1;
    speakInput.lang='en-IN';
    window.speechSynthesis.speak(speakInput);
}
window.onload=()=>{
    //speakFunc("Hello Akshaya");
    greet();
} 
const greet=()=>{
    let date=new Date();
    let hour=date.getHours();
    if(hour>=0 && hour<12){
        speakFunc("Good Morning, How may I help you ! ");
    }else if(hour>=12 && hour<16){
        speakFunc("Good Afternoon, How may I help you ! ");
    }
    else speakFunc("Good Evening, How may I help you ! ");
}

const startVoiceInput=()=>{
    if('webkitSpeechRecognition' in window){
        let recog=new webkitSpeechRecognition();
        recog.lang='en-US';
        recog.onresult=(e) =>{
            let spokenText=e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove("btn-box");
            btn.innerHTML=`<i class="fa-solid fa-microphone-lines-slash"></i>`
        }
        recog.start();
    }else alert("Your browser does not support voice recognition")
    
}
btn.onclick=()=>{
    box.classList.add("btn-box");
    btn.innerHTML=`<i class="fa-solid fa-microphone-lines"></i>`
    startVoiceInput();
}

const handleCommands=(command)=>{
    console.log(command);
    if(command.includes("hello") || command.includes("hey") || command.includes("hi")){
        speakFunc("Hello, How may I help you !");
    }
    else if(command.includes("what is your name") || command.includes("develop") || command.includes("who are you")){
        speakFunc("Hi, I am a Virtual Assistant developed by Akshaya !");
    }else if(command.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:'numeric',minute:'numeric'});
        speakFunc(time);
    }else if(command.includes("date")){
        let time=new Date().toLocaleString(undefined,{day:'numeric',month:'long'});
        speakFunc(time);
    }else if(command.includes("open chat gpt")){
        speakFunc("opening chat G P T");
        window.open("https://openai.com/chatgpt/");
    }else if(command.includes("open")){
        let eliminate="open";
        let updatedCommand=command.replace(eliminate,"").trim();
        speakFunc(`opening...${updatedCommand}`);
        window.open(`https://www.${updatedCommand}.com`);
    }else{
        speakFunc(`this is what i found on the internet regarding ${command}`)
        window.open(`https://www.google.com/search?q=${command}`)
    }
}