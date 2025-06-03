FROM node:18-alpine
WORKDIR /app
COPY . .
#COPY supervisord.conf /etc/supervisord.conf

RUN apk add --no-cache tzdata  sqlite-dev postgresql-dev mysql-dev protobuf protobuf-dev npm sudo
#RUN rm -rf package-lock.json && mkdir /var/log/supervisor/
#RUN npm cache clean --force
RUN  npm install pm2 npm-run-all  -g
RUN ln -s /usr/local/lib/node_modules/ ../node_modules 
RUN chmod 777 -R . 
ENV ENABLE_OVERCOMMIT_MEMORY=true
RUN mkdir -p backend/public
#RUN yarn install && \npm run client && \cp -r build/. backend/public && \
RUN cd backend && npm install
EXPOSE 3000 
CMD ["sh", "-c","cd backend ; node src/server.js"]
#CMD ["/usr/bin/supervisord","-c","./supervisord.conf"]
