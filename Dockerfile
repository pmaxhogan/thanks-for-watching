# get latest ubuntu
FROM ubuntu:rolling

RUN apt-get update
RUN apt-get install -y ffmpeg melt curl xvfb ladspa-sdk swh-plugins
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Add our code
ADD . /opt/code
WORKDIR /opt/code

# Run the image as a non-root user
RUN adduser --disabled-password myuser
USER myuser

RUN NODE_ENV=production npm i
CMD NODE_ENV=production BIND=0.0.0.0 node .
