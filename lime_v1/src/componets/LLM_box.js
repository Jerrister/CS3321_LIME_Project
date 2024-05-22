import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

export const  LLMBox = ({  referenceList, visible, handleCancel }) => {
    const [analysis, setAnalysis] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');


    const handleQuestionSubmit = async () => {
        try {
            
            const response = await  axios.post('http://127.0.0.1:7688/analyze', {reference: referenceList ,  question: question });
            console.log("LLM ans:" ,response);
            setAnswer(response.data.result);
            console.log("LLM ans:" ,answer);
        } catch (error) {
            console.error('Error getting answer:', error);
        }
        
    };

    return (
  
        <Modal
        title="LIME assistent: "
        visible={visible}
        onCancel={handleCancel}
        footer={null}>

            <div>
                <h3> LIME assistant:</h3>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="输入你的问题"
                />
                <button onClick={handleQuestionSubmit}>Submit</button>
                {answer && (
                    <div>
                        <h4>LIME assistant: </h4>
                        <p>{answer}</p>
                    </div>
                )}
            </div>

               </Modal>

    );
};

// export default LiteratureAnalysis;