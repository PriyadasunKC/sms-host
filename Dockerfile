# Stage 1: Build the React frontend
FROM node:lts-alpine AS build
WORKDIR /app/project

COPY project/package*.json ./ 
RUN npm install
COPY project/ ./
RUN npm run build 

# Stage 2: Set up the Node.js server
FROM node:lts-alpine AS server
WORKDIR /app/server

# Copy package files and install dependencies, rebuilding bcrypt 
COPY server/package*.json ./ 
RUN npm ci --omit=bcrypt && npm install bcrypt 

# Copy the rest of your server code
COPY server/ ./ 

# Copy the built React frontend from the 'build' stage
COPY --from=build /app/project/build /app/server/public 

# Expose the port your Node.js server listens on
EXPOSE 3000 

# Start your server 
CMD ["npm", "start"] 