# Block Chain Web App

## Introduction

This simple web application displays a list of the latest blocks sorted by time (the largest first).
It further gives more details for each block. You can also view its previous transactions.

## How to run

This is a two-step process that requires firing up the backend for the frontend to work.
In the project root of the block_chain_app, start the startLocal batch file
- If you are on a Windows machine, start the ```startLocal.bat```
- If you are on MacOS, start the ```startLocal.sh```

You can confirm that the backend is up and running by going to http://localhost:5000/. If it is, you should see the 
message 'Blockchain server is up and running'. Once confirmed, start the web app by running the below command at the 
root of the project (block_chain_app)

### `yarn start`

## Technical details

### Primary Framework(s)

### ReactJS

React is arguably the most popular javascript front-end framework, and rightfully so. React is famous due to its 
simplicity and flexibility for building simple web apps such as this. The reusable components also help.The application 
is built using Reactjs for the front end. This service runs on port `4000`

### AIOHTTP

A new addition to the ever-growing list of python frameworks, this simple frameworks is faster that all the other python
frameworks and supports asynchronous calls. This is a simple HTTP server for AsyncIO. The back-end is built using 
AIOHTTP. This runs on port `5000`

### Package Manager

#### Yarn

The primary reason I chose yarn over npm is, so I can avoid package-lock.json. I generally prefer avoiding npm due to 
its unneeded complexity and also helps makes the apps that I work with lighter. The yarn.lock file relatively much 
easier to manage and/or merge.

#### Pip

I used pip for package management on my backend component. It is automatically installed if your version of 
Python downloaded from python.org 

### Additional Dependencies and Packages

#### Semantic-UI

Semantic UI (https://semantic-ui.com/) is a simple development framework that helps create simple crisp looking layouts.
Most of the page layout is based on its components. However, instead of installing this as a dependency, I used the 
CDN url and loaded it in as a stylesheet. This eliminates the use of unnecessary components that are not going to be 
used and makes the application considerable lighter.

#### Bootstrap

Another framework for with components for building front-end

#### Axios

A simple promise-based HTTP client that I am using to get the data from the back end server to the front end component.
There is no particular reason for me using axios over fetch that might have been much lighter for this app. I have been 
using axios for a while and I just like using it.

#### React-Router-Dom

I am using this for dynamic routing in my web app

#### TinyDB

TinyDB is a lightweight document oriented database. It’s written in  Python and has no external dependencies. This is 
not really useful for bigger applications but is perfect for this simple web app. It stores the values as json objects.

#### Caching

I used TinyDB to implement the ````Cache-Aside Strategy```` - possibly the commonly used caching approach. 
In this strategy, the cache is considered as a separate unit and the application talks 
directly to the primary database and the cache (another data store).

A key-value store is usually the best approach for this strategy - with the most prominent data stores being Redis. My 
intention was to mimic this strategy by using a simple document oriented database on python. Subsequent loads of the 
same data within a session causes the data to be loaded from this database instead of making another API call.

## Future Improvements

### The UI

For future improvements, the UI would definitely have to be cleaned up. The home/landing page can be cleaned up more. 
I want to make it more responsive. I much more intuitive pagination system would make much more sense. In addition to 
the go forward and back, I also want to incorporate a ```go to first``` and a ```go to last```  button that would make 
it easier to navigate in reverse. An option to manually type in and/or select from a choice of next or previous two 
pages from the current one also makes sense. For context, this would be a really basic example of what I envision - 
https://react-table.tanstack.com/docs/examples/pagination

As for the second page, pagination would again make a lot more sense and make help the web app look cleaner.

### The API

Ideally, I want to show the previous transactions that I currently do in the hash_data page within a pop-up modal 
instead of on the main page. I would also like to store this data (preferably cached) so it can be loaded when needed, 
provided the data is already present. This would drastically improve performance.

Other functionalities that I would want to include would be 
- The blockchain exchange data would be a great addition to this page. I preferably would add a way route to the 
Exchange page from the main page. Additional functionality would primarily be focused on ```orders``` 
- Adding and saving orders to show them later; Get specific order details; Deleting orders would be some of the things 
I am interested to try out. 
- The average weight of the previous transactions for each block (and cache this as an additional value in the block object)
- The size of said transactions and their average too (again cache it)
- Additional data on whether these were spent or bought

### Testing

Although this would be something that I almost always add when I put in new code, I unfortunately did not have the time 
to do this at this time.

#### Jest

Jest is my preferred javascript testing framework. In addition to being simple to use, it is also considerably easier 
to set up - especially when compared to Mocha, another testing framework that I am familiar with and used in the past.
It also supports React testing out of the box.

Adding test coverage to all the handlers would take precedence. I want to add unit tests for the three functions in the 
getData handler. I will try to expect the different results for calculators 
like seconds_to_time in addition to the data types. Adding unit tests for the other two calls also makes sense for 
confirming the different exceptions that would be thrown when the call does not work and/or the back end is not up. 
Adding snapshot tests might be a possibility that I am interested to explore and/or discuss.

If there is a second phase of development/improvement on this app, I would start by writing snapshots for the data 
present and the UI components before starting (like the font style and alignments) in an effort to lower down the 
possibility of regressions.

My preference would be to have at least 80%+ test coverage overall.

#### Pytest

The pytest framework makes it easy to write small tests, yet scales to support complex functional testing for 
applications and libraries. I would be using this to write simple unit tests for the functions that I used in the 
```block_chain_app.py``` file. Most would include checking for datatypes and assertions in case a certain value is 
expected.


#### Caching

Another improvement would be the caching, or rather, the way the cache-aside strategy is implemented. As mentioned 
earlier, I used a simple document based database. However, this is only useful for smaller applications. It is not the 
best solution. In case this application can be further improved upon, I would switch to a better solution for a data 
store.