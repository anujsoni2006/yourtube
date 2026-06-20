# YourTube

YourTube is a modern video-sharing platform built with React, Node.js, Express, and MongoDB. It allows users to upload, watch, and manage videos while providing a clean and responsive user experience. The project started as a video streaming application and is continuously evolving into a complete content and creator platform with future features such as real-time communication, video calling, live streaming, and community engagement tools.

## Features

### User Features

* User authentication and authorization
* Create and manage channels
* Upload and watch videos
* Video playback with duration tracking
* Search videos
* Like videos
* Watch history
* Watch Later playlist
* Responsive UI
* Channel pages with uploaded videos

### Creator Features

* Upload and manage content
* Personal channel dashboard
* View engagement metrics
* Organize uploaded videos

### Platform Features

* MongoDB database integration
* Secure REST APIs
* Cloud-based media storage
* Dynamic video metadata
* Modern React frontend
* Scalable backend architecture

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### Storage & Services

* Cloudinary
* MongoDB Atlas

## Project Structure

```text
yourtube/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── yourtube/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/anujsoni2006/yourtube.git
cd yourtube
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd yourtube
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Future Roadmap

The project is actively being developed. Planned features include:

* Video Calling
* Live Streaming
* Real-time Chat
* Creator Analytics Dashboard
* Notifications System
* Community Posts
* Video Recommendations
* Playlists
* Subscriptions
* Mobile Application
* AI-powered Content Features

## Author

Anuj Soni

B.Tech CSE (3rd Year)

Passionate about Web Development, Full Stack Development, and AI-powered Applications.

## License

This project is developed for educational and portfolio purposes and is continuously evolving with new features and improvements.
