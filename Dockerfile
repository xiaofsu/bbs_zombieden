FROM centos
RUN yum install git \
    && git clone https://github.com/xiaofsu/bbs_zombieden \
    && mv bbs_zombieden zombieden  \ 
    && chmod -R 777 zombieden \
    && cd zombieden \
    && yum install node \
    && npm install \
    && npm i pm2 -g  \
    && pm2 start start.js