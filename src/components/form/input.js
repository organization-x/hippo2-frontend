import './input.css';

function Input({placeHolder, label, type, value, onChange, isValid, errorText, className, id}) {
    let error = '';
    let style = 'input';

    if (isValid === 'false') {
        error = errorText;
        style = 'invalid-border';
    }

    return (
        <>
            <label className='label' htmlFor={id}>{label}</label>

            <input type={type} 
            onChange={(e) => {
				if (onChange) onChange(e.target.value)
			} }
            placeholder={placeHolder}
            className={`${style} ${className}`}
            value={value}
			id={id}>
            </input>
            <span className='invalid-text'>{error}</span>
        </>
    );
}

export default Input;
