import './button.css';

function Button({onClick, bgColor, children, className, txtColor, href, isLink=false, button='button'}) {
	if (isLink) {
		return (
			<a href={href} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button}`}>{children}</a>
		);
	} else {
		return (
			<button onClick={onClick} className={`btn ${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button}`}>{children}</button>
		);
	}
}

export default Button;
