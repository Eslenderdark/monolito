FROM node:22-alpine


COPY . ./
EXPOSE 80
RUN rm -rf node_modules && npm i
CMD ["npm", "start"]


