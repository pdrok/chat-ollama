# Stage 1: Build the React application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Pass the build-time argument to the npm build script
ARG REACT_APP_OLLAMA_API_URL
ENV REACT_APP_OLLAMA_API_URL=$REACT_APP_OLLAMA_API_URL
RUN npm run build

# Stage 2: Serve the application from a lightweight web server
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Add a custom Nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
