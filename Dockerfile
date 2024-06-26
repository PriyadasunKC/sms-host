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

COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Copy the built React frontend
COPY --from=build /app/project/build /app/server/public 

EXPOSE 3000 
CMD ["npm", "start"] 