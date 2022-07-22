import QuestionInput from '../../components/questionInputs/questionInput';
import ScholarshipBanner from '../../components/ScholarshipBanner/ScholarshipBanner';
import Button from '../../components/button/button';

function ApplicationQuestions() {
    return (
        <>
            <ScholarshipBanner/>
            <div className="flex flex-col">
                <div className="w-full flex flex-row px-24 py-12 justify-center md:w-2/3 mx-auto mt-12 mb-24 rounded-xl bg-white">
                    <form action="/" method="GET" onSubmit={event => {
                        event.preventDefault();
                    }} className="flex-none md:flex-initial w-full bg-white rounded-xl md:rounded-r-xl md:rounded-none">
                        <QuestionInput
                            questionNum={"1."}
                            placeHolder="Enter response here"
                            className="my-6 md:w-full"
                            question="What would you like to learn about AI?"
                            mutedText="(Word Max: 150 words)"
                            maxLength={150}
                        />
                        <QuestionInput
                            questionNum={"2."}
                            placeHolder="Enter response here"
                            className="my-6 md:w-full"
                            question="Why do you want to join AI Camp?"
                            mutedText="(Word Max: 150 words)"
                            maxLength={150}
                        />
                        <QuestionInput
                            questionNum={"3."}
                            placeHolder="Enter response here"
                            className="my-6 md:w-full"
                            question="What do you hope to get out of AI Camp?"
                            mutedText="(Word Max: 150 words)"
                            maxLength={150}
                        />
                        <QuestionInput
                            questionNum={"4."}
                            placeHolder="Enter response here"
                            className="my-6 md:w-full"
                            question="Describe a moment where you felt proud of yourself."
                            mutedText="(Word Max: 150 words)"
                            maxLength={150}
                        />
                        <div className="flex flex-row flex-nowrap mt-8">
                            <Button 
                                bgColor="gray"
                                txtColor="white" 
                                className="w-1/3 py-1 mr-6" 
                            >
                                Back
                            </Button>
                            <Button 
                                bgColor="green" 
                                txtColor="white" 
                                className="w-2/3 py-1" 
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ApplicationQuestions;
