import './input.css';

function Input({placeHolder, label, type, value, onChange, isValid, errorText, className, id}) {
    let error = '';
    let style = 'input';

    if (isValid) {
        error = errorText;
        style += ' invalid-border';
    }

    return (
        <div className={`${className}`}>
            <label className='label' htmlFor={id}>{label}</label>
            <input type={type} 
            onChange={(e) => {
				if (onChange) onChange(e.target.value)
			} }
            placeholder={placeHolder}
            className={style + ' w-full md:w-9/12'}
            value={value}
			id={id}>
            </input>
            <span className='invalid-text'>{error}</span>
        </div>
    );
}

export default Input;
