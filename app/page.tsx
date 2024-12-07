'use client';

import { Button,Box, Stack, Typography, Container,TextField } from "@mui/material";
import { useState, useEffect} from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";
import questions from "@/app/problems";
import React from 'react';
import { connectDatabase } from "./api/db/route";

const HomePage = ({ data }) => {
  return (
    <div>
      <h1>Next.js SSR with SQLite</h1>
      <ul>
        {data.map((item) => (
          <li key={item.aiueo}>{item.aiueo}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const db = await connectDatabase();
  const data = await db.all('SELECT * FROM nihongo');

  return {
    props: { data },
  };
}

export default HomePage;

// export default function Home() {
//   const [code, setCode] = useState("console.log('Hello, World2!');");//後から編集する、DBから取得？

//   const [score, setScore] = useState<number | null>(null);
//   const [feedback, setFeedback] = useState<string>("");

  
  
//   useEffect(() => {
//     setCode(questions[0]);
//   }
//   , []);
  
//   const handleClick = async (): Promise<void> => {
//     try{
//     //コメント付きコードを解析
//     //戻り値はJSON形式でスコアとフィードバック
//       const analyzedResult: ResultTypes = await analyzeComment(code);
    
//       setScore(analyzedResult.score);
//       setFeedback(analyzedResult.feedback);
    
//       if (analyzedResult.score !== null) {
//         console.log(`Score:`, analyzedResult.score);
//         await saveResult(code, analyzedResult.score, analyzedResult.feedback);
//       } else {
//         console.error('Score is null, cannot save result');
//       }

//     }catch(e){
//       console.log(`採点中にエラーだよ${e}`);
//     }
//   }

//   const saveResult = async (code: string, score: number, feedback: string) => {
//     try {
//       const response = await fetch('/api/saveResult', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code, score, feedback }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save result');
//       }

//       const data = await response.json();
//       console.log('Result saved with ID:', data.id);
//     } catch (error) {
//       console.error('Error saving result:', error);
//     }
//   };
  
//   const fetchResults = async () => {
//     try {
//       const response = await fetch('/api/getResults', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch results');
//       }
  
//       const data = await response.json();
//       setCode(data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching results:', error);
//       return [];
//     }
//   };


//   return (
//     //フロントはMUIで作成。
//     <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
//     <Container>
//     <Stack spacing={5}>
//         <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
//           コードにコメントつけるアプリ
//         </Typography>
        
//           {
//           <TextField  
//             multiline 
//             rows ={5}             
//             value={code}            
//             onChange={(e) => setCode(e.target.value)}
//             sx = {{width:"100%",alignSelf:"center"}}
//           /> } 
        
//           <Box sx={{height:"100%"}}>
//           <Typography>
//             スコア: {score}点
//           </Typography>
//           <Typography>
//             フィードバック: {feedback}
//           </Typography>
//           </Box>                
//           <Button variant="contained" sx = {{width:"fit-content",alignSelf:"left"}}onClick={handleClick}>採点</Button>
          
//      </Stack>
//      </Container>
//     </Box>
    
//   );
// }

// //フロント~
// //変更

// //・・rぐぁ