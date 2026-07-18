# Build image
FROM node:20-alpine
#  Declare Arguments for base url (used by compose.yaml in backend project)                                                                                      
ARG API_URL                                                                                                               
ENV NEXT_PUBLIC_API_URL=$API_URL 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]