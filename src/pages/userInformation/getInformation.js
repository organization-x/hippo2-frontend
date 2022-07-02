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

function GetInformation({headerText, first_name, last_name, id, editing, className, onNext}) {
    const [new_first_name, setFirstName] = useState(first_name || '');
    const [new_last_name, setLastName] = useState(last_name || '');
    const [new_email, setEmail] = useState('');
    const [new_birthday, setBirthday] = useState('');
    const [new_phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [editing_toggle, toggleEditing] = useState(editing);
    
    const onSubmit = () => {
        // executes when the Next button is clicked or when form is submitted
        setFormErrors({});
        const info = {
            'fName': new_first_name,
            'lName': new_last_name,
            'email': new_email,
            'phone': new_phone,
            'dob': new_birthday
        };
	console.log(new_phone);

        const [err, data] = validateUserInformation(info);

        if (err) {
            return setFormErrors(err);
        }

        const updateUrl = `${baseUrl}/api/v1/users/${id}/`
        const options = {
            method: 'POST',
            body: {  
                id: id,
                first_name: data.fName,
                last_name: data.lName,
                email: data.email,
                phone_number: data.phone,
                dob: data.dob,
            }
        }

        sendReq(updateUrl, options).then(() => { 
	    toggleEditing(false);
	    onNext();
	}).catch(err => { 
            if (err.status === 400) {
                const keyMap = {
                    'first_name': 'firstName',
                    'last_name': 'lastName',
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
                    placeHolder="John"
                    className="mb-3" 
                    value={new_first_name}
                    isValid={formErrors.firstName?.length}
                    errorText={formErrors.firstName?.[0]}
                    onChange={val => setFirstName(val)}
                    readOnly={!editing_toggle}    
                />
                <Input label="Last Name"
                    type="text"
                    placeHolder="Doe"
                    className="mb-3"
                    value={new_last_name}
                    isValid={formErrors.lastName?.length}
                    errorText={formErrors.lastName?.[0]}
                    onChange={val => setLastName(val)}
                    readOnly={!editing_toggle}    
                />
                <Input label="Email"
                    type="email"
                    placeHolder="example@gmail.com"
                    className="mb-3" 
                    value={new_email}
                    isValid={formErrors.email?.length}
                    errorText={formErrors.email?.[0]}
                    onChange={val => setEmail(val)}
                    readOnly={!editing_toggle}    
                />
                <label className="form-label mb-1">Mobile Phone Number</label>
                <PhoneInput 
                    specialLabel="Phone Number"
                    enableSearch
                    countryCodeEditable={false}
                    country={'us'}
                    disableSearchIcon
                    disabled={!editing_toggle}    
                    value={new_phone}
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
                <Input label="Birth Month and Year"
                    type="text"
                    placeHolder="MM/YYYY"
                    value={new_birthday}
                    isValid={formErrors.dob?.length}
                    errorText={formErrors.dob?.[0]}
                    onChange={val => setBirthday(val)}
                    className="mt-3"
                    readOnly={!editing_toggle}    
                />
            </div>

            <div className="flex">
                <Button bgColor={editing_toggle ? "green" : "gray" } 
                    txtColor="white" 
                    className="w-full py-1" 
                    onClick={ () => { 
                                if (editing_toggle) { 
                                    onSubmit();
                                } 
                                else {
                                    toggleEditing(true);
                                } 
                            }}
                >
                    {editing_toggle ? "Save" : "Edit Profile"}
                </Button>
            </div>
        </form>
    )
}

export default GetInformation;
