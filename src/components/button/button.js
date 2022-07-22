import './button.css';

function Button({ onClick, bgColor, children, className, txtColor, href, type, isLink = false, disabled = false, button = 'button' }) {
	if (isLink) {
		return (
			<a href={href} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button} ${disabled ? '' : 'active'}`}>{children}</a>
		);
	} else {
		return (
			<button type={type} onClick={onClick} disabled={disabled} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button} ${disabled ? '' : 'active'}`}>{children}</button>
		);
	}
}

export default Button;
