import React, {useRef, useState} from "react";
import {Form} from "react-router-dom";

const Rag = () => {
    const [ question, setQuestion ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const [ ragAnswer, setRagAnswer ] = useState('');
    const [ file, setFile ] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmitChat = async () => {
        console.log("handleSubmitChat")
        try{
            const response = await fetch("http://localhost:8080/api/chat/simple", {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({question})
            })
            if(!response.ok){
                throw new Error("Http ERROR Status : " + response.status)
            }

            const data = await response.text();
            setAnswer(data);
        }catch (e){
            console.log("ERROR : " + e);
            setAnswer('질문 처리중 오류 발생')
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if(!file){
            alert("파일이 없습니다.");
        }
        const formData = new FormData();
        formData.append('file', file)
        try {
            const response = await fetch("http://localhost:8080/api/documents/upload",{
                method:'post',
                body:formData
            })
            if(!response.ok){
                console.log("File Upload Error");
                alert("파일 업로드 중 오류 발생");
            }
        }catch (e){
            console.log("ERROR : " + e)
            setAnswer("파일 업로드 중 오류 발생");
        }
    }

    const params = new URLSearchParams();
    params.append("question", question);

    const handleRagChat = async () => {
        console.log("handleRagChat");
        try {
            console.log("???  "+ params)
            const response = await fetch("http://localhost:8080/api/documents/rag",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            })
            if(!response.ok){
                throw new Error("RAG CHAT HTTP ERROR : " + response.status)
            }

            const data = await response.text();
            setRagAnswer(data);
        }catch (e){
            console.log("RAG RESPONSE ERROR " + e);
            setRagAnswer("RAG 질문 처리중 오류 발생");
        }
    }

    return (
        <div className={"ragContainer"}>
            <h3>AI Chatbot Workspace</h3>
            <hr/>

            <h2>PDF 업로드 (RAG 학습)</h2>
            <input type="file" onChange={handleFileChange} ref={fileInputRef}/>
            <button onClick={handleUpload}>업로드 및 임베딩</button>
            <hr/>

            <h2>AI에게 질문하기</h2>
            <input
                type="text"
                value={question}
                onChange={ (e) => { setQuestion(e.target.value) }}
                placeholder={"질문을 입력해주세요"}
                className={"ai-question"}
            />
            <button onClick={handleSubmitChat}>기본 질문 (RAG 없음)</button>
            <button onClick={handleRagChat}>기본 질문 (PDF 기반)</button>

            {answer &&
                (<div className={"answerContainer"}>
                    <h3>기본 답변 : </h3>
                    <p>{answer}</p>
                </div>)
            }
            {ragAnswer &&
                (<div className={"answerContainer"}>
                    <h3>RAG 답변 : </h3>
                    <p>{ragAnswer}</p>
                </div>)
            }
        </div>
    )
}

export default Rag