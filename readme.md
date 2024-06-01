
# Twitter-Backend

## High-Level Overview of the Project 📊

- **Tweet Creation**: Users can create a tweet.
  - Each tweet can contain up to 270 characters.
  
- **Like/Unlike and Comment**: 
  - Users can like or unlike a tweet or comment.
  - Users can comment on tweets or other comments, creating nested comment threads.

- **Thread Access**: 
  - Users can access threads of comments and tweets to follow conversations.

- **Pagination**: 
  - Implement pagination on tweets for efficient data retrieval.

- **User Authentication**:
  - User authentication is handled with `passport-jwt`.
  - Users can log in using either their username or email.

- **Hashtags**: 
  - Each tweet may include one or more hashtags.

### Features

1. **Tweet Creation**: 
   - Create tweets with up to 270 characters.
  
2. **Like/Unlike and Comments**:
   - Like or unlike tweets or comments.
   - Comment on tweets or other comments.

3. **Nested Comments**:
   - Comment threads allow for nested comments.
   - Users can view and interact with comment threads.

4. **Pagination**:
   - Pagination support for retrieving tweets efficiently.

5. **Authentication**:
   - JWT-based authentication with `passport-jwt`.
   - Supports login using either username or email.

6. **Hashtags**:
   - Tweets can contain hashtags for categorization and searchability.

### Installation and Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/hritikkkkk/twitterBackend.git
   cd TwitterBackend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT="port number"
     MONGO_URL="database url"
     JWT_SECRET="jwt_secret"
     JWT_EXPIRY="expiry time"
     ```

4. **Run the server**:
   ```sh
   npm run dev
   ```

### Usage

- **API Endpoints**:
  - Create a tweet: `POST /api/tweets`
  - Like/Unlike a tweet or comment: `POST /api/v1/likes/toggle?modelId=your_model_id&modelType=your_model_type`
    - Replace `your_model_id` with the ID of the tweet or comment.
    - Replace `your_model_type` with either `"tweet"` or `"comment"`, depending on the type of model you're liking/unliking.
  - **Comment on a tweet or comment**: `POST /api/comments?modelId=your_model_id&modelType=your_model_type`
  - Parameters:
    - `modelId`: The ID of the tweet or comment.
    - `modelType`: The type of model (`"tweet"` or `"comment"`).
  - Body: `{ "content": "your_comment" }`
  - Retrieve a tweet with comments: `GET /api/tweets/:id`
  - Retrieve paginated tweets: `GET /api/tweets?offset=1&limit=10`
  - User signup:`POST /api/user/signup`
  - User login: `POST /api/user/login`

- **JWT Authentication**:
  - Protect routes using JWT authentication middleware.






