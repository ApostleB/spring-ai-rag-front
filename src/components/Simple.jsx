import React, {useState} from "react";

const Simple = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSimpleChat = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/chat/simple", {
                method: 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({question})
            });
            if(!response.ok){
                throw new Error(`HTTP error! status : ${response.status}`);
            }
            const data = await response.text();
            setAnswer(data);
        }catch (e) {
            console.error("Fetching 에러 : ", e);
            setAnswer('질문 처리중 오류가 발생했습니다.');
        }
    }

    return (
        <div>
            <h1>Rag 없는 기본 Open AI 호출</h1>
            <input
                type="text"
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                placeholder={'질문을 입력해주세요.'} />

            <button onClick={handleSimpleChat}>기본 질문하기</button>
            {answer && <div><strong>답변:</strong><p>{answer}</p></div>}
        </div>
    )
}

export default Simple