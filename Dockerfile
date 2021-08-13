# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:12.18.1 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
ARG BACKEND_API_FUSEKI_URL
ARG IMAGES_PATH
ENV BACKEND_API_FUSEKI_URL=$BACKEND_API_FUSEKI_URL
ENV IMAGES_PATH=$IMAGES_PATH
RUN npm run build --prod

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13
COPY --from=node /app/dist/RefibraAngular /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
