# Ollama Chat

This project is a simple web-based chat interface for interacting with language models running on a local Ollama instance. It provides a clean and straightforward UI to send prompts and receive responses from your chosen model.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- A running [Ollama](https://ollama.ai/) instance with a downloaded model (e.g., `ollama run qwen3:1.7b`).

## Running with Docker

This application is containerized for easy setup and deployment.

1.  **Build the Docker image:**
    Open your terminal in the project's root directory (`ollama-chat`) and run the following command. You can set the Ollama API endpoint at build time using the `REACT_APP_OLLAMA_API_URL` build argument.
    ```bash
    docker build --build-arg REACT_APP_OLLAMA_API_URL=http://your-ollama-api-url:11434/api/generate -t ollama-chat .
    ```
    If you don't provide the build argument, it will default to `http://192.51.100.100:11434/api/generate`.

2.  **Run the Docker container:**
    After the image is built, run the application with the following command:
    ```bash
    docker run -p 8080:80 ollama-chat
    ```

3.  **Access the application:**
    Open your web browser and navigate to [http://localhost:8080](http://localhost:8080).

## Configuration

The application connects to the Ollama API endpoint specified by the `REACT_APP_OLLAMA_API_URL` environment variable during the Docker build.


---

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*