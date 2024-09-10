# Audify
Developed a website using <b>MERN</b> stack that allows users to extract audio from MP4 files.Webapp also allows audio downloading, and deletion, with the extracted audio saved within each user’s account.Implemented key features like User authentication using <b>JWT Token</b> and password encryption using <b>bcrypt.js </b> libraryto provide extra security
# How it works
When user go the home page, website see if any  <b>JWT Token</b> is present or not in the local storage of user. If there is no JWT_TOKEN, user will be directed to the  <b>Login</b> page, either user can login or register
## Login 
If credentials use gives is not correct, it will show error. User fill the email, Then api will be call to check if that email exist or not in database, if it's does then api will check that entered is correct or not, if it is correct then JWT_token will be send as a response and it get store in local storage. User will be directed to the  <b>Home page</b>
## register
If email doesn't exist, user have to register by providing name, email and password. That email and name will be saved in tha database directly, but password will be converted into encrypted form with the help of <b>bcrypt.js </b>. So user's data stay secure.
## converting file
User's will submit a mp4 file as a input. Implemented a algo using ffmpeg which run on that mp4 file and convert it into buffer of mp3, so for storing the audio file. Implemented a method for converting buffer array file to blob file followed by blob file to audio file.


