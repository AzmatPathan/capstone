# Stage 1: Build the React app
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies and fix vulnerabilities
RUN npm install
RUN npm audit fix --force

# Copy source files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Copy the React app build from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
