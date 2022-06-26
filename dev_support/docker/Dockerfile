FROM node:14.16

RUN apt-get update && \
	apt-get -y --no-install-recommends install git libgtk-3-0 libgtk-3-0-dev libgtkextra-dev libgconf2-dev libnss3 libasound2 \
	libxtst-dev libxss1 libgtk-3-bin software-properties-common\
	&& apt-get clean -qq && rm -rf /var/lib/apt/lists/*


# User and permissions
ARG user=desktopcgi
ARG group=desktopcgi
ARG uid=999
ARG gid=999
ARG home=/home/${user}
RUN mkdir -p /etc/sudoers.d \
    && groupadd -g ${gid} ${group} \
    && useradd -d ${home} -u ${uid} -g ${gid} -m -s /bin/bash ${user} \
    && echo "${user} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/sudoers_${user}


USER ${user}


RUN mkdir ${home}/app
RUN git clone https://github.com/ganeshkbhat/desktop-cgi.git .
RUN chown -R ${user} ${home}/app
WORKDIR ${home}/app


# COPY --chown=desktopcgi package*.json ./
COPY --chown=${user} package*.json ./


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# COPY --chown=desktopcgi . .
COPY --chown=${user} . .


# CMD [ "npm", "run", "electronbuild" ]

