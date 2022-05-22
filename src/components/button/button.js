import './button.css';

function Button({bgColor, children, className, txtColor, button='button'}) {
    return (
        <button className={`${'bg-' + bgColor} ${className} ${'txt-' + txtColor} ${button}`}>{children}</button>
    );
}

export default Button;
