

const sayText = (text, language) => {
    const message = new SpeechSynthesisUtterance();
    message.lang = language;
    message.text = text;
    window.speechSynthesis.speak(message);
}

export default sayText;
