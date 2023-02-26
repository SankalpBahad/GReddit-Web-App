FROM node:18.13.0

COPY package.json .

RUN npm install --force
# copy the files 
COPY . .
# 
EXPOSE 8000


CMD [ "npm", "start" ]