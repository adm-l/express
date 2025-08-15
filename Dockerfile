# 1. Use official Node.js LTS image
FROM node:22-alpine3.18

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files first (for better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy remaining source files
COPY . .

# 6. Expose port (match your Express app port, e.g., 3000)
EXPOSE 3000

# 7. Start the app (modify if using TypeScript or PM2)
CMD ["npm", "run", "dev"]
