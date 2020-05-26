import * as React from "react";
import {useEffect, useState} from "react";


//------------------------SPEECH RECOGNITION-----------------------------


//------------------------COMPONENT-----------------------------

const Speech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    const [listening, setListening] = useState(false)


    const toggleListen = () => {
        setListening(!listening)
        if(listening) {
            handleListen()
        }
    }

    const handleListen = () => {

        console.log('listening?', listening)

        if (listening) {
            recognition.start()
            recognition.onend = () => {
                console.log("...continue listening...")
                recognition.start()
            }

        } else {
            recognition.stop()
            recognition.onend = () => {
                console.log("Stopped listening per click")
            }
        }

        recognition.onstart = () => {
            console.log("Listening!")
        }

        let finalTranscript = ''
        recognition.onresult = event => {
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }
            // document.getElementById('interim').innerHTML = interimTranscript
            // document.getElementById('final').innerHTML = finalTranscript

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)
            console.log('stopCmd', stopCmd)
            document.getElementById('idInputLocation').innerHTML = stopCmd[0]

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
                recognition.stop()
                recognition.onend = () => {
                    console.log('Stopped listening per command')
                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    document.getElementById('idInputLocation').innerHTML = finalText
                    console.log('finalText: ', finalText)
                }
            }
        }

        //-----------------------------------------------------------------------

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }

    }

    return (
        <div>
            <button id='microphone-btn' onClick={() => toggleListen()}>&#127908;</button>
            {/*<div id='interim'/>*/}
            {/*<div id='final'/>*/}
         </div>
    )
}

export default Speech


//-------------------------CSS------------------------------------



