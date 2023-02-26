# DASS-Assignment-1
This is the ReadME file for DASS Assignment-1 Submission.

The react app (frontend) can be run by executing the command 'npm start' in the frontend folder's terminal
The backend can be started by executing the command 'npm run dev' in the backend folder's terminal.

The online mongoDB site used to store data in databases (collections) is 'mongoDB atlas'
The connection string for connecting (i.e url) is present in the .env file in backend folder (/backend/.env) and is commented.

When the react app is first opened,  it by default takes to the Login Page, where there are options for Signing Up as well. 
There is an alert in case of invalid credentials.

On register page, username, first and last name and email and password are required fields.

Then the home page is displayed that has the links to all the required locations and also has logout button at top right.

In My sub greddiits there is an option to add a new form in the top left corner. It displays the Subgreddiits created and handled by the user.

When the user enters the subgreddiit from here, there are additional links on navbar for users, joined requests, reports and stats pages.

In All subgreddiits, there are sorting options present, and also there is a 'None' option present that removes any kind of sorting on the data.

To make a post in the subgreddiit, click on add new post, type post content and then click on submit and refresh. Same with commenting, upvoting, and downvoting.

To submit your report, fill your concern and click on submit, you will be redirected to the page having all posts of the subgreddiit.

On Users page, there is a list of non blocked and blocked users, reload required for updation.

On Joining Requests page, there is a list of joining requests, with option to accept or reject, reload required for updation.

On Reports page, there is a list of reports, having the 3 options, reload required for updation after pressing any button.

For Saved Posts, we go to a page where there is the exact copy of the post that has been saved, with an option of removing from it, reload required for updation.

In profile page, we have the option of followers following and also editing certain fields, and also diplaying all information about the user.

All my get/post request in backend are stored in just one file i.e index.js and schemas are stored in /backend/models.

Important:

While entering banned keywords, DO NOT enter a comma in the end. For example, incase of test, it should be "test" and not "test,".
