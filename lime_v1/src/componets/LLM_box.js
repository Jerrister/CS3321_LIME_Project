import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Input, Button } from 'antd';
import './LLMBox.css'; // 引入CSS文件

export const LLMBox = ({ referenceList, visible, handleCancel }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8848/analyze', { reference: referenceList, question: question });
            console.log("LLM ans:", response);
            setAnswer(response.data.result);
            console.log("LLM ans:", answer);
        } catch (error) {
            console.error('Error getting answer:', error);
        }
    };

    return (
        <Modal
            title="LIME Assistant"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="llm-box">
                <h3 className="llm-box-title">Input your query:</h3>
                <Input
                    className="llm-box-input"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="输入你的问题"
                />
                <Button className="llm-box-button" type="primary" onClick={handleQuestionSubmit}>
                    Submit
                </Button>
                <h3 className="llm-box-title-2">Reply:</h3>
                {
                answer && (
                    <div className="llm-box-answer">
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

// export default LiteratureAnalysis;
