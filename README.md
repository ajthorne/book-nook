#Book Nook
###Elevator Pitch
___
  - Book Nook is an app to support building a literacy community among adolescents. Find new friends, new books to read, and explore an awesome new social media!


###Basic Features
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


###APIs
1. Google Books
  - https://developers.google.com/books/
2. Kinvey
3. Random User
  - https://randomuser.me/
4. Google Maps
  - https://developers.google.com/maps/

###Data Modeling
  - Session - Kinvey API
  ```
  { id: 1234,
    username: "testuser",
    authtoken: "1234" }
    ```

  - User - Kinvey API / Possibly Google Books
  ```
  {  username: 'pikachu54',
     name: 'sally',
     favorites: ['The Hunger Games', 'Divergent'],
     friends: ['coop', 'shannon']
    }
    ```
    //Should I include a BooksRead array or object on user?
    //Need to store user location also

  - User Post (Also a collection) - Kinvey API
    ```
    { body: '',
      timestamp: '',
      creator: ''  }
      ```

  - Book (Also a collection) - Google Books API
    - Keys and values rendered from a GET request of 'https://www.googleapis.com/books/v1/volumes?q=hunger+inauthor:collins' on Google Books
  ```
  {  id: 'hlb_sM1AN0gC',
     title: 'The Hunger Games',
     authors: ['Suzanne Collins'],
     published: 2008,
     description: 'In a future North America, where the rulers of Panem maintain control through an annual televised survival competition pitting young people from each of the twelve districts against one another, sixteen-year-old Katniss's skills are put to the test when she voluntarily takes her younger sister's place.'
     categories: 'Juvenile Fiction',
     pageCount: 374
     imageLinks: {
       smallThumbnail: 'https://books.google.com/books/content?id=hlb_sM1AN0gC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
       }
     }
    ```

  - Message (Also a collection) - Kinvey API
  ```
  { creator: 'sally',
     body: 'hiiiii!',
     timestamp: '',
     recipient: 'coop' }
    ```

###Routes
1. '/': Basic introduction to the site with navigation links to login, sign up, search books
2. /books: Displays results for specific books/categories searched by user
3. /user/:id : User profile lives here which includes the digital library, posts, favorites, and friends list components.
4. /user/:id/messages: Messaging area which houses messages received by user
5. /thenook: Connect with teens nearby

###Libraries
1. Backbone
2. JQuery

###Special Features
1. Geolocation
2. Profile image uploading
