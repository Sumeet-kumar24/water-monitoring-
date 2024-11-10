// script.js

// Sample devices for demonstration
const devices = [
    { id: 1, name: "Kitchen Faucet", status: "Active" },
    { id: 2, name: "Garden Sprinkler", status: "Inactive" },
    { id: 3, name: "Shower", status: "Active" }
  ];
  
  // Simulated water usage data
  let currentUsage = 0; // in L/min
  let totalUsage = 0; // in Liters
  
  // Initialize dashboard
  document.addEventListener("DOMContentLoaded", () => {
    loadDevices();
    startRealTimeMonitoring();
    renderUsageChart();
  });
  
  // Load device information
  function loadDevices() {
    const deviceContainer = document.getElementById("devices");
    devices.forEach(device => {
      const deviceItem = document.createElement("div");
      deviceItem.className = "device-item";
      deviceItem.innerHTML = `
        <span>${device.name}</span>
        <button onclick="toggleDeviceStatus(${device.id})">${device.status}</button>
      `;
      deviceContainer.appendChild(deviceItem);
    });
  }
  
  // Toggle device status
  function toggleDeviceStatus(deviceId) {
    const device = devices.find(d => d.id === deviceId);
    device.status = device.status === "Active" ? "Inactive" : "Active";
    loadDevices(); // Refresh device list
  }
  
  // Simulate real-time data monitoring
  function startRealTimeMonitoring() {
    setInterval(() => {
      currentUsage = Math.random() * 10; // Random usage between 0 and 10 L/min
      totalUsage += currentUsage / 60; // Increment total usage in Liters
  
      // Update UI
      document.getElementById("current-usage").textContent = currentUsage.toFixed(2);
      document.getElementById("total-usage").textContent = totalUsage.toFixed(2);
    }, 1000); // Update every second
  }
  
  // Render usage history chart
  function renderUsageChart() {
    const ctx = document.getElementById("usage-chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Simulating 24 hours
        datasets: [{
          label: "Water Usage (L)",
          data: Array.from({ length: 24 }, () => Math.random() * 50), // Random hourly data
          borderColor: "#007bff",
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Time" } },
          y: { title: { display: true, text: "Liters" } }
        }
      }
    });
  }
  