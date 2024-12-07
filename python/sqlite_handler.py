import sqlite3
import json
import sys

DB_PATH = "database.db"

def check_and_initialize():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 初期化状態を確認または初期化
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS initialization_status (
            initialized INTEGER DEFAULT 0
        )
    """)
    conn.commit()

    cursor.execute("SELECT initialized FROM initialization_status")
    result = cursor.fetchone()

    if not result or result[0] == 0:
        # comments テーブルを作成
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                comment TEXT NOT NULL
            )
        """)

        # 初期データを挿入
        initial_data = [
            ("Alice", "This is a great app!"),
            ("Bob", "I love using it!"),
            ("Charlie", "Amazing features and smooth performance.")
        ]
        cursor.executemany("INSERT INTO comments (username, comment) VALUES (?, ?)", initial_data)

        # 初期化フラグを更新
        cursor.execute("INSERT INTO initialization_status (initialized) VALUES (1)")
        conn.commit()
        conn.close()
        return {"status": "initialized"}
    else:
        conn.close()
        return {"status": "already_initialized"}

def get_comments():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM comments")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "username": row[1], "comment": row[2]} for row in rows]

def main():
    input_data = json.loads(sys.stdin.read())
    action = input_data.get("action")

    if action == "get_comments":
        # 初期化チェックとコメントの取得
        init_status = check_and_initialize()
        comments = get_comments()
        print(json.dumps({"init_status": init_status, "comments": comments}))
    else:
        print(json.dumps({"error": "Invalid action"}))

if __name__ == "__main__":
    main()
