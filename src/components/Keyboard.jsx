import './styles/keyboard.css'
import React, { useState, useRef, useEffect } from 'react'
import { keys, getClassNames, getValues } from './utility'
import sound from './keystroke.mp3'

function Keyboard({ text }) {
	const textField = useRef(null)
	const keyRefs = useRef([])
	const keyboard = useRef(new Map())
	const runningState = useRef(false)

	const loadKeyboard = () => {
		let k = 0
		for (let row of keys) {
			for (let key of row) {
				keyboard.current.set(key, keyRefs.current[k])
				k++
			}
		}
	}

	const sleep = async (ms) => {
		await new Promise((res) => setTimeout(res, ms))
	}

	const pressKey = async (key, speed, isCapital) => {
		// Key down
		const audio = new Audio(sound)
		audio.play()
		if (isCapital) {
			keyboard.current.get('lShift').classList.add('pressed-cell')
			keyboard.current.get('lShift').firstChild.classList.add('pressed-key')
		}
		key.classList.add('pressed-cell')
		key.firstChild.classList.add('pressed-key')

		// Key up
		await sleep(150)
		// audio.pause()
		if (isCapital) {
			keyboard.current.get('lShift').classList.remove('pressed-cell')
			keyboard.current.get('lShift').firstChild.classList.remove('pressed-key')
		}
		key.classList.remove('pressed-cell')
		key.firstChild.classList.remove('pressed-key')
		await sleep(speed)
	}

	const typeLine = async (line) => {
		for (let letter of line) {
			const key = keyboard.current.get(letter.toLowerCase())
			const speed = Math.floor(Math.random() * (200 - 50) + 50)
			textField.current.lastElementChild.innerHTML += letter
			if (keyboard.current.has(letter)) {
				await pressKey(
					key,
					speed,
					letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90
				)
			}
		}
	}

	const startTyping = async () => {
		textField.current.innerHTML = ''
		for (let line of text) {
			const h3 = document.createElement('h3')
			textField.current.appendChild(h3)
			textField.current.lastElementChild.setAttribute('last', '1')
			await typeLine(line)
			textField.current.lastElementChild.removeAttribute('last')
			textField.current.lastElementChild.innerHTML = line
			await pressKey(keyboard.current.get('enter'), 300, false)
		}
		textField.current.lastElementChild.setAttribute('last', '1')
		await sleep(3000)
	}

	useEffect(() => {
		if (!keyboard.current.size) {
			loadKeyboard()
		}

		if(!runningState.current) {
			runningState.current = true
			startTyping()
		}

	}, [runningState])
	
	return (
		<div className="container">
			<div className="input-field">
				{/* <button onClick={onClick}>.</button> */}
			</div>
			<div ref={textField} className="text-field"></div>
			<div className="keyboard">
				{keys.map((row, index) => (
					<div key={index} className="row">
						{row.map((key, index) => (
							<div
								key={index}
								ref={(element) => keyRefs.current.push(element)}
								className={getClassNames(key)}
							>
								<div className="key">
									<i>{getValues(key)}</i>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Keyboard
