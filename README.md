# Chat Ollama Web con Streaming

Este proyecto es una aplicación web desarrollada en **Flask** que permite enviar preguntas a un modelo de lenguaje ejecutado con **Ollama** y mostrar la respuesta en tiempo real mediante streaming en la web.



## Características

* Interfaz web sencilla con formulario de preguntas.
* Respuestas en streaming que aparecen de manera continua mientras el modelo genera el contenido.
* Configuración mediante variables de entorno.
* Contenedor Docker listo para desarrollo y despliegue.

## Tecnologías utilizadas

* Flask
* Requests
* python-dotenv
* Docker
* Docker Compose


## Estructura del proyecto

```
/chat-ollama
├── app.py                 # Aplicación Flask
├── requirements.txt       # Dependencias Python
├── Dockerfile             # Imagen Docker
├── docker-compose.yml     # Configuración Docker Compose
├── .env                   # Variables de entorno (API_URL, MODEL_NAME)
├── /templates
│   └── index.html         # Plantilla HTML
└── /static
    └── main.css           # Estilos CSS
```


## Configuración

1. Crear un archivo `.env` con el siguiente contenido:

```
API_URL=http://<IP_OLLAMA>:11434/api/generate
MODEL_NAME=qwen3:1.7b
```

Reemplazar `<IP_OLLAMA>` por la dirección IP o nombre de host donde se encuentra ejecutando Ollama.

---

2. Instalar dependencias localmente (opcional):

```bash
pip install -r requirements.txt
```


3. Construir y levantar el contenedor con Docker Compose:

```bash
docker-compose build
docker-compose up
```

La aplicación estará disponible en:

```
http://localhost:5001
```


## Uso

* Acceder a la interfaz web.
* Ingresar una pregunta en el campo de texto.
* Presionar el botón "Enviar".
* Observar cómo la respuesta se muestra de forma continua a medida que se genera.


## Personalización

El estilo de la aplicación se puede modificar editando el archivo `main.css` ubicado en la carpeta `/static`.

El diseño de la interfaz se puede ajustar en `templates/index.html`.


## Requisitos

* Docker y Docker Compose instalados.
* Una instancia de Ollama corriendo y accesible desde el contenedor.
