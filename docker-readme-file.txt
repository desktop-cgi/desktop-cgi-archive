https://gitlab.com/cabalbl4/docker-electron-packager/-/blob/master/Dockerfile
https://gitlab.com/cabalbl4/docker-electron-packager

FROM ubuntu:bionic
WORKDIR /app
RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs npm
RUN npm install -g electron-packager
RUN apt-get install -y zip
RUN apt-get install -y wine-stable
RUN dpkg --add-architecture i386 && apt-get update && apt-get install -y wine32
COPY in /app/app
VOLUME /app/out
COPY make-dist.sh /app/make-dist.sh
ENTRYPOINT /app/make-dist.sh


https://github.com/dcwangmit01/docker-electron-armhf

Docker tips:
https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
Windows Installer:
https://strong-pointer.medium.com/use-docker-container-to-build-windows-installers-for-electron-apps-on-macos-91c2d631dcbd


Example docker images
? - https://hub.docker.com/r/magnitus/electron-app
Electon Builder - https://hub.docker.com/r/electronuserland/builder
(Basic Boiler Plate) Electon Builder - https://github.com/szwacz/electron-boilerplate
Electron packager - https://hub.docker.com/r/renyufu/electron-packager
Electron ReBuild - https://github.com/electron/electron-rebuild




