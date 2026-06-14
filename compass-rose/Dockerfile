# GM Louis web app (Compass Rose) — containerized for Azure Container Apps.
# Reuses the proven WSGI entry api/index.py (it wires sys.path for web/ + cli/
# and exposes the Flask `app`), so the container matches the Vercel deploy.
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
ENV PORT=8000
EXPOSE 8000
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT} --workers 2 api.index:app"]
