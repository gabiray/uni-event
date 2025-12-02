// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Importăm pentru navigare
import "../styles/Home.css";
import {
  FaThLarge,
  FaTicketAlt,
  FaHeart,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  // Funcția de delogare
  const handleLogout = () => {
    // Aici ai putea șterge datele utilizatorului dacă ai avea (ex: localStorage.clear())
    navigate("/"); // Te trimite înapoi la Login (AuthPage)
  };

  return (
    <div className="home-container">
      {/* 1. TOP NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">UniEvent</div>
        <div className="nav-links">
          <span>All Events</span>
          <span>Your Events</span>
          <span>Notifications</span>
          <div className="profile-section">
            <div className="avatar"></div>
            <div className="profile-info">
              <span className="greeting">Hello</span>
              <span className="username">Titi Conserva</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* 2. SIDEBAR MOV (Stânga) */}
        <aside className="sidebar">
          <div className="menu-icons">
            {/* Buton Dashboard */}
            <div className="icon-box active" title="Dashboard">
              <FaThLarge />
            </div>

            {/* Buton Creare Ticket */}
            <div className="icon-box" title="Creare Ticket">
              <FaTicketAlt />
            </div>

            {/* Buton Favorite */}
            <div className="icon-box" title="Favorite">
              <FaHeart />
            </div>
          </div>

          {/* Buton Logout (Funcțional) */}
          <div className="logout-icon" title="Logout" onClick={handleLogout}>
            <FaSignOutAlt />
          </div>
        </aside>

        {/* 3. ZONA CENTRALĂ (Carduri) */}
        <section className="feed-section">
          {/* Bara de Căutare */}
          <div className="search-bar">
            <input type="text" placeholder="Cauta" />
            <FaSearch className="search-icon" />
          </div>

          <div className="cards-grid">
            {/* Card 1 */}
            <div className="event-card">
              <div className="card-image"></div>
              <div className="card-content">
                <h3>
                  Inovație și Viitor în Educație – Conferință Universitară 2025
                </h3>
                <span className="author">Ionescu Marian</span>
                <p>
                  Evenimentul reunește studenți, profesori și invitați speciali
                  într-un cadru academic...
                </p>
                <div className="location">📍 Sala Senatului Universitar</div>
                <div className="card-footer">
                  <span className="date">20 Mai 2025 | 10:30</span>
                  <button className="btn-details">Detalii</button>
                </div>
              </div>
            </div>

            {/* Card 2 (Active/Border Blue) */}
            <div className="event-card active-card">
              <div className="card-image"></div>
              <div className="card-content">
                <h3>
                  Inovație și Viitor în Educație – Conferință Universitară 2025
                </h3>
                <span className="author">Ionescu Marian</span>
                <p>
                  Evenimentul reunește studenți, profesori și invitați speciali
                  într-un cadru academic...
                </p>
                <div className="location">📍 Sala Senatului Universitar</div>
                <div className="card-footer">
                  <span className="date">30 Mai 2025 | 10:30</span>
                  <button className="btn-details">Detalii</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FILTRE & CALENDAR (Dreapta) */}
        <aside className="filters-section">
          <div className="filters-header">
            <h3>Filtre</h3>
            <span className="close-filters">×</span>
          </div>

          {/* Calendar Simplificat */}
          <div className="calendar-widget">
            <h4>January</h4>
            <div className="calendar-grid">
              {/* Zile simulate */}
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
              <span className="fade">30</span>
              <span className="fade">31</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span>
              <span>19</span>
            </div>
          </div>

          <div className="filter-group">
            <label>Facultate ▾</label>
            <label>Departament ▾</label>
          </div>

          <div className="filter-category">
            <h4>Categorie</h4>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Social
              </label>
              <label>
                <input type="checkbox" /> Cultural
              </label>
              <label>
                <input type="checkbox" /> Academic
              </label>
              <label>
                <input type="checkbox" /> Sportiv
              </label>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-cancel">Anuleaza</button>
            <button className="btn-search">Cauta</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
