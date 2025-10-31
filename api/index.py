import os, traceback
os.environ.setdefault("SERVERLESS", "1")
try:
    from app import create_app
    app = create_app()
except Exception:
    # Print the stack trace to Vercel logs to debug 500s
    print("❌ Failed to create Flask app:\n" + traceback.format_exc())
    # Return a tiny WSGI app that shows a simple error to the browser
    def app(environ, start_response):
        start_response("500 Internal Server Error", [("Content-Type","text/plain")])
        return [b"Flask app failed to start. Check Vercel function logs."]
