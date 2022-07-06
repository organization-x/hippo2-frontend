import React from "react";
import { useState,useEffect } from 'react';
import { useAuth } from "../../services/authentication";
import baseUrl from '../../apiUrls';


function AlertBanner(){
    const auth = useAuth();
    const [isParent,setIsParent] = useState(false);
    const [completed,setCompleted] = useState(true);
    useEffect(() => {
        if (auth.user.type==='PARENT'){
            setIsParent(true);
        }
        const url =  baseUrl+'/api/v1/users/'+auth.user.id+'/tasks/';
        auth.autoAuthReq(url,{method:'GET'})
			.then(data => {
                setCompleted(data.data.completed);
			});
	  }, [auth]);
    
    return (
        <>
            {completed ?
                <div className="bg-red-500 h-max text-white text-center py-6">
                    {isParent ? 
                        <div>
                            <p>One or more of your children have incomplete tasks in their To Do List.</p>
                            <p> Click here to complete them so you can help your child prepare for their course!</p>
                        </div>:null
                    }
                    {!isParent ? 
                        <div>
                            <p>You have incomplete tasks in your To Do List.</p>
                            <p> Click here to complete them now so you can gain access to your couse materials!</p>
                        </div>:null
                    }
                </div>:null
            }
        </>
    )
}

export default AlertBanner;