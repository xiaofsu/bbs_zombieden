FROM centos
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && yum install -y git \
    && git clone https://github.com/xiaofsu/bbs_zombieden \
    && mv bbs_zombieden zombieden  \ 
    && chmod -R 777 zombieden \
    && cd zombieden \
    && yum install -y nodejs \
    && npm install \
    && npm i pm2 -g  \
    && pm2 start /zombieden/start.js
WORKDIR /zombieden
CMD pm2 start start.js && tail -f start.js