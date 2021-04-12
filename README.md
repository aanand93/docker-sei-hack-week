## Docker-SEI test app

## How to run this app

1. git clone from the repository
2. in command line run:
   'docker-compose up -d --build'
3. once all three images are running:
   1. check localhost: 3000 to confirm backend is running. It should display "Hello World" on the screen.
   2. check localhost:8000 to run the app in your browser.

## DockerHub

- If you wanted to pull the images that I am using in my container you can find them on dockerhub using the names of the images.
  1. frontend react file = aanand93/docker-sei_react
  2. backend api file = aanand93/docker-sei_api
  3. for the mongo image call the version of mongo I am using in this app. I didn't have to build that image on DockerHub because it was already there for me and I pulled that image to my container like you would do for the frontend and backend.
