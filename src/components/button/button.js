import './button.css';

function Button({ onClick, bgColor, children, className, txtColor, href, isLink = false, disabled = false, button = 'button' }) {
	if (isLink) {
		return (
			<a href={href} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button} ${disabled ? '' : 'active'}`}>{children}</a>
		);
	} else {
		return (
			<button onClick={onClick} disabled={disabled} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button} ${disabled ? '' : 'active'}`}>{children}</button>
		);
	}
}

export default Button;
