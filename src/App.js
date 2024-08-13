import { useState } from 'react';
import './App.css';
import Box from './component/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandBackFist, faHandScissors, faHand} from '@fortawesome/free-regular-svg-icons'; // 아이콘을 가져옴


//1. 박스 2개(타이틀, 사진, 결과)
//2. 가위 바위 보 버튼이 있다.
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임/
//4. 컴퓨터는 랜덤하게 아이템 선책이 된다.
//5. 3 4의 결과를 가지고 누가 이겼는지 승패를 따진다. 
//6. 승패결과에 따라 테두리 색이 바뀐다.(이기면-초록, 지면-빨강, 비기면-검은색)

const choice = {
  rock: {
    name:"Rock",
    img:"data:image/jpeg;base64,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",
  },
  scissors:{
    name:"Scissors",
    img:"data:image/jpeg;base64,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",
  },
  paper: {
    name:"Paper",
    img:"data:image/jpeg;base64,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",
  },
};

function App() {
  // 아이템 선택
  const [userSelect,setUserSelect] = useState(null)
  const [computerSelect,setComputerSelect] = useState(null)
  const [result,setResult] = useState("")

  // 유저 아이템 선택 
  const play = (userChoice) => {
    // 사용자, 컴퓨터 선택 기능 구현
    setUserSelect(choice[userChoice]); 
    // console.log("선택됨.",userChoice;);
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice);
    // judgement(choice[userChoice], computerChoice)
    setResult(judgement(choice[userChoice], computerChoice));
  }

  // 사용자 승리 판별
  const judgement = (user, computer) => {
    console.log("user",user, "computer",computer);

    // 1. user == computer tie(비김)
    // 2. user == “rock”, computer == “scissors” user 이김
    // 3. user == “rock”, computer == “paper” user 졌음
    // 4. user == “scissors”, computer == “paper” user 이김
    // 5. user ==  “scissors”,  computer == “rock” user 졌음
    // 6. user == “paper”, computer “rock” user 이김
    // 7. user == “paper”, computer “scissors” user 졌음

    if(user.name === computer.name) {
      return "Tie"
    }else if(user.name === "Rock") 
      return computer.name === "Scissors" ? "Win" : "Lose";
    else if(user.name === "Scissors")
       return computer.name === "Paper" ? "Win" : "Lose";
    else if(user.name === "Paper") 
      return computer.name === "Rock" ? "Win" : "Lose";
  };

  // 컴퓨터 아이템 선택 
  const randomChoice = () => {
    let itemArray = Object.keys(choice);//객체에 키값만 뽑아서 어레이로 만들어주는 함수
    console.log("item array",itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value",randomItem);
    let final = itemArray[randomItem];
    console.log("final",final);
    return choice[final];
  } 

  return (
    <div className='container'>
      <h1 className='main'>가위 바위 보 게임</h1>
      <div className='main'>
        <Box title = "You" item={userSelect} result={result}/>
        <Box title = "Computer" item={computerSelect} result={result}/>
      </div>
      <div className='main'>
        <button onClick={() => play("rock")}><FontAwesomeIcon icon={faHandBackFist} className="icon"/></button>
        <button onClick={() => play("scissors")}><FontAwesomeIcon icon={faHandScissors} className="icon"/></button>
        <button onClick={() => play("paper")}><FontAwesomeIcon icon={faHand} className="icon"/></button>
      </div>
    </div>
  );
}

export default App;
