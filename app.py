
from flask import (
    Flask, render_template, request, jsonify, send_from_directory, url_for,
    redirect, flash, session
)
import os, sqlite3, datetime, secrets

ALLOWED_RESUME_EXTS = {'.pdf'}

def create_app():
        # Use /tmp on Vercel serverless (writable); normal instance locally
    serverless = os.environ.get("SERVERLESS") == "1"
    instance_relative = False if serverless else True
    instance_path = "/tmp/flask_instance" if serverless else None

    app = Flask(
        __name__,
        instance_relative_config=instance_relative,
        instance_path=instance_path
    )
    os.makedirs(app.instance_path, exist_ok=True)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', secrets.token_hex(16))
    app.config['DATABASE'] = os.path.join(app.instance_path, 'site.db')
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'assets')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.config['ADMIN_PASSWORD'] = os.environ.get('ADMIN_PASSWORD', 'admin')  # simple demo guard

    # ---------- DB helpers ----------
    def get_db():
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.row_factory = sqlite3.Row
        return conn

    def init_db():
        conn = get_db()
        c = conn.cursor()

        # Key-value settings (for home/about and resume filename, socials, etc.)
        c.execute('''
        CREATE TABLE IF NOT EXISTS settings(
            key TEXT PRIMARY KEY,
            value TEXT
        )
        ''')

        # Education
        c.execute('''
        CREATE TABLE IF NOT EXISTS education(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            degree TEXT NOT NULL,
            institution TEXT NOT NULL,
            year TEXT NOT NULL,
            cgpa TEXT
        )
        ''')

        # Experience
        c.execute('''
        CREATE TABLE IF NOT EXISTS experiences(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            company TEXT NOT NULL,
            start TEXT,
            end TEXT,
            description TEXT
        )
        ''')

        # Projects
        c.execute('''
        CREATE TABLE IF NOT EXISTS projects(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            tags TEXT,    -- comma-separated
            link TEXT
        )
        ''')

        # Contact Messages
        c.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        ''')

        # Seed defaults if not present
        def ensure_setting(k, v):
            c.execute("INSERT OR IGNORE INTO settings(key, value) VALUES (?, ?)", (k, v))

        ensure_setting('site_title', 'Bhuvaneshwaran B | AI Developer')
        ensure_setting('hero_headline', 'Bhuvaneshwaran B')
        ensure_setting('hero_subtitle', 'Innovative <span class="highlight">AI Developer</span> with expertise in Machine Learning, Deep Learning, NLP, and GenAI')
        ensure_setting('about_text', 'Innovative and detail-oriented AI Developer with hands-on experience in building, training, and deploying machine learning models.')
        ensure_setting('resume_filename', 'Bhuvaneshwaran_Resume.pdf')
        ensure_setting('location', 'Chrompet, Chennai 600044')
        ensure_setting('phone', '+91 8098492074')
        ensure_setting('email', 'bhuvaneshboominathan@gmail.com')
        ensure_setting('github', 'https://github.com/BBHUVANESHWARAN')
        ensure_setting('linkedin', 'https://linkedin.com/in/bhuvaneshwaran-b-45575a216')
        ensure_setting('twitter', '')

        conn.commit()

        # Seed sample edu/exp/projects if empty
        if c.execute("SELECT COUNT(*) AS n FROM education").fetchone()['n'] == 0:
            c.executemany(
                "INSERT INTO education(degree,institution,year,cgpa) VALUES (?,?,?,?)",
                [
                    ("Master of Computer Application", "Ayya Nadar Janaki Ammal College", "2023", "CGPA 7.24/10"),
                    ("B.Sc Computer Science", "Ayya Nadar Janaki Ammal College", "2021", "CGPA 7.15/10")
                ]
            )
        if c.execute("SELECT COUNT(*) AS n FROM experiences").fetchone()['n'] == 0:
            c.executemany(
                "INSERT INTO experiences(role,company,start,end,description) VALUES (?,?,?,?,?)",
                [
                    ("AI Developer", "Barria Systems Pvt Ltd", "", "", "isADE efforts in ML, DL, NLP, and GenAI; improved model accuracy with hyperparameter tuning."),
                    ("Data Science Developer", "RETECH SOLUTIONS PVT LTD", "", "", "Built ML & DL models; designed AI pipelines for real-world problems."),
                    ("Data Science Intern", "CRACKERS CITY SOLUTIONS PVT LTD", "Jan 2023", "Mar 2024", "Contributed to AI projects; foundations in DL and NLP.")
                ]
            )
        if c.execute("SELECT COUNT(*) AS n FROM projects").fetchone()['n'] == 0:
            c.executemany(
                "INSERT INTO projects(title,description,tags,link) VALUES (?,?,?,?)",
                [
                    ("RAG Chat APP", "RAG using vector DB (Weaviate) and LLM.", "LLM,RAG,Weaviate", ""),
                    ("Custom Bi-Directional LSTM with LLM", "BiLSTM for multiclass text classification with LLM techniques.", "LSTM,LLM,NLP", ""),
                    ("Real-Time Social Media Sentiment Analysis", "Real-time trends with LLM-backed sentiment analysis.", "Sentiment,LLM,MongoDB", "")
                ]
            )
        conn.commit()
        conn.close()

    # Initialize DB right away when app is created
    with app.app_context():
        init_db()

    # ------- auth (very simple) -------
    def admin_required(f):
        from functools import wraps
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not session.get('is_admin'):
                return redirect(url_for('admin_login', next=request.path))
            return f(*args, **kwargs)
        return wrapper

    @app.route('/admin/login', methods=['GET','POST'])
    def admin_login():
        if request.method == 'POST':
            pw = request.form.get('password','')
            if pw == app.config['ADMIN_PASSWORD']:
                session['is_admin'] = True
                nxt = request.args.get('next') or url_for('admin_dashboard')
                return redirect(nxt)
            flash('Invalid password', 'error')
        return render_template('admin/login.html')

    @app.route('/admin/logout')
    def admin_logout():
        session.clear()
        return redirect(url_for('index'))

    # ---------- public pages ----------
    @app.route('/')
    def index():
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.row_factory = sqlite3.Row
        settings = {row['key']: row['value'] for row in conn.execute("SELECT key,value FROM settings")}
        edu = conn.execute("SELECT * FROM education ORDER BY year DESC").fetchall()
        exps = conn.execute("SELECT * FROM experiences ORDER BY id DESC").fetchall()
        projs = conn.execute("SELECT * FROM projects ORDER BY id DESC").fetchall()
        conn.close()
        return render_template('index.html',
            settings=settings, education=edu, experiences=exps, projects=projs)

    @app.route('/contact', methods=['POST'])
    def contact():
        data = request.get_json() or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        subject = (data.get("subject") or "").strip()
        message = (data.get("message") or "").strip()
        if not (name and email and subject and message):
            return jsonify({"ok": False, "error": "All fields are required."}), 400
        ts = datetime.datetime.utcnow().isoformat() + "Z"
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.execute(
            "INSERT INTO contact_messages(name,email,subject,message,created_at) VALUES (?,?,?,?,?)",
            (name, email, subject, message, ts)
        )
        conn.commit(); conn.close()
        return jsonify({"ok": True, "msg": "Thanks! Your message was saved."})

    @app.route('/download-resume')
    def download_resume():
        conn = sqlite3.connect(app.config['DATABASE'])
        resume = conn.execute("SELECT value FROM settings WHERE key='resume_filename'").fetchone()
        conn.close()
        filename = (resume['value'] if resume else 'Bhuvaneshwaran_Resume.pdf') or 'Bhuvaneshwaran_Resume.pdf'
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(path):
            return jsonify({"ok": False, "error": "Resume file not found on server."}), 404
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

    # ---------- admin dashboard ----------
    @app.route('/admin')
    @admin_required
    def admin_dashboard():
        return render_template('admin/dashboard.html')

    # ----- admin: Home (hero) -----
    @app.route('/admin/home', methods=['GET','POST'])
    @admin_required
    def admin_home():
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.row_factory = sqlite3.Row
        if request.method == 'POST':
            headline = request.form.get('hero_headline','')
            subtitle = request.form.get('hero_subtitle','')
            conn.execute("INSERT OR REPLACE INTO settings(key,value) VALUES('hero_headline',?)", (headline,))
            conn.execute("INSERT OR REPLACE INTO settings(key,value) VALUES('hero_subtitle',?)", (subtitle,))
            conn.commit()
            flash('Home content updated', 'ok')
        settings = {row['key']: row['value'] for row in conn.execute("SELECT key,value FROM settings WHERE key IN ('hero_headline','hero_subtitle','site_title')")}
        conn.close()
        return render_template('admin/home.html', settings=settings)

    # ----- admin: About -----
    @app.route('/admin/about', methods=['GET','POST'])
    @admin_required
    def admin_about():
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.row_factory = sqlite3.Row
        if request.method == 'POST':
            about_text = request.form.get('about_text','')
            conn.execute("INSERT OR REPLACE INTO settings(key,value) VALUES('about_text',?)", (about_text,))
            conn.commit()
            flash('About updated', 'ok')
        settings = {row['key']: row['value'] for row in conn.execute("SELECT key,value FROM settings WHERE key IN ('about_text')")}
        conn.close()
        return render_template('admin/about.html', settings=settings)

    # ----- admin: Experience CRUD -----
    @app.route('/admin/experience', methods=['GET','POST'])
    @admin_required
    def admin_experience():
        conn = sqlite3.connect(app.config['DATABASE']); conn.row_factory = sqlite3.Row
        if request.method == 'POST':
            role = request.form.get('role','').strip()
            company = request.form.get('company','').strip()
            start = request.form.get('start','').strip()
            end = request.form.get('end','').strip()
            desc = request.form.get('description','').strip()
            if role and company:
                conn.execute("INSERT INTO experiences(role,company,start,end,description) VALUES(?,?,?,?,?)",
                    (role, company, start, end, desc))
                conn.commit()
                flash('Experience added','ok')
        exps = conn.execute("SELECT * FROM experiences ORDER BY id DESC").fetchall()
        conn.close()
        return render_template('admin/experience.html', experiences=exps)

    @app.route('/admin/experience/<int:row_id>/delete', methods=['POST'])
    @admin_required
    def admin_experience_delete(row_id):
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.execute("DELETE FROM experiences WHERE id=?", (row_id,))
        conn.commit(); conn.close()
        flash('Experience deleted','ok')
        return redirect(url_for('admin_experience'))

    # ----- admin: Projects CRUD -----
    @app.route('/admin/projects', methods=['GET','POST'])
    @admin_required
    def admin_projects():
        conn = sqlite3.connect(app.config['DATABASE']); conn.row_factory = sqlite3.Row
        if request.method == 'POST':
            title = request.form.get('title','').strip()
            description = request.form.get('description','').strip()
            tags = request.form.get('tags','').strip()
            link = request.form.get('link','').strip()
            if title:
                conn.execute("INSERT INTO projects(title,description,tags,link) VALUES(?,?,?,?)",
                    (title, description, tags, link))
                conn.commit()
                flash('Project added','ok')
        projs = conn.execute("SELECT * FROM projects ORDER BY id DESC").fetchall()
        conn.close()
        return render_template('admin/projects.html', projects=projs)

    @app.route('/admin/projects/<int:row_id>/delete', methods=['POST'])
    @admin_required
    def admin_project_delete(row_id):
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.execute("DELETE FROM projects WHERE id=?", (row_id,))
        conn.commit(); conn.close()
        flash('Project deleted','ok')
        return redirect(url_for('admin_projects'))

    # ----- admin: Contact messages view -----
    @app.route('/admin/contact')
    @admin_required
    def admin_contact():
        conn = sqlite3.connect(app.config['DATABASE']); conn.row_factory = sqlite3.Row
        msgs = conn.execute("SELECT * FROM contact_messages ORDER BY id DESC").fetchall()
        conn.close()
        return render_template('admin/messages.html', messages=msgs)

    # ----- admin: Education CRUD (reuse old) -----
    @app.route('/admin/education', methods=['GET','POST'])
    @admin_required
    def admin_education():
        conn = sqlite3.connect(app.config['DATABASE']); conn.row_factory = sqlite3.Row
        if request.method == 'POST':
            degree = request.form.get('degree','').strip()
            institution = request.form.get('institution','').strip()
            year = request.form.get('year','').strip()
            cgpa = request.form.get('cgpa','').strip()
            if degree and institution and year:
                conn.execute("INSERT INTO education(degree,institution,year,cgpa) VALUES (?,?,?,?)",
                             (degree, institution, year, cgpa or None))
                conn.commit()
                flash('Education added','ok')
        edu = conn.execute("SELECT * FROM education ORDER BY year DESC").fetchall()
        conn.close()
        return render_template('admin/education.html', education=edu)

    @app.route('/admin/education/<int:row_id>/delete', methods=['POST'])
    @admin_required
    def admin_education_delete(row_id):
        conn = sqlite3.connect(app.config['DATABASE'])
        conn.execute("DELETE FROM education WHERE id=?", (row_id,))
        conn.commit(); conn.close()
        flash('Education deleted','ok')
        return redirect(url_for('admin_education'))

    # ----- admin: Resume upload -----
    @app.route('/admin/resume', methods=['GET','POST'])
    @admin_required
    def admin_resume():
        msg = None
        if request.method == 'POST':
            f = request.files.get('resume')
            if not f or f.filename.strip() == '':
                flash('No file uploaded','error')
            else:
                ext = os.path.splitext(f.filename)[1].lower()
                if ext not in ALLOWED_RESUME_EXTS:
                    flash('Only PDF allowed','error')
                else:
                    # Save with a stable name or keep original
                    save_as = 'Bhuvaneshwaran_Resume.pdf'
                    path = os.path.join(app.config['UPLOAD_FOLDER'], save_as)
                    f.save(path)
                    # Update setting
                    conn = sqlite3.connect(app.config['DATABASE'])
                    conn.execute("INSERT OR REPLACE INTO settings(key,value) VALUES('resume_filename',?)", (save_as,))
                    conn.commit(); conn.close()
                    flash('Resume uploaded','ok')
        return render_template('admin/resume.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
