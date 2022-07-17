import './ttlogo.css';
import TTLogoSVG from '../../ttlogo.svg';
import HippoSVG from '../../hippo.svg';

function TTLogo() {
    return (
        <div className="ttlogo-main-container">
            <a href="https://www.ai-camp.org/" className="tt-logo">
				<img src={TTLogoSVG} alt="logo"/>
            </a>

            <div className="ttlogo-text-box-container">
                <div className="hippo-logo-container">
                    <img src={HippoSVG} alt="hippo-logo" className="ttlogo-text-box-hippo float-right"/>
                </div>
                
                <div className="ttlogo-text-box-left">
                    <p className="ttlogo-text-box-top text">
                        This system was built entirely by Team Tomorrow, AI Camp’s team of teen developers, in a project called hippo2!    
                    </p>
                    
                    <p><span>Product Manager: </span> Sricharan Guddanti</p>        
                    <p><span>Product Designer: </span> Bernice Lau</p>        
                    <p><span>Software Developers: </span> Jackson Choyce, Alex Zhou</p>        
                </div>
            </div>     
        </div>
    );
}

export default TTLogo;