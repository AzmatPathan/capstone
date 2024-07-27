# Use a specific Node.js version as the base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Create .npm directory and adjust permissions in the node user's home directory
USER root
RUN mkdir -p /home/node/.npm && chown -R node:node /home/node/.npm

# Switch to the node user
USER node

# Copy package.json and package-lock.json (if present)
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 8080

# Specify the command to run the application
CMD ["npm", "start"]
