FROM artifact.piccit.com.cn:8090/paas/public/nginx:latest  

ARG basedir=/etc/nginx/html/portalweb
ARG nginxconfdir=/etc/nginx/

Run mkdir -p $basedir
Run mkdir -p /data/

ADD  dist $basedir
ADD  nginx.conf $nginxconfdir
ADD  start.sh /data/

EXPOSE 80
CMD ["bash", "+x", "/data/start.sh"]