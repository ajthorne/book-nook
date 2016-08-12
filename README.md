#Book Nook
##Book Nook is an app to support building a literacy community among adolescents. Find new friends, new books to read, and explore an awesome new social media!


###Basic Features
1. User Profiles -
  - Keep a digital library of books you've read.
  - Create posts/updates to let your friends know what you're reading or ask for recommendations
  - 'I Heart You!': Special emojis to denote your favorites

2. Book Searches -
  - Explore the extensive library of books to find new exciting things to read
  - Add books to your digital library to show other users what you've read

3. Building a Community -
  - Connect with other teens who love the same book you do. Follow them, view or comment on their profile.
  - Find teens nearby in your 'nook' who love reading like you do.


###MVP
1. Users can sign up, log in, and log out on their accounts.
2. Users can view a complete list of users on the site and explore individual profiles.
3. Users can search for a specific book which renders results for the user to view.
4. Users can add a specific book their library collection, which is displayed on their profile page.


###APIs
1. Google Books
  - https://developers.google.com/books/
2. Kinvey
3. Google Maps
  - https://developers.google.com/maps/


###Data Modeling
  - User - Kinvey API
  ```
    { id: 1234,
    username: "testuser",
    authtoken: "1234",
    name: 'sally',
    friends: ['coop', 'shannon']
    }
    ```

  - userLibrary - Kinvey API (Also a collection)
    (Join table / Related to user)
    ```
    { id: '32432423'
      bookId: 'hlb_sM1AN0gC',
      userId: '3431w4124',
      title: 'The Hunger Games',
      authors: ['Suzanne Collins'],
      imageLinks: {
        smallThumbnail: 'https://books.google.com/books/content?id=hlb_sM1AN0gC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
          }
     }
      ```

  - wallPost (Also a collection) - Kinvey API
    ```
    { id: '',
      body: '',
      timestamp: '',
      creator: '' }
      ```

  - comment (Also a collection) - Kinvey API
  (Join table / Related to wallPost)
  ```
    { id: '',
      body: '',
      timestamp: '',
      creator: '' }
    ```

  - favorite (Also a collection) - Kinvey API
  (Join table / Related to user)
  ```
    { id: '32432423'
      bookId: '43244234',
      userId: '3431w4124' }
    ```


###Routes
1. '/': Basic introduction to the site with navigation links to login, sign up, search books
2. /books: Displays results for specific books/categories searched by user
3. /users: Displays list of users currently using the app
4. /user/:id : User profile lives here which includes the digital library, posts, favorites, and friends list components.
5. /user/:id/favorites: Displays user favorites
6. /user/:id/posts: Displays user posts
7. /user/:id/followers: Displays user followers
8. /thenook: Connect with teens nearby


###Libraries
1. Backbone
2. JQuery


###Special Features
1. Geolocation
2. Profile image uploading
