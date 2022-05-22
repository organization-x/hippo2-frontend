import './button.css';

function Button({bg_color, children, className, txt_color, button='button'}) {
    return (
        <button className={`${bg_color} ${className} ${txt_color} ${button}`}>{children}</button>
    );
}

export default Button;