"use client";

import { useEffect, useState } from "react";

const CommentsPage = () => {
  const [comments, setComments] = useState<any[]>([]); // コメントのデータを格納する状態
 
  // コメントを取得する関数
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/db", {
        method: "GET", // GETリクエストを送る
      });
      const data = await response.json();
      setComments(data); // 取得したコメントを状態に保存
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(); // コンポーネントがマウントされた時にコメントを取得
  }, []); // 空の依存配列で一度だけ実行されるようにする

  return (
    <div>
      <h1>Comments</h1>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsPage;
