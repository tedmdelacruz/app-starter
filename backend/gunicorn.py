import os

workers = 4
bind = "0.0.0.0:80"
accesslog = "-"
loglevel = os.environ.get("LOG_LEVEL", "info")
timeout = 300
keepalive = 150
