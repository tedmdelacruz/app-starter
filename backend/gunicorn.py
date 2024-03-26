import os

workers = 1
bind = "0.0.0.0:8080"
accesslog = "-"
loglevel = os.environ.get("LOG_LEVEL", "info")
timeout = 300
keepalive = 150
