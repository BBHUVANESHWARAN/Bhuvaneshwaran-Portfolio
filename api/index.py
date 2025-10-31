import os
os.environ.setdefault("SERVERLESS", "1")  # tell app to use /tmp etc.
from app import create_app
app = create_app()
