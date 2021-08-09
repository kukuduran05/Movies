## This project was created with nodejs and express also I used mongoDB

### Create a REST API with endpoints for the next actions:
1. Create a new user with the next information in addition to your credentials from 1 to 2 favorite movies.
2. Update favorite movies.
3. Get all registered unique movies.
4. Suggest a friend: Randomly return an username from one that matches at least one movie.
5. Add friends to my list.
6. Show friends list.
7. Delete friends from my list.
8. Delete my account.
9. Show friend profile (Friends list and Favorite movies).

### Restrictions:

- When registering user return suggestion list of friends that match 2 favorite movies at the same time.
- It is mandatory to have at least one Favorite movie.
- From point 2 the requests must use any authentication method.
- No more than 2 favorite movies can be added.
- Changing the movies has a restriction of 1 minute difference from the last modification, otherwise an error will be returned.
- You can only add friends who have a movie match otherwise it will return an error.
- Viewing the profile of friends should be restricted to those who are really your friends.
- Any matches per movie must be case-insensitive.