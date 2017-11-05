FROM node:latest

LABEL Synergy Designs <<synergydesigns@gmail.com>>

COPY . /var/www
ADD . /var/www

WORKDIR /var/www

RUN ["npm", "install"]
RUN ["npm", "migrate"]

CMD ["npm", "run", "dev"]

EXPOSE 8080

