import './ttlogo.css';
import TTLogoSVG from'../../ttlogo.svg';
import HippoSVG from '../../hippo.svg';
import { useState } from 'react';

function TTLogo(){
    const [displayTextBox, updateDisplay] = useState(false);

    return (
        <div className="768px or hidden md:block ttlogo-main-container">
            
            <a className="tt-logo">
				<img src={TTLogoSVG} alt="logo" onMouseEnter={() => updateDisplay(true)} onMouseLeave={() => updateDisplay(false)}  href="https://www.ai-camp.org/"/>
            </a>

            {
                displayTextBox ? (
                <div className="ttlogo-text-box-container">
                    <div className="hippo-logo-container">
                        <img src={HippoSVG} alt="hippo-logo" className="ttlogo-text-box-hippo float-right"/>
                    </div>
                
                    <div className="ttlogo-text-box-left">
                        <p className="ttlogo-text-box-top">
                            This system was built entirely by Team Tomorrow, AI Camp’s team of teen developers, in a project called hippo2!    
                        </p>
                        
                        <div className="ttlogo-text-box-bottom">
                            <div className="tt-intro flex">
                                <h1>Product Manager:</h1>
                                <p>Sri</p>
                            </div>
                            <div className="tt-intro flex">
                                <h1>Product Designer:</h1>
                                <p>Bernice</p>
                            </div>
                            <div className="tt-intro flex">
                                <h1>Software Developers:</h1>
                                <p>Jackson, Alex Z</p>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null
            }

            
        </div>
    );
}

export default TTLogo;