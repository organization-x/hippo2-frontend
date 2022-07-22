import './textarea.css';

function Textarea({ placeHolder, label, type, value, onChange, isValid, errorText, className, id, readOnly, maxLength }) {
	let error = '';
	let style = 'textarea';

	if (isValid) {
		error = errorText;
		style += ' invalid-border';
	}

	return (
		<div className={`${className}`}>
			<label className='form-label' htmlFor={id}>{label}</label>
			<textarea type={type} 
				onChange={(e) => {
					if (onChange) onChange(e.target.value);
				} }
				readOnly={readOnly}
				disabled={readOnly}
				placeholder={placeHolder}
				className={'w-full ' + style }
				value={value}
				id={id}
				maxLength={maxLength}
			>
			</textarea>
			<span className='invalid-text'>{error}</span>
		</div>
	);
}

export default Textarea;
