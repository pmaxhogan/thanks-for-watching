# get latest ubuntu
FROM ubuntu:rolling

RUN apt-get install -y ffmpeg melt

# Add our code
ADD . /opt/code
WORKDIR /opt/code

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

CMD BIND=0.0.0.0 node .
