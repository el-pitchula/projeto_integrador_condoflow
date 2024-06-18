import sqlite3
from flask import Flask, request, jsonify # type: ignore
import pandas as pd # type: ignore

app = Flask(__name__)

# Conexão com o banco de dados
conn = sqlite3.connect('data.db')
c = conn.cursor()

# Criação da tabela no banco de dados
c.execute('''CREATE TABLE IF NOT EXISTS data
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              value REAL NOT NULL)''')
conn.commit()

@app.route('/api/data', methods=['GET'])
def get_data():
    c.execute('SELECT * FROM data')
    data = c.fetchall()
    return jsonify([{'id': row[0], 'name': row[1], 'value': row[2]} for row in data])

@app.route('/api/data', methods=['POST'])
def create_data():
    data = request.get_json()
    c.execute('INSERT INTO data (name, value) VALUES (?,?)', (data['name'], data['value']))
    conn.commit()
    return jsonify({'message': 'Dados criados com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)