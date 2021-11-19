# Josh_Talks

# Steps to use the API:

1. download the code to your local machine

2. run "npm install" command in console to install all the packages

3. use postman or some similar tool, to hit the api

4. to fetch all the videos, hit this url "http://localhost:3000/"

5. to search for some specific keyword, use the url "http://localhost:3000/getData", this is a post request, so define the search term in json format,
   For example: {"term":"india"}, this will fetch all the videos which contains "india" in their title or description
