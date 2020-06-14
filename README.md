# thanks-for-watching
## [Example](https://github.com/realprogrammer5000/thanks-for-watching/blob/master/vinegar.mp4?raw=true)
## Usage
### With Docker
```bash
# build and start
docker build -t thanks-for-watching .
docker run -d --rm --publish 8000:5000 --name thanks-for-watching thanks-for-watching:latest

# generate a video
curl -G --data-urlencode "$(echo -ne 'text=Top 10 Best\nScenes From Sharknado')" http://localhost:8000/video --output out.mp4

# play a video
vlc out.mp4

# remove the container when you're done
docker rm --force thanks-for-watching
```
