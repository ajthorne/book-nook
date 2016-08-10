#Book Nook
###Elevator Pitch
___
  - Book Nook is an app to support building a literacy community among adolescents. Find new friends, new books to read, and explore an awesome new social media!
___

###Basic Features
___
1. User Profiles -
  - Keep a digital library of books you've read.
  - Create posts/updates to let your friends know what you're reading or ask for recommendations
  - 'I Heart You!': Special emojis to denote your favorites

2. Book Searches -
  - Explore the extensive library of books to find new exciting things to read
    - IDEAL: Add comments, reviews, or rants to books you feel passionate about.

3. Building a Community -
  - Connect with other teens who love the same book you do. Add them to your friends list, comment on their profile, or send them a personal message.
  - Find teens nearby in your 'nook' who love reading like you do.
___

###APIs
___
1. Goodreads
  - https://www.goodreads.com/api
2. Kinvey
3. Random User
  - https://randomuser.me/
4. Google Maps
  - https://developers.google.com/maps/

###Data Modeling
___
  - Session
  ```
  { id: 1234,
    username: "testuser",
    authtoken: "1234" }
    ```

  - User
  ```
  { username: 'pikachu54',
     name: 'sally',
     favorites: ['The Hunger Games', 'Divergent'],
     friends: ['coop', 'shannon'],
    }
    ```
    //Should I include a BooksRead array or object on user?

  - User Post (Also a collection)
    ```
    { body: '',
      timestamp: '',
      creator: ''  }
      ```

  - Book (Also a collection)
  ```
  {  title: 'The Hunger Games',
     author: 'Suzanne Collins',
     genre: 'Dystopian'  }
    ```

  - Message (Also a collection)
  ```
  { creator: 'sally',
     body: 'hiiiii!',
     timestamp: '',
     recipient: 'coop' }
    ```
___

###Routes
___
1. '/': Basic introduction to the site with navigation links to login, sign up, search books
2. /books: Displays results for specific books/categories searched by user
3. /user/:id : User profile lives here which includes the digital library, posts, favorites, and friends list components.
4. /user/:id/messages: Messaging area which houses messages received by user
5. /thenook: Connect with teens nearby
___

###Libraries
___
1. Backbone
2. JQuery

___

###Special Features
___
1. Geolocation
2. Profile image uploading
