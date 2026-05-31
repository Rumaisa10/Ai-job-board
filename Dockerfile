FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Add dummy env vars for build time only
ENV MONGODB_URI=mongodb://localhost:27017/ai-job-board
ENV NEXTAUTH_SECRET=build-secret
ENV NEXTAUTH_URL=http://localhost:3000
ENV GOOGLE_CLIENT_ID=build-client-id
ENV GOOGLE_CLIENT_SECRET=build-client-secret

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]