FROM node:22-alpine
WORKDIR /app

COPY . /app

RUN npm install && \
    npm run build && \
    npm prune --production && \
    rm -rf /root/.npm

EXPOSE 3000
CMD ["npm", "start"]