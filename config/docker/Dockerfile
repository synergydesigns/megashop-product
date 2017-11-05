FROM node:latest

MAINTAINER Synergy Designs <<synergydesigns@gmail.com>>

COPY . /var/www
ADD . /var/www

WORKDIR /var/www

CMD ["npm", "install"]
CMD ["npm", "migrate"]

CMD ["npm", "run", "dev"]

EXPOSE 8080

