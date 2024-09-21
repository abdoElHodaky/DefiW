FROM node:18-alpine
WORKDIR /app
COPY . .
#COPY supervisord.conf /etc/supervisord.conf

RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev protobuf protobuf-dev npm sudo
#RUN rm -rf package-lock.json && mkdir /var/log/supervisor/
#RUN npm cache clean --force
RUN  npm install pm2 npm-run-all vite  -g
RUN ln -s /usr/local/lib/node_modules/ ../node_modules 
RUN chmod 777 -R . 
#ENV APP_URL=0.0.0.0
ENV ENABLE_OVERCOMMIT_MEMORY=true
#ENV MONGO_URI=mongodb+srv://abdoarh36:TyWF4ABOefQhJFbP@cluster0.bc7sxu7.mongodb.net/mernfreelancemarket
RUN mkdir -p backend/public
RUN yarn install && \
npm run build && \
cp -r build/. server/public && \
cd server && npm install
EXPOSE 8800 
CMD ["node","api/server.js"]
#CMD ["/usr/bin/supervisord","-c","./supervisord.conf"]
