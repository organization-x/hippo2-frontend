const { useContext, createContext, useState } = require("react");

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
const FADE = 500 // how fast to fadeout the message

export function useFlashMsg() {
	return useContext(FlashMessageContext);
}

export function FlashMsgProvider({ children }) {
	const [msg, setMsg] = useState({});
	const [idCount, setIdCount] = useState(0);

	const flashMsg = (type, text) => {
		const newMsg = {
			status: 'display',
			text: text,
			type: type
		};
		setMsg((prev) => {
			return {
				...prev,
				...{ [idCount]: newMsg }
			};
		});
		// fade message out after certain duration
		setTimeout(() => {
			const fadeMsg = { ...newMsg };
			fadeMsg.status = 'fadeout';
			setMsg((prev) => {
				return {
					...prev,
					...{ [idCount]: fadeMsg }
				};
			});
		}, DURATION);
		// completely remove after fadeout
		setTimeout(() => {
			setMsg((prev) => {
				const prevCopy = { ...prev };
				delete prevCopy[idCount];
				return prevCopy;
			});
		}, DURATION + FADE);
		// increment id tracker
		setIdCount(prev => prev + 1);
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
