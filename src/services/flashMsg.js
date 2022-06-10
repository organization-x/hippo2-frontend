const { useContext, createContext, useState, useRef } = require("react");

/**
 * ==============================================
 * Provides abstractified auth methods
 * useFlashMsg() 		- returns react context with flash message methods
 * FlashMsgProvier		- component wrapper that provides flash message context
 *
 * METHODS
 * msg					- object with msg info
 * flashMsg()			- sets a flash message with text and type. resets after DURATION (ms)
 * ==============================================
 */

const FlashMessageContext = createContext();

const DURATION = 5000; // flash message duration (ms)

export function useFlashMsg() {
	return useContext(FlashMessageContext);
}

export function FlashMsgProvider({ children }) {
	const [msg, setMsg] = useState({
		text: '',
		type: ''
	});
	const msgRef = useRef(msg);
	msgRef.current = msg;

	const flashMsg = (type, text) => {
		setMsg({
			text,
			type
		});
		setTimeout(() => {
			// prevent reset if there is new text
			if (msgRef.current.text === text) {
				setMsg({
					text: '',
					type: ''
				});
			}
		}, DURATION);
	};

	const value = {
		msg,
		flashMsg
	};

	return (
		<FlashMessageContext.Provider value={value}>
			{children}
		</FlashMessageContext.Provider>
	);
}
