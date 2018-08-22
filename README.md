# dva-tracker
App to track the effectiveness of a DVA investment strategy and guide current investment decisions.

### Things I learned in this project

- Increased my understanding of and comfort with React. This project, in addition to the udemy React 16 course, has given me a much better React foundation without using ease-of-use libraries like Redux.
- Experimented with and better understood the React lifecycle hooks and when to utilize them. Especially helpful with the API calls and database queries used in this project.
- Learned how to use Firebase's database and hosting functionalities.
- First experience with storing data in a NoSQL database. I'm an Oracle guy and an RDB lover, but I can see the appeal and ease-of-use with NoSQL for simple apps.
- Increased my knowledge of the axios library.


### Issues faced during this project

- Lifecycle hooks. In trying to create the app without using Redux I had to figure out how to make API calls without causing infinite loops.
- Ensuring that the app wasn't re-rendering unnecessarily. This could still use some work as I'm sure the app is still re-rendering when it's not necessary.


### Unresolved project items

- Site is in desperate need of styling
- Implement a graph to show portfolio value vs target value over time; maybe use graph library used in boditraq
- Add user authentication
- Add ability for each user to track multiple individual investments
