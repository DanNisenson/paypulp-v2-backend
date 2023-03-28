FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
ADD . . 

ENV PG_USER="postgres"
ENV PG_HOST="dbv2.cx4edu1o24re.eu-central-1.rds.amazonaws.com"
ENV PG_DATABASE="dbv2"
ENV PG_PORT="5432"
ENV PG_PASSWORD="abcd1234"
ENV PG_USER_2="postgres1"
ENV PG_HOST_2="dbv2-1.cx4edu1o24re.eu-central-1.rds.amazonaws.com"
ENV PG_DATABASE_2="dbv2_1"
ENV PG_PORT_2="5432"
ENV PG_PASSWORD_2="abcd1234"

EXPOSE 8585
CMD node ./bin/www