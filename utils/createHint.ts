'use client';


export default async function createHint(codeWithComment: string): Promise<string|Error>{
    try {        
        //モデル名
        const model = "gpt-4o-mini-2024-07-18";
        //システムプロンプト
        const system = `
            あなたは熟練のプログラマーであり、教育者です。
            以下の{前提}{状況}{関係性}に基づいて、会話形式で出力をおこなってください。
            {前提}
            ユーザーが指定されたコードにコメントを追加し、それを採点するアプリを開発しています。
            コードと既存のコメントを参考に、ユーザーがより適切なコメントを書けるようヒントを提供してください。
            {状況}
            ユーザーのコメントは、彼らの理解度を反映している可能性があります。
            ユーザーはこの言語の構文に詳しくないため、コードの動作を完全には理解していないかもしれません。
            答えを直接提供するのではなく、ユーザーが考える余地を残すヒントを作成してください。
            {関係性}
            出力では、挨拶や前置きなしに、直接ヒントを提供してください。
            友達と喋るような言葉で簡潔にヒントを提供してください。
        `
        //入力されるコメント付きコード
        const prompt = codeWithComment;
        //スキーマ名
        const schemaName = "createHint";

        //app/api/openai/route.tsの中間APIの呼び出し
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                system:system,
                prompt: prompt,
                schemaName: schemaName,
                
            }),
        });        
        
        
        const hint = await response.json();
        
        console.log(hint);
        
        return hint;

    } catch (e) {
        console.log(e);
        return e as Error;
    }
}