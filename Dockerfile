 FROM  node:18-alpine

 WORKDIR /app

 COPY  package*.json  ./

 RUN npm install --frozen-lockfile

 COPY . .

 RUN npm start

 EXPOSE 3002

 CMD ["node" "server.js"]