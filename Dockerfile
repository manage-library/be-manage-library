# Base image
FROM node:14.0.0-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]