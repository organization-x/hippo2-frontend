import './input.css';

function Input({ph, label, type, value, onChange, isValid, errorText}) {
    var error = '';
    var style = 'input';

    if (isValid === 'false') {
        error = errorText;
        style = 'invalidBorder'
    }

    return (
        <div>
            <label className='label'>{label}</label>

            <input type={type} 
            onChange={onChange}
            placeholder={ph}
            className={style}
            value={value}>
            </input><span className='invalidText'>{error}</span>
        </div>
    );
}

export default Input;
