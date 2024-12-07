'use client';

import { Button,Box, Stack, Typography, Container,TextField } from "@mui/material";
import { useState, useEffect } from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";
import questions from "@/app/problems";


export default function Home() {
  // const [code, setCode] = useState("console.log('Hello, World2!');");//後から編集する、DBから取得？
  const [code, setCode] = useState<string>("読み込み中...");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    // 初期問題を設定
    setCode(questions[0]);
  }, []);

  const handleClick = async (): Promise<void> => {
    try{
    //コメント付きコードを解析
    //戻り値はJSON形式でスコアとフィードバック
      const analyzedResult: ResultTypes = await analyzeComment(code);
    
    setScore(analyzedResult.score);
    setFeedback(analyzedResult.feedback);
    

    
    }catch(e){
      console.log(`採点中にエラーだよ${e}`);
    }
  }


  return (
    //フロントはMUIで作成。
    <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
    <Container>
    <Stack spacing={5}>
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
          コードにコメントつけるアプリ
        </Typography>
        
          {
          <TextField  
            multiline 
            rows ={5}             
            value={code}            
            onChange={(e) => setCode(e.target.value)}
            sx = {{width:"100%",alignSelf:"center"}}
          /> } 
        
          <Box sx={{height:"100%"}}>
          <Typography>
            スコア: {score}点
          </Typography>
          <Typography>
            フィードバック: {feedback}
          </Typography>
          </Box>                
          <Button variant="contained" sx = {{width:"fit-content",alignSelf:"left"}}onClick={handleClick}>採点</Button>
          
     </Stack>
     </Container>
    </Box>
  );
}

//フロント~
//変更

//・・rぐぁ