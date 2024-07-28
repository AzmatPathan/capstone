# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

#  install dependencies
RUN npm install

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
