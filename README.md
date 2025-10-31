
# Flask Resume CMS (SQLite)

Admin manage all sections:
- Home (hero headline/subtitle)
- About (about text)
- Experience (CRUD)
- Projects (CRUD)
- Contact messages (view)
- Education (CRUD)
- Resume upload (PDF)

## Run
```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install flask
python app.py
```
Visit:
- Public site: http://127.0.0.1:5000/


Database: `instance/site.db`

> Demo guard only. For production, integrate Flask-Login and strong auth.
