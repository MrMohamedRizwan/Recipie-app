# Use an official Node.js runtime as the base image for building the frontend
FROM node:18 AS build

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend for production
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:alpine

# Copy the built frontend files to the nginx html directory
COPY --from=build /src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
