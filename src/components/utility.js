import { FaWindows } from 'react-icons/fa'
import { AiOutlineEnter } from 'react-icons/ai'
import { BsArrowLeft, BsFillMenuButtonFill } from 'react-icons/bs'

const getClassNames = (key) => {
	switch (key) {
		case 'backspace':
			return 'cell backspace'
		case 'enter':
			return 'cell enter'
		case 'lAlt':
		case 'rAlt':
			return 'cell alt'
		case 'rCtrl':
		case 'lCtrl':
			return 'cell ctrl'
		case 'lShift':
		case 'rShift':
			return 'cell shift'
		case ' ':
			return 'cell space'
		case 'caps':
			return 'cell caps'
		case 'tab':
			return 'cell tab'
		case 'win':
			return 'cell win'
		default:
			return 'cell'
	}
}

const getValues = (key) => {
	switch (key) {
		case 'backspace':
			return <BsArrowLeft />
		case 'enter':
			return <AiOutlineEnter />
		case 'lAlt':
		case 'rAlt':
			return 'alt'
		case 'rCtrl':
		case 'lCtrl':
			return 'ctrl'
		case 'lShift':
		case 'rShift':
			return 'shift'
		case ' ':
			return ' '
		case 'caps':
			return 'caps'
		case 'tab':
			return 'tab'
		case 'win':
			return <FaWindows />
		case 'menu':
			return <BsFillMenuButtonFill />
		default:
			return key
	}
}

const keys = [
	[
		'`',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'-',
		'=',
		'backspace',
	],
	['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
	['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
	['lShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'rShift'],
	['lCtrl', 'win', 'lAlt', ' ', 'rAlt', 'fn', 'menu', 'rCtrl'],
]

export { keys, getClassNames, getValues }
