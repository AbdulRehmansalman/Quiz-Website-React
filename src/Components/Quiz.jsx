// import React, { useEffect, useState } from 'react';
// import quiz from './../data/data';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useTimer } from 'react-timer-hook';

// const Quiz = () => {
//   const [activeQuestion, setActiveQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [result, setResult] = useState({
//     score: 0,
//     correctAnswer: 0,
//     wrongAnswer: 0,
//   });

//   const { questions } = quiz;
//   const { question, choices, correctAnswer } = questions[activeQuestion];
//   // TIME DATA
//   const timerDuration = 5; // 1 minutes in seconds
//   const expiryTimestamp = new Date();
//   expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timerDuration);

//   const MoveNextQuestion = () => {
//     console.log('Data Coming After Timer Expire');

//     if (activeQuestion < questions.length - 1) {
//       setActiveQuestion((prev) => prev + 1);
//       setSelectedAnswer(null);
//       const newExpiryTimestamp = new Date();
//       newExpiryTimestamp.setSeconds(
//         newExpiryTimestamp.getSeconds() + timerDuration
//       );
//       reset(newExpiryTimestamp);
//     } else {
//       setShowResults(true);
//     }
//   };
//   const { seconds, minutes, isRunning, reset } = useTimer({
//     expiryTimestamp,
//     onExpired: MoveNextQuestion,
//   });

//   const onAnswerSelected = (answer) => {
//     setSelectedAnswer(answer);
//   };

//   const handleNextClick = () => {
//     if (selectedAnswer) {
//       console.log('Working Next Func');
//       if (seconds === 0 && minutes === 0) {
//         MoveNextQuestion();
//       } else {
//         setResult((prev) => ({
//           ...prev,
//           score: selectedAnswer === correctAnswer ? prev.score + 5 : prev.score,
//           correctAnswer:
//             selectedAnswer === correctAnswer
//               ? prev.correctAnswer + 1
//               : prev.correctAnswer,
//           wrongAnswer:
//             selectedAnswer !== correctAnswer
//               ? prev.wrongAnswer + 1
//               : prev.wrongAnswer,
//         }));
//         MoveNextQuestion();
//       }
//     } else {
//       toast.warn('🦄 Please select an option before proceeding!', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'dark',
//       });
//     }
//   };

//   return (
//     <div className="w-fixed h-auto border border-spacing-3 mt-3 mb-5 rounded-2xl">
//       {!showResults ? (
//         <div className="flex justify-center items-center h-auto ">
//           <div className="w-3/5 h-screen bg-slate-400">
//             <div className="flex flex-2 justify-start">
//               <h3 className="text-3xl bg-slate-200 text-center w-full p-2 m-2">
//                 Questions
//               </h3>
//             </div>
//             <div className="flex flex-wrap p-2">
//               <div className="left flex-1 ">
//                 <h3 className="text-2xl mt-4 ">
//                   ( Q # {activeQuestion + 1} / {questions.length} )
//                 </h3>
//                 <h2 className="mt-4 p-1 text-2xl">{question}</h2>
//               </div>
//               <div className="right flex w-2/5">
//                 <ul className="p-2 m-1 w-max">
//                   {choices.map((answer) => (
//                     <li
//                       onClick={() => onAnswerSelected(answer)}
//                       key={answer}
//                       className={`border border-spacing-6 text-2xl mt-2 w-9/5 rounded-2xl text-center p-3 ${
//                         selectedAnswer === answer
//                           ? 'border-amber-400 bg-blue-400 text-blue flex flex-wrap'
//                           : 'border-amber-800 hover:bg-zinc-600'
//                       }`}
//                     >
//                       {answer}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="border-t-neutral-50 flex mt-5 w-full">
//               <button
//                 onClick={handleNextClick}
//                 className="bg-blue-300 text-center text-2xl border-spacing-5 p-4 rounded-sm solid hover:bg-black text-white w-full"
//               >
//                 Next
//               </button>
//             </div>
//             <div style={{ textAlign: 'center', marginTop: '20px' }}>
//               <h1>Timer</h1>
//               <div style={{ fontSize: '100px' }}>
//                 <span>{minutes}</span>:<span>{seconds}</span>
//               </div>
//               <p>{isRunning ? 'Running' : 'Not running'}</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="result">
//           <h2 className="text-center">Results</h2>
//           <p>
//             Total Questions:
//             <span className="font-serif text-3xl bg-slate-500">
//               {questions.length}
//             </span>
//           </p>
//           <p>
//             Correct Answers:<span> {result.correctAnswer}</span>
//           </p>
//           <p>
//             Wrong Answers:<span> {result.wrongAnswer}</span>
//           </p>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Quiz;
import React, { useEffect, useState } from 'react';
import quiz from './../data/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTimer } from 'react-timer-hook';

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const timerDuration = 10;

  const getNewExpiryTimestamp = () => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timerDuration);
    return expiryTimestamp;
  };

  const MoveNextQuestion = () => {
    if (selectedAnswer !== null) {
      calculateResultParam();
    }
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: getNewExpiryTimestamp(),
    onExpire: MoveNextQuestion,
  });

  useEffect(() => {
    restart(getNewExpiryTimestamp());
  }, [activeQuestion, restart]);

  // Set the Result Parameters in Function
  const calculateResultParam = () => {
    setResult((prev) => ({
      ...prev,
      score: selectedAnswer === correctAnswer ? prev.score + 5 : prev.score,
      correctAnswer:
        selectedAnswer === correctAnswer
          ? prev.correctAnswer + 1
          : prev.correctAnswer,
      wrongAnswer:
        selectedAnswer !== correctAnswer
          ? prev.wrongAnswer + 1
          : prev.wrongAnswer,
    }));
  };

  const handleNextClick = () => {
    if (selectedAnswer) {
      calculateResultParam();
      MoveNextQuestion();
    } else {
      toast.warn('🦄 Please select an option before proceeding!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="border border-spacing-3 mb-5 w-full rounded-sm bg-gradient-to-r from-purple-800 to-yellow-300 text-green-400 font-sans font-semibold">
      <h1 className="text-center text-2xl font-extrabold text-gray-700">
        Quiz App
      </h1>
      {!showResults ? (
        <div className="flex h-4/6 w-full rounded-full justify-center ">
          <div className="w-4/5 h-2/5 from-inherit rounded-2xl">
            <div className="flex flex-2 justify-start">
              <h3 className="text-3xl  text-center w-full p-2 m-2 bg-gradient-to-r from-purple-100 to-yellow-300 rounded-lg">
                Questions
              </h3>
            </div>
            <div className="flex flex-wrap p-2">
              <div className="left flex-1">
                <h3 className="text-2xl mt-4 bg-neutral-200 rounded-xl p-2 border-lime-300">
                  ( Q # {activeQuestion + 1} / {questions.length} )
                </h3>
                <h2 className="mt-4 p-1 text-2xl">{question}</h2>
              </div>
              <div className="right flex w-2/5">
                <ul className="p-2 m-1 w-max">
                  {choices.map((answer) => (
                    <li
                      onClick={() => setSelectedAnswer(answer)}
                      key={answer}
                      className={`border border-spacing-6 text-2xl mt-2 w-9/5 rounded-2xl text-center p-3 ${
                        selectedAnswer === answer
                          ? 'border-amber-400 bg-blue-400 text-blue flex flex-wrap'
                          : 'border-amber-800 hover:bg-zinc-600'
                      }`}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t-neutral-50 flex mt-5 w-full">
              <button
                onClick={handleNextClick}
                className="bg-blue-300 text-center text-2xl border-spacing-5 p-4 rounded-sm solid hover:bg-black text-white w-full"
              >
                Next
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '100px' }}>
                <span>{minutes}</span>:<span>{seconds}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="result h-full">
          <h2 className="text-center">Results</h2>
          <p>
            Total Questions:
            <span className="font-serif text-3xl bg-slate-500">
              {questions.length}
            </span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswer}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswer}</span>
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;
