# 🎶 Music Library Organizer

A grand and playful-themed music library web application that allows users to upload, organize, search, and play songs with an attractive user interface and Java backend.

## ✨ Features

### Frontend Features
- **Grand & Playful Design** - Modern, colorful interface inspired by Spotify/Apple Music
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Animations** - Hover effects, transitions, and loading animations
- **Audio Visualizer** - Real-time music visualization with circular and bar animations
- **Multiple Pages**:
  - Login/Signup pages with animated forms
  - Dashboard with song grid and playlists
  - Upload page for adding new songs
  - Music player with full controls
  - Playlist management

### Backend Features
- **RESTful APIs** - Complete API for all music operations
- **JWT Authentication** - Secure user authentication and session management
- **File Upload** - Support for audio file uploads with metadata
- **Database Integration** - MySQL database with JPA/Hibernate
- **Security** - Password encryption and API security

### Database Schema
- **Users** - User accounts and authentication
- **Songs** - Music files with metadata (title, artist, album, genre)
- **Playlists** - User-created playlists
- **PlaylistSongs** - Many-to-many relationship between playlists and songs

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd music-library-organizer
```

2. **Start with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Database: localhost:3306

### Manual Setup (Without Docker)

#### Backend Setup
1. **Prerequisites**
   - Java 17+
   - Maven 3.6+
   - MySQL 8.0+

2. **Database Setup**
```sql
CREATE DATABASE music_library;
```

3. **Run Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend Setup
1. **Serve with any web server**
```bash
cd frontend
# Using Python
python -m http.server 8000
# Or using Node.js
npx serve .
```

## 📱 Usage

### Getting Started
1. **Sign Up** - Create a new account on the signup page
2. **Login** - Use your credentials to access the dashboard
3. **Upload Songs** - Go to Upload page and add your music files
4. **Create Playlists** - Organize your music into custom playlists
5. **Play Music** - Use the built-in player with visualizer

### Features Guide

#### Music Player
- **Play/Pause** - Click the play button or use spacebar
- **Navigation** - Previous/Next buttons or arrow keys
- **Volume Control** - Adjust volume with the slider
- **Progress Bar** - Click to seek to any position
- **Visualizer** - Real-time audio visualization

#### Playlist Management
- **Create Playlist** - Click "Create Playlist" button
- **Add Songs** - Drag and drop or use add buttons
- **Manage** - Edit, delete, or reorder playlists

#### Search & Filter
- **Global Search** - Search across all songs, artists, and albums
- **Real-time Results** - Instant filtering as you type
- **Multiple Criteria** - Search by title, artist, or album

## 🏗️ Architecture

### Frontend Stack
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and gradients
- **JavaScript (ES6+)** - Interactive functionality and API calls
- **Web Audio API** - Audio visualization and processing

### Backend Stack
- **Spring Boot 3.1** - Main framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **JWT** - Token-based authentication
- **MySQL** - Primary database
- **Maven** - Dependency management

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Frontend web server and reverse proxy

## 📁 Project Structure

```
music-library-organizer/
├── frontend/
│   ├── css/
│   │   ├── style.css          # Login/Signup styles
│   │   └── dashboard.css      # Dashboard and player styles
│   ├── js/
│   │   ├── auth.js           # Authentication logic
│   │   ├── dashboard.js      # Main dashboard functionality
│   │   ├── player.js         # Music player controls
│   │   └── visualizer.js     # Audio visualization
│   ├── assets/               # Images and audio files
│   ├── index.html           # Login page
│   ├── signup.html          # Registration page
│   ├── dashboard.html       # Main application
│   └── Dockerfile
├── backend/
│   ├── src/main/java/com/musiclibrary/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access layer
│   │   ├── model/          # JPA entities
│   │   ├── dto/            # Data transfer objects
│   │   ├── security/       # Security configuration
│   │   └── config/         # Application configuration
│   ├── src/main/resources/
│   │   └── application.yml  # Spring configuration
│   ├── pom.xml             # Maven dependencies
│   └── Dockerfile
├── database/
│   └── init.sql            # Database initialization
├── docker-compose.yml      # Multi-container setup
└── README.md
```

## 🎨 Design Features

### Color Scheme
- **Primary Gradient** - Blue to purple (#667eea to #764ba2)
- **Accent Colors** - Coral (#ff6b6b) and Teal (#4ecdc4)
- **Background** - Dynamic gradients with glassmorphism effects

### Animations
- **Page Transitions** - Smooth fade-in effects
- **Button Interactions** - Hover animations with shadows
- **Music Visualizer** - Real-time audio-reactive graphics
- **Loading States** - Elegant loading animations

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Flexible Layouts** - CSS Grid and Flexbox
- **Touch-Friendly** - Large buttons and touch targets

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Songs
- `GET /api/songs` - Get user's songs
- `POST /api/songs/upload` - Upload new song
- `GET /api/songs/{id}/stream` - Stream song file
- `DELETE /api/songs/{id}` - Delete song

### Playlists
- `GET /api/playlists` - Get user's playlists
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/{id}` - Update playlist
- `DELETE /api/playlists/{id}` - Delete playlist

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Encryption** - BCrypt password hashing
- **CORS Configuration** - Cross-origin request handling
- **Input Validation** - Server-side validation for all inputs
- **File Upload Security** - File type and size validation

## 🚀 Deployment

### Docker Deployment
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Production Deployment
1. **Environment Variables** - Set production database credentials
2. **SSL Certificate** - Configure HTTPS for production
3. **File Storage** - Use cloud storage for uploaded files
4. **Database** - Use managed database service
5. **Monitoring** - Add logging and monitoring tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎵 Acknowledgments

- Inspired by modern music streaming applications
- Uses Web Audio API for visualization
- Built with Spring Boot and modern web technologies
- Designed with user experience in mind

---

**Enjoy organizing and playing your music! 🎶**