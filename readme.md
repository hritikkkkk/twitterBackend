# Twitter-Backend

## High-Level Overview of the Project 📊

This project addresses engineering challenges by ensuring that when a user deletes or updates a tweet, the associated images are removed from the cloud platform, and their references are deleted from the database. Additionally, posts can only be deleted or updated by the respective admin.

### Features

1. **Tweet Creation**: 
   - Create tweets with up to 270 characters.
   - Update tweets.

2. **Likes and Comments**:
   - Like or unlike tweets or comments.
   - Comment on tweets or other comments.

3. **Nested Comments**:
   - Comment threads allow for nested comments.
   - Users can view and interact with comment threads.

4. **Pagination**:
   - Support for paginating tweets efficiently.

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
     CLOUD_NAME="Cloudinary_NAME"
     CLOUD_API_KEY="Cloudinary_API_KEY"
     CLOUD_API_SECRET="Cloudinary_API_SECRET"
     ```

4. **Run the server**:
   ```sh
   npm run dev
   ```

### Usage

#### API Endpoints

- **User signup**: `POST /api/v1/user/signup`
  - Body: 
    ```json
    { 
      "username": "your_name",
      "email": "email@gmail.com",
      "password": "pass123"
    }
    ```

- **User login**: `POST /api/v1/user/login`
  - Body: 
    ```json
    {
      "usernameOrEmail": "your_name OR email@gmail.com",
      "password": "pass123"
    }
    ```

- **Create a tweet**: `POST /api/v1/tweets`
  - Body: 
    ```json
    { 
      "content": "tweet content",
      "images": ["image url"]
    }
    ```

- **Comment on a tweet or comment**: `POST /api/v1/comments?modelId=your_model_id&modelType=your_model_type`
  - Query Parameters:
    - `modelId`: The ID of the tweet or comment.
    - `modelType`: The type of model (`"tweet"` or `"comment"`).
  - Body: 
    ```json
    { 
      "content": "your_comment"
    }
    ```

- **Like/Unlike a tweet or comment**: `POST /api/v1/likes/toggle?modelId=your_model_id&modelType=your_model_type`
  - Query Parameters:
    - `modelId`: The ID of the tweet or comment.
    - `modelType`: The type of model (`"tweet"` or `"comment"`).

- **Retrieve a tweet with comments**: `GET /api/v1/tweets/:id`
  - Replace `:id` with the ID of the tweet.

- **Retrieve paginated tweets**: `GET /api/v1/tweets?offset=1&limit=10`
  - Query Parameters:
    - `offset`: `1`.
    - `limit`: `10`.

- **Retrieve hashtag-specific tweets**: `GET /api/v1/tweets/hashtag/:id`
  - Replace `:id` with the ID of the hashtag.

- **Update a tweet**: `PATCH /api/v1/tweets/:id`
  - Body: 
    ```json
    { 
      "content": "updated tweet content",
      "images": ["updated image url"]
    }
    ```

- **Delete a tweet**: `DELETE /api/v1/tweets/:id`
  - Replace `:id` with the ID of the tweet.

### JWT Authentication

- Protect routes using JWT authentication middleware.
- Custom middlewares for authenticating specific user posts to ensure only the owner can delete or update tweets.







