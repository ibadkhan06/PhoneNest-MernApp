FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install nodemon globally
RUN npm install -g nodemon

# Install dependencies
RUN npm install

COPY . .

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads

EXPOSE 4000

CMD ["npm", "start"] 