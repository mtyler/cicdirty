FROM node:16
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
ARG BUILD=0
ENV BUILD=$BUILD
ARG QA=0
ENV QA=$QA
ARG PROD=0
ENV PROD=$PROD
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]