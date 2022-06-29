import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/button";
import sendReq from "../../services/sendReq";
import { useParams } from "react-router-dom";
import baseUrl from "../../apiUrls";
import { useEffect, useState } from "react";

function SelectionPage(){
    const [batchData, setBatchData] = useState({});
    const [studentData, setStudentData] = useState([]);
    const [pendingInvites, setPendingInvites] = useState([]);
    const { batchID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(batchID){
            const batch_url = baseUrl + `/api/v1/batches/${batchID}/`;
            const students_url = baseUrl + `/api/v1/users/groupstudents/`;
            const pending_invites_url = baseUrl + `/api/v1/users/pendinginvites/`;
            const options = {
                method: 'GET',
            };
            sendReq(batch_url, options).then(res => {
                setBatchData(res.data);
            });
            sendReq(students_url, options).then(res => {
                setStudentData(res.data);
            });
            sendReq(pending_invites_url, options).then(res => {
                setPendingInvites(res.data);
            });
        };
    }, [batchID]);
    
    function SideBar(){
        return (
            <div className="flex-none md:flex-initial w-full md:w-80 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
                    <h1 className="text-3xl mb-10 text-center">
                        Select a Student
                    </h1>
                    <h1 className="text-1xl mx-4 my-3">You have chosen Batch {batchData.batch_name} ({batchData.batch_start_date} - {batchData.batch_end_date}) {batchData.time_zone} in the {batchData.course_name}.</h1>
                    <h1 className="text-1xl mx-4 my-3">Select the student for whom you would like to reserve this spot for.</h1>
                    <h1 className="text-1xl mx-4 mb-6">You may register for additional students afterwards.</h1>
            </div>
        )
    }

    function Selection(){
        const onNext = (id) => {
            const path = `/batches/${batchID}/pay?for=${id}`;
            navigate(path); 
        };
        const buttons = [];
        if(studentData.length > 0){
            for(let i = 0; i < studentData.length; i++){
                if(i % 2 === 0){
                    buttons.push(
                    <Button key={i} onClick={() => onNext(studentData[i].id)} bgColor='black'
                    txtColor='white' 
                    className="mt-3 px-28 py-4">
                    <p className="text-lg">{studentData[i].first_name + ' ' + studentData[i].last_name}</p>
                    </Button>)
                }
                else{
                    buttons.push(
                    <Button key={i} onClick={() => onNext(studentData[i].id)} bgColor='white'
                    txtColor='black' 
                    className="mt-3 px-28 py-4">
                    <p className="text-lg">{studentData[i].first_name + ' ' + studentData[i].last_name}</p>
                    </Button>)
                }
            }
        }
        if(pendingInvites.length > 0){
            for(let i = 0; i < pendingInvites.length; i++){
                if(i % 2 === 0){
                    buttons.push(
                    <Button key={i + studentData.length} onClick={() => onNext(pendingInvites[i].invite_to.id)} bgColor='black'
                    txtColor='white' 
                    className="mt-3 px-28 py-4">
                    <p className="text-lg">{pendingInvites[i].invite_to.first_name + ' ' + pendingInvites[i].invite_to.last_name}</p>
                    </Button>)
                }
                else{
                    buttons.push(
                    <Button key={i + studentData.length} onClick={() => onNext(pendingInvites[i].invite_to.id)} bgColor='white'
                    txtColor='black' 
                    className="mt-3 px-28 py-4">
                    <p className="text-lg">{pendingInvites[i].invite_to.first_name + ' ' + pendingInvites[i].invite_to.last_name}</p>
                    </Button>)
                }
            }
        }
        return (
            <div>
	            <div className="my-2 text-center w-full">
                    <h2 className="text-2xl mt-3">Reserve spot in the {batchData.course_name} for</h2>
	            </div>
                <div className="flex flex-wrap justify-center my-10">
                    {buttons}
                </div>                 
            </div>
        )
    }
    function BackButton(){
        const onBack = () => {
        };
        return(
            <div className="flex flex-wrap justify-between my-5">
                 <Button 
                    onClick={() => onBack()} 
                    bgColor="gray" 
                    txtColor="white" 
                    className="w-full lg:w-1/4 h-12 mb-2 sm:ml-10 lg:my-3"
                >
                    <p className="text-lg">Back</p>
                </Button>
            </div>
        )
    }

    return (
        <div className='container max-w-7xl mt-48 flex flex-wrap justify-center mx-auto auth'>
            <SideBar/>
            <div className="flex flex-col justify-center md:flex-initial w-full md:w-5/12 px-10 rounded-b-2xl md:rounded-r-2xl bg-white">
                <Selection/>
                <BackButton/>
            </div>
        </div>
    );
}

export default SelectionPage;
