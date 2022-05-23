import './input.css';

function Input({placeHolder, label, type, value, onChange, isValid, errorText, className}) {
    let error = '';
    let style = 'input';

    if (isValid === 'false') {
        error = errorText;
        style = 'invalid-border';
    }

    return (
        <>
            <label className='label'>{label}</label>

            <input type={type} 
            onChange={(e) => {
				if (onChange) onChange(e.target.value)
			} }
            placeholder={placeHolder}
            className={`${style} ${className}`}
            value={value}>
            </input>
            <span className='invalid-text'>{error}</span>
        </>
    );
}

export default Input;
