// Static / mock data for the Smart Sugarcane Irrigation Dashboard
// This is a college mini-project - all values below are sample data only.

export const farmer = {
  name: "Ramesh Patil",
  village: "Karad, Satara District",
  state: "Maharashtra",
  phone: "+91 98XXX XX210",
  totalPlots: 4,
  totalArea: 12.5, // acres
};

export const plots = [
  {
    id: "PLOT-01",
    name: "North Field",
    cropStage: "Tillering",
    soilType: "Black Cotton Soil",
    area: 3.2,
    location: "17.28°N, 74.19°E",
    soilMoisture: 62,
    status: "Healthy",
    lastIrrigated: "18 Aug 2026",
  },
  {
    id: "PLOT-02",
    name: "River Side Plot",
    cropStage: "Grand Growth",
    soilType: "Alluvial Soil",
    area: 4.0,
    location: "17.29°N, 74.21°E",
    soilMoisture: 38,
    status: "Needs Attention",
    lastIrrigated: "14 Aug 2026",
  },
  {
    id: "PLOT-03",
    name: "Well Plot",
    cropStage: "Germination",
    soilType: "Red Loamy Soil",
    area: 2.3,
    location: "17.27°N, 74.20°E",
    soilMoisture: 71,
    status: "Healthy",
    lastIrrigated: "19 Aug 2026",
  },
  {
    id: "PLOT-04",
    name: "South Boundary Field",
    cropStage: "Maturity",
    soilType: "Black Cotton Soil",
    area: 3.0,
    location: "17.26°N, 74.18°E",
    soilMoisture: 24,
    status: "Critical",
    lastIrrigated: "10 Aug 2026",
  },
];

export const weather = {
  location: "Karad, Satara",
  temperature: 29,
  condition: "Partly Cloudy",
  humidity: 68,
  rainfallChance: 30,
  windSpeed: 11, // km/h
  forecast: [
    { day: "Fri", temp: 29, condition: "Cloudy" },
    { day: "Sat", temp: 31, condition: "Sunny" },
    { day: "Sun", temp: 28, condition: "Rain" },
    { day: "Mon", temp: 27, condition: "Rain" },
    { day: "Tue", temp: 30, condition: "Sunny" },
  ],
};

export const irrigationPredictions = {
  "PLOT-01": {
    nextIrrigationDate: "24 Aug 2026",
    daysLeft: 3,
    confidence: 87,
    waterRequired: "38 mm",
    reason: "Soil moisture is adequate; light irrigation recommended before flowering stage.",
  },
  "PLOT-02": {
    nextIrrigationDate: "21 Aug 2026",
    daysLeft: 0,
    confidence: 92,
    waterRequired: "55 mm",
    reason: "Moisture dropping fast during grand growth stage - irrigate today for best yield.",
  },
  "PLOT-03": {
    nextIrrigationDate: "26 Aug 2026",
    daysLeft: 5,
    confidence: 81,
    waterRequired: "25 mm",
    reason: "Young crop; soil moisture is sufficient, next irrigation can wait.",
  },
  "PLOT-04": {
    nextIrrigationDate: "22 Aug 2026",
    daysLeft: 1,
    confidence: 95,
    waterRequired: "60 mm",
    reason: "Soil moisture critically low. Irrigate urgently to avoid yield loss.",
  },
};

export const advisories = [
  {
    id: 1,
    type: "Irrigation",
    icon: "💧",
    plot: "South Boundary Field",
    priority: "High",
    message_en: "Soil moisture is very low in South Boundary Field. Please irrigate within 1 day.",
    message_mr: "दक्षिण सीमेवरील शेतात जमिनीतील ओलावा खूप कमी आहे. कृपया १ दिवसात पाणी द्या.",
    time: "Today, 7:10 AM",
  },
  {
    id: 2,
    type: "Weather",
    icon: "🌦️",
    plot: "All Plots",
    priority: "Medium",
    message_en: "Rain expected on Sunday and Monday. You may delay irrigation for River Side Plot.",
    message_mr: "रविवार आणि सोमवारी पाऊस पडण्याची शक्यता आहे. रिव्हर साईड प्लॉटचे सिंचन पुढे ढकलू शकता.",
    time: "Today, 6:45 AM",
  },
  {
    id: 3,
    type: "Crop",
    icon: "🌱",
    plot: "North Field",
    priority: "Low",
    message_en: "Crop is in tillering stage. Apply recommended dose of nitrogen fertilizer this week.",
    message_mr: "पीक फुटवा अवस्थेत आहे. या आठवड्यात शिफारस केलेली नत्र खताची मात्रा द्या.",
    time: "Yesterday, 5:30 PM",
  },
  {
    id: 4,
    type: "Pump",
    icon: "⚙️",
    plot: "River Side Plot",
    priority: "Medium",
    message_en: "Pump scheduled to run automatically today at 6:00 PM for River Side Plot.",
    message_mr: "रिव्हर साईड प्लॉटसाठी आज संध्याकाळी ६:०० वाजता पंप आपोआप सुरू होईल.",
    time: "Yesterday, 4:00 PM",
  },
  {
    id: 5,
    type: "Crop",
    icon: "🌱",
    plot: "South Boundary Field",
    priority: "Low",
    message_en: "Crop nearing maturity. Plan harvest logistics for the next 3-4 weeks.",
    message_mr: "पीक परिपक्वतेच्या जवळ आहे. पुढील ३-४ आठवड्यांसाठी काढणीचे नियोजन करा.",
    time: "2 days ago",
  },
];

export const pumpSchedule = [
  { plot: "River Side Plot", time: "Today, 6:00 PM", duration: "45 min", status: "Scheduled" },
  { plot: "South Boundary Field", time: "Today, 8:00 PM", duration: "60 min", status: "Scheduled" },
  { plot: "North Field", time: "24 Aug, 7:00 AM", duration: "30 min", status: "Upcoming" },
];
