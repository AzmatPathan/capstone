# Use official Node.js image as a base
FROM node:14

# Switch to root to set up permissions
USER root

# Create the .npm directory and set permissions
RUN mkdir -p /home/node/.npm && chown -R node:node /home/node/.npm

# Switch to non-root user
USER node

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY --chown=node:node . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
