import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import WeatherCard from "../components/WeatherCard";

import { farmer, plots } from "../data/mockData";

import { getWeatherForecast } from "../services/weatherApi";
import { calculateIrrigationDate } from "../services/irrigationCalculator";

import "./Dashboard.css";


export default function Dashboard({ onMenuClick }) {

  // --------------------------------------------------
  // Basic dashboard statistics
  // --------------------------------------------------

  const criticalPlots =
    plots.filter(
      (p) => p.status === "Critical"
    ).length;


  const avgMoisture = Math.round(
    plots.reduce(
      (sum, p) => sum + p.soilMoisture,
      0
    ) / plots.length
  );


  // --------------------------------------------------
  // Dynamic irrigation predictions
  // --------------------------------------------------

  const [predictions, setPredictions] =
    useState({});


  const [loadingPredictions, setLoadingPredictions] =
    useState(true);


  // --------------------------------------------------
  // Pump timings
  //
  // These are the preferred pump operating times.
  // The DATE will be calculated dynamically.
  // --------------------------------------------------

  const pumpTimes = {

    "River Side Plot": "6:00 PM",

    "South Boundary Field": "8:00 PM",

    "North Field": "7:00 AM",

  };


  // --------------------------------------------------
  // Convert location string into coordinates
  //
  // Example:
  // "17.28°N, 74.19°E"
  // --------------------------------------------------

  function getCoordinates(location) {

    const match = location.match(
      /(-?\d+(?:\.\d+)?)°?([NS]),?\s*(-?\d+(?:\.\d+)?)°?([EW])/i
    );


    if (!match) {

      throw new Error(
        `Invalid coordinates for ${location}`
      );

    }


    let latitude =
      parseFloat(match[1]);


    let longitude =
      parseFloat(match[3]);


    const latitudeDirection =
      match[2].toUpperCase();


    const longitudeDirection =
      match[4].toUpperCase();


    if (latitudeDirection === "S") {
      latitude = -latitude;
    }


    if (longitudeDirection === "W") {
      longitude = -longitude;
    }


    return {
      latitude,
      longitude,
    };

  }


  // --------------------------------------------------
  // Format date
  //
  // Example:
  // 31 Aug 2026
  // --------------------------------------------------

  function formatDate(date) {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  }


  // --------------------------------------------------
  // Get dynamic irrigation predictions for ALL plots
  // --------------------------------------------------

  useEffect(() => {

    async function loadPredictions() {

      try {

        setLoadingPredictions(true);


        const results = {};


        // Fetch weather for every plot
        await Promise.all(

          plots.map(async (plot) => {

            const {
              latitude,
              longitude,
            } = getCoordinates(
              plot.location
            );


            // Get live weather
            const weatherData =
              await getWeatherForecast(
                latitude,
                longitude
              );


            // Calculate irrigation date
            const prediction =
              calculateIrrigationDate(
                plot,
                weatherData
              );


            results[plot.id] =
              prediction;

          })

        );


        setPredictions(results);


      } catch (error) {

        console.error(
          "Dashboard prediction error:",
          error
        );

      } finally {

        setLoadingPredictions(false);

      }

    }


    loadPredictions();

  }, []);


  // --------------------------------------------------
  // Find the critical plot
  // --------------------------------------------------

  const urgentPlot =
    plots.find(
      (p) => p.status === "Critical"
    ) || plots[0];


  const urgentPrediction =
    predictions[urgentPlot.id];


  // --------------------------------------------------
  // Dynamic pump schedule
  // --------------------------------------------------

  const pumpPlots = [

    "River Side Plot",

    "South Boundary Field",

    "North Field",

  ];


  const dynamicPumpSchedule =
    pumpPlots.map((plotName) => {

      const plot =
        plots.find(
          (p) => p.name === plotName
        );


      const prediction =
        plot
          ? predictions[plot.id]
          : null;


      return {

        plot: plotName,

        date: prediction
          ? formatDate(prediction.date)
          : "Calculating...",

        time:
          pumpTimes[plotName],

        duration:
          plotName === "South Boundary Field"
            ? "60 min"
            : plotName === "River Side Plot"
              ? "45 min"
              : "30 min",

        status:
          prediction &&
          prediction.date
            ? "Scheduled"
            : "Calculating",

      };

    });


  return (

    <>

      {/* ------------------------------------------
          TOP BAR
      ------------------------------------------ */}

      <Topbar

        title={
          `Welcome back, ${
            farmer.name.split(" ")[0]
          }`
        }

        subtitle="Here's your complete sugarcane farm overview for today"

        onMenuClick={onMenuClick}

      />


      <div className="page-content">


        {/* ------------------------------------------
            KPI ROW
        ------------------------------------------ */}

        <div className="stat-grid">


          <StatCard

            icon="🌾"

            label="Total Plots"

            value={farmer.totalPlots}

            sub={
              `${farmer.totalArea} acres total`
            }

            tone="primary"

          />


          <StatCard

            icon="💧"

            label="Avg. Soil Moisture"

            value={`${avgMoisture}%`}

            sub="Across all plots"

            tone="water"

          />


          <StatCard

            icon="🚨"

            label="Plots Needing Water"

            value={criticalPlots}

            sub="Action needed today"

            tone="danger"

          />


          <StatCard

            icon="⚙️"

            label="Pumps Scheduled"

            value={dynamicPumpSchedule.length}

            sub="Next 3 days"

            tone="warning"

          />

        </div>


        {/* ------------------------------------------
            MOST URGENT RECOMMENDATION
        ------------------------------------------ */}

        <div className="card highlight-card">


          <div className="highlight-card-header">


            <div>

              <p className="highlight-card-eyebrow">

                🔔 Most Urgent Recommendation

              </p>


              <h3>
                {urgentPlot.name}
              </h3>

            </div>


            <span className="badge badge-critical">

              {urgentPlot.status}

            </span>


          </div>


          {/* Dynamic reason */}

          <p className="highlight-card-text">

            {loadingPredictions

              ? "Calculating irrigation recommendation..."

              : urgentPrediction
                ? urgentPrediction.reason
                : "Unable to calculate recommendation."

            }

          </p>


          {/* --------------------------------------
              Dynamic prediction information
          --------------------------------------- */}

          <div className="highlight-card-stats">


            <div>

              <p className="highlight-label">

                Next Irrigation

              </p>


              <p className="highlight-value">

                {loadingPredictions

                  ? "Calculating..."

                  : urgentPrediction
                    ? formatDate(
                        urgentPrediction.date
                      )
                    : "--"

                }

              </p>

            </div>


            <div>

              <p className="highlight-label">

                Water Required

              </p>


              <p className="highlight-value">

                {loadingPredictions

                  ? "--"

                  : urgentPrediction
                    ? urgentPrediction.waterRequired
                    : "--"

                }

              </p>

            </div>


            <div>

              <p className="highlight-label">

                AI Confidence

              </p>


              <p className="highlight-value">

                {loadingPredictions

                  ? "--"

                  : urgentPrediction
                    ? `${urgentPrediction.confidence}%`
                    : "--"

                }

              </p>

            </div>


          </div>


          <Link

            to="/irrigation-prediction"

            className="highlight-card-btn"

          >

            View Full Prediction →

          </Link>


        </div>


        {/* ------------------------------------------
            WEATHER + PUMP SCHEDULE
        ------------------------------------------ */}

        <div className="dashboard-grid">


          {/* ----------------------------------------
              PUMP SCHEDULE
          ----------------------------------------- */}

          <div className="card pump-card">


            <h3
              className="section-title"
              style={{
                marginBottom: 12
              }}
            >

              ⚙️ Pump Schedule

            </h3>


            <table className="pump-table">


              <thead>

                <tr>

                  <th>
                    Plot
                  </th>

                  <th>
                    Date & Time
                  </th>

                  <th>
                    Duration
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {dynamicPumpSchedule.map(
                  (p, i) => (

                    <tr key={i}>


                      <td>
                        {p.plot}
                      </td>


                      <td>

                        <strong>
                          {p.date}
                        </strong>

                        <br />

                        <span
                          style={{
                            fontSize:
                              "0.9rem",
                            opacity: 0.75,
                          }}
                        >
                          {p.time}
                        </span>

                      </td>


                      <td>
                        {p.duration}
                      </td>


                      <td>

                        <span
                          className={
                            p.status ===
                            "Scheduled"
                              ? "badge badge-info"
                              : "badge"
                          }
                        >

                          {p.status}

                        </span>

                      </td>


                    </tr>

                  )
                )}

              </tbody>


            </table>


          </div>


          {/* ----------------------------------------
              WEATHER
          ----------------------------------------- */}

          <WeatherCard />


        </div>


      </div>

    </>

  );

}