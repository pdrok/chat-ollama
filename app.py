from flask import Flask, render_template, request, Response, stream_with_context
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("API_URL")
MODEL_NAME = os.getenv("MODEL_NAME")

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    prompt = request.form.get("prompt")
    if not prompt:
        return "No prompt provided.", 400

    def stream():
        # Iniciar la solicitud al API en modo streaming
        resp = requests.post(
            API_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": True
            },
            stream=True
        )
        # Iterar sobre las líneas que devuelve
        for line in resp.iter_lines():
            if line:
                data = json.loads(line)
                if "response" in data:
                    # Enviar cada fragmento de texto al navegador
                    yield data["response"]
        # Indicar que terminó
        yield "\n\n--- Fin de la respuesta ---"

    # Retornar un Response en streaming
    return Response(stream_with_context(stream()), mimetype="text/plain")
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=False, threaded=True)

