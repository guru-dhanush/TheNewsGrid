# Build the application
FROM node:18-alpine AS build

WORKDIR /app

# Copy only necessary files for dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the entire project to the container
COPY . ./

# Build the application with Vite
RUN npm run build

# Serve the application
FROM nginx:stable-alpine

# Copy built assets to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000


CMD ["nginx", "-g", "daemon off;"]
