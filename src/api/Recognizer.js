function isMobile() {
	return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

export class Recognizer {
	constructor() {
		this.recognition = new SpeechRecognition();
		this.recognition.lang = 'ru-RU';
		if (!isMobile()) {
			this.recognition.continuous = true;
			this.recognition.interimResults = true;
		}
		this.isRecognizing = false;
		this.transcript = '';
	}

	start(handler) {
		this.transcript = '';
		this.recognition.onresult = (event) => {
			this.onResult(event, handler);
		};
		this.recognition.start();
		this.isRecognizing = true;
	}

	stop() {
		this.recognition.abort();
		this.isRecognizing = false;
	}

	onResult(event, handler) {
		let interimTranscript = '';
		for (let i = event.resultIndex; i < event.results.length; ++i) {
			const result = event.results[i];
			if (result.isFinal) {
				this.transcript += result[0].transcript;
			} else {
				interimTranscript += result[0].transcript;
			}
		}
		if (interimTranscript.length > 2) {
			handler(interimTranscript);
		}
	}
}
