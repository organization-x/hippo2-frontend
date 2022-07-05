import { useState } from "react";
import validateUserInformation from "../../validation/userInformation";
import formatApiErrors from "../../validation/formatApiErrors";
import sendReq from "../../services/sendReq";
import baseUrl from "../../apiUrls";
import PhoneInput from "react-phone-input-2";
import Input from "../../components/form/input";
import Button from "../../components/button/button";
import 'react-phone-input-2/lib/style.css';
import './getInformation.css';

function GetInformation({headerText, init_first_name, init_last_name, init_email, init_phone, init_dob, id, editing, className, onNext, type}) {
    const [first_name, setFirstName] = useState(init_first_name || '');
    const [last_name, setLastName] = useState(init_last_name || '');
    const [dob, setBirthday] = useState(init_dob || '');
    const [phone, setPhone] = useState(init_phone || '');
    const [email, setEmail] = useState(init_email || '');
    const [formErrors, setFormErrors] = useState({});
    const [is_editing, toggleEditing] = useState(editing);
    
    const onSubmit = () => {
        // executes when the Next button is clicked or when form is submitted
        setFormErrors({});
        const info = {
            first_name,
            last_name,
            phone,
	    type
        };

	if (type === 'STUDENT') {
	    info.dob = dob;
	}

        const [err, data] = validateUserInformation(info, type);

        if (err) {
	    return setFormErrors(err);
        }

        const updateUrl = `${baseUrl}/api/v1/users/${id}/`
        const options = {
            method: 'POST',
            body: {  
                id: id,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone,
		type: data.type
            }
        }

	if (type === 'STUDENT') {
	    options.body.dob = dob;
	}

        sendReq(updateUrl, options).then((res) => { 
	    toggleEditing(false);
	    onNext(res.data);
	}).catch(err => { 
            if (err.status === 400) {
                const keyMap = {
                    'first_name': 'first_name',
                    'last_name': 'last_name',
                    'phone_number': 'phone'
                };
                setFormErrors(formatApiErrors(err.data, keyMap));
            }
        });
    }

    return (
        <form action="/" method="GET" onSubmit={event => {
            event.preventDefault();
        }} className={`flex-none md:flex-initial w-full py-5 px-8 ${className}`}>
            <h2 className="text-xl mb-7 text-center">{headerText}</h2>
            <div className="mb-8 mt-5">
                <Input label="First Name"
                    type="text"
                    placeHolder={is_editing ? 'John': ''}
                    className="mb-3" 
                    value={first_name}
                    isValid={formErrors.first_name?.length}
                    errorText={formErrors.first_name?.[0]}
                    onChange={val => setFirstName(val)}
                    readOnly={!is_editing}    
                />
                <Input label="Last Name"
                    type="text"
                    placeHolder={is_editing ? 'Doe' : ''}
                    className="mb-3"
                    value={last_name}
                    isValid={formErrors.last_name?.length}
                    errorText={formErrors.last_name?.[0]}
                    onChange={val => setLastName(val)}
                    readOnly={!is_editing}    
                />

		<Input label="Email"
                    type="text"
                    placeHolder={is_editing ? "example@email.com" : ''}
                    className="mb-3"
                    value={email}
                    isValid={formErrors.email?.length}
                    errorText={formErrors.email?.[0]}
                    onChange={val => setEmail(val)}
                    readOnly
                />

                <label className={`form-label mb-1`}>Mobile Phone Number</label>
                <PhoneInput 
                    specialLabel="Phone Number"
                    enableSearch
                    countryCodeEditable={false}
	            inputClass={!is_editing && 'readonly'}
	            buttonClass={!is_editing && 'hidden'}
                    country={'us'}
                    disableSearchIcon
                    disabled={!is_editing}    
                    value={phone}
                    onChange={value => {
                        setPhone(value);
                    }}
                    isValid={() => {
                        return !formErrors.phone?.length;
                    }}
                />
                {
                formErrors.phone?.length ? 
                    <span className='mt-1 block form-error text-sm'>{formErrors.phone[0]}</span> 
                : 
                    null
                }
	    	{type === 'STUDENT' ?
                    <Input label="Birth Month and Year"
                        type="text"
                        placeHolder={!is_editing ? '' : 'MM/YYYY'}
                        value={dob}
                        isValid={formErrors.dob?.length}
                        errorText={formErrors.dob?.[0]}
                        onChange={val => setBirthday(val)}
                        className="mt-3"
                        readOnly={!is_editing}    
                    />
		:
		    null
		}
            </div>

            <div className='flex'>
                <Button bgColor={ is_editing ? 'green' : 'white' } 
                    txtColor={ is_editing ? 'white' : 'black' }
                    className={`w-full py-1 ${is_editing || 'border-black border-2'}`}
                    onClick={ () => { 
                                if (is_editing) { 
                                    onSubmit();
                                } 
                                else {
                                    toggleEditing(true);
                                } 
                            }}
                >
                    {is_editing ? "Save" : "Edit Profile"}
                </Button>
            </div>
        </form>
    )
}

export default GetInformation;
