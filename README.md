# Book Nook
## Book Nook is an app to support building a literacy community among adolescents. Find new friends, new books to read, and explore an awesome new social media!

## [Book Nook Live Site](http://booknook.surge.sh/)

### Basic Features
1. User Authentication
2. User Profiles -
  - Keep a digital library of books you've read.
  - Create posts/updates to let your friends know what you're reading or ask for recommendations
  - 'I Heart You!': Special emojis to denote your favorites

3. Book Searches -
  - Explore the extensive library of books to find new exciting things to read
  - Add books to your digital library to show other users what you've read

4. Building a Community -
  - Connect with other teens who love the same book you do. Follow them, view or comment on their profile.

### MVP
1. Users can sign up, log in, and log out on their accounts.
2. Users can view a complete list of users on the site and explore individual profiles.
3. Users can search for a specific book which renders results for the user to view.
4. Users can add a specific book their library collection, which is displayed on their profile page.

### Planning Process
1. [Book Nook Trello board](https://trello.com/b/T5miQIeO/book-nook)
2. Wireframes: [1](https://trello-attachments.s3.amazonaws.com/57acaf1ed653c81d1def3643/1200x1600/e3d322d787e7b9a8009326f90b9da4b1/finalwireframe1.JPG.jpg),  [2](https://trello-attachments.s3.amazonaws.com/57acaf1ed653c81d1def3643/1200x1600/89dd12eae70980b2dc44f06dc1ca339c/finalwireframe2.JPG.jpg),  [3](https://trello-attachments.s3.amazonaws.com/57acaf1ed653c81d1def3643/1200x1600/b5a3340b521dd61a5eb2749bcf7262f4/finalwireframe3.JPG.jpg),  [4](https://trello-attachments.s3.amazonaws.com/57acaf1ed653c81d1def3643/1200x1600/ad582bf120e6022f2e5be823ee87a213/finalwireframe4.JPG.jpg),  [5](https://trello-attachments.s3.amazonaws.com/57acaf1ed653c81d1def3643/1200x1600/f50996d0c8355372d7273bc70daa766a/finalwireframe5.JPG.jpg)

### APIs
1. [Google Books](https://developers.google.com/books/)
2. [Kinvey](https://www.kinvey.com/)

### Routes
1. '/': Basic introduction to the site with navigation links to login, sign up, search books
2. /books: Displays results for specific books/categories searched by user
3. /users: Displays list of users currently using the app
4. /user/:id : User profile lives here which includes the digital library, posts, favorites, and friends list components.
5. /user/:id/favorites: Displays user favorites
6. /user/:id/posts: Displays user posts
7. /user/:id/followers: Displays user followers

### Libraries
1. Backbone
2. JQuery
3. Underscore
4. Moment
5. React
6. Sass
7. [Google Fonts](https://fonts.google.com/)
8. [Font Awesome](http://fontawesome.io/)

### Future Goals
1. Geolocation - Check in to local book hotspots!
2. See a list of popular books among site users
3. Find other users who have read a book
4. Profile image uploading
5. Emoji support for comments and posts

### Credits
1. Designs inspired by Twitter and OverDrive
2. Book and User mobile icon by [FreePik](http://www.freepik.com/)

### Data Modeling
  - User - Kinvey API
  ```
    { id: 1234,
    username: "testuser",
    authtoken: "1234",
    name: 'sally',
    followers: ['coop', 'shannon']
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
