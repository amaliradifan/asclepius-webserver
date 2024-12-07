FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
ENV MODEL_URL=https://storage.googleapis.com/model-submissionmlgc-radifan/model-in-prod/model.json
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]
