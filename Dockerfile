FROM node:18.13.0
COPY ./ /planner-project
WORKDIR /planner-project
RUN npm install
CMD npm run build && npm run start:prod
EXPOSE 3000