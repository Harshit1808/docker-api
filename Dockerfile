# Base image
FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . ./

# Expose ports
EXPOSE 3000


# Start the app
CMD ["npm", "run", "dev"]
