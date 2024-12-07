import { NextResponse } from "next/server";
import { spawn } from "child_process";



export async function GET() {
  const result = await callPythonScript({ action: "get_comments" });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await callPythonScript({
    action: "insert_comment",
    username: body.username,
    comment: body.comment,
  });
  return NextResponse.json(result);
}

async function callPythonScript(input: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["python/sqlite_handler.py"]);
    pythonProcess.stdin.write(JSON.stringify(input));
    pythonProcess.stdin.end();

    let output = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", () => {
        try {
          console.log("Python Output:", output);  // 出力内容を確認
          resolve(JSON.parse(output));
        } catch (error) {
          console.error("Error parsing JSON:", error);  // どのエラーか確認
          reject(error);
        }
      });
      
  });
}
