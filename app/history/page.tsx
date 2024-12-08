'use client';

import { Box, Grid, Typography, Card, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { historyTypes } from "@/types";
import { renderRadarChart } from "../Chart";
import { loadFromLocalStorage } from "@/utils/useLocalStrage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// 必要なスタイルをインポート
import * as PrismStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";

export default function History() {
  const [pre, setPre] = useState<historyTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedData = loadFromLocalStorage();
    setPre(storedData);
  }, []);
  return (
    <Box sx={{ width: "100%"}}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            variant="text" 
            component="h1" 
            sx={{ textAlign: 'left' }}
            onClick={() => router.push('/')}
            >
            code-comment-add
          </Button>
          <Button
            variant="text"
            component="h1"
            sx={{ textAlign: 'right' }}
            onClick={() => router.push('/history')} // 履歴ページに遷移
          >
            履歴
          </Button>
        </Box>
      <Typography variant="h4" gutterBottom>
        履歴
      </Typography>
      {[...pre].reverse().map((his)=>(
          <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "100%", margin:"20px"}} key={his.id}>
            <SyntaxHighlighter
                language="javascript"
                style={PrismStyles["coldarkCold"]}
              >
                {his.code}
              </SyntaxHighlighter>
            <Box sx={{ display:"flex" }}>
                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                  {/* レーダーチャート */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      {renderRadarChart(his.scores)}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%', // 必要に応じて調整
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      フィードバック
                    </Typography>
                    <Card sx={{ padding: 2, marginBottom: 2 }}>
                      <Typography variant="h6">コードの読解に関するフィードバック</Typography>
                      <Typography>{his.feedbacks.codeFeedback}</Typography>
                    </Card>
                    <Card sx={{ padding: 2 }}>
                      <Typography variant="h6">コメントの適切さに関するフィードバック</Typography>
                      <Typography>{his.feedbacks.commentFeedback}</Typography>
                    </Card>
                  </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ))}
      </Container>
    </Box>
  );
}
