import { farmer } from "../data/mockData";

import "./Topbar.css";


export default function Topbar({
  title,
  subtitle,
  onMenuClick
}) {

  // Get today's date from the user's computer
  const today = new Date();


  // Format today's date
  const formattedDate =
    today.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  return (

    <header className="topbar">


      <div className="topbar-left">

        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>


        <div>

          <h2 className="topbar-title">
            {title}
          </h2>


          {subtitle && (
            <p className="topbar-subtitle">
              {subtitle}
            </p>
          )}

        </div>

      </div>


      <div className="topbar-right">


        {/* Dynamic current date */}

        <span className="topbar-date">
          📅 {formattedDate}
        </span>


        <div className="topbar-user">


          <div className="topbar-avatar">
            👨‍🌾
          </div>


          <div>

            <p className="topbar-user-name">
              {farmer.name}
            </p>


            <p className="topbar-user-sub">
              {farmer.village}
            </p>

          </div>


        </div>


      </div>


    </header>

  );
}