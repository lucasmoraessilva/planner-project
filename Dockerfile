FROM node:18.13.0
COPY ./ /planner-project
WORKDIR /planner-project
RUN npm install \
    npm run build
CMD npm run start:prod
EXPOSE 3000