
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

export class Recognizer {

    constructor() {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = "ru-RU";
        if (!isMobile()) {
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
        }
        this.isRecognizing = false;
        this.transcript = "";
    }

    start(handler) {
        this.transcript = "";
        this.recognition.onresult = (event) => {
            this.onResult(event, handler);
        };
        this.recognition.start();
        this.isRecognizing = true;
        console.log("Started recognition");
    }

    stop() {
        this.recognition.abort();
        this.isRecognizing = false;
        console.log("Stopped recognition");
    }

    onResult(event, handler) {
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            let result = event.results[i];
            if (result.isFinal) {
                this.transcript += result[0].transcript;
            } else {
                interim_transcript += result[0].transcript;
            }
        }
        if(interim_transcript.length > 2) {
            handler(interim_transcript)
        }
        console.log(interim_transcript);
    }
}
