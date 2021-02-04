FROM centos
RUN yum install -y git \
    && git clone https://github.com/xiaofsu/bbs_zombieden \
    && mv bbs_zombieden zombieden  \ 
    && chmod -R 777 zombieden \
    && cd zombieden \
    && yum install -y nodejs \
    && npm install \
    && npm i pm2 -g  
CMD [ "cd /zombieden/", "pm2 start start.js" ]