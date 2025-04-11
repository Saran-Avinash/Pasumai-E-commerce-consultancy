"use client";

import React, { useEffect, useRef, useState } from 'react';

const LocationFormWithMap = () => {
  const [fullAddress, setFullAddress] = useState('');
  const [street, setStreet] = useState('');
  const [sublocality, setSublocality] = useState('');
  const [town, setTown] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const apiKey = 'AIzaSyCbbKxpKOG5sqmfvcNQhVXYc7UZmdqp1U8';

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();

      if (data.status !== "OK") {
        console.warn("Geocoding failed:", data.status);
        return '';
      }

      const result = data.results[0];
      const components = result.address_components;

      const getComponent = (type) =>
        components.find(c => c.types.includes(type))?.long_name || '';

      const streetName = getComponent("route");
      const subLocal = getComponent("sublocality") || getComponent("neighborhood") || getComponent("administrative_area_level_3");
      const townName = getComponent("locality");
      const districtName = getComponent("administrative_area_level_2");
      const pincode = getComponent("postal_code");
      const fullAddr = result.formatted_address;

      console.log("📍 Street:", streetName);
      console.log("🏘️ Sublocality:", subLocal);
      console.log("🏙️ Town:", townName);
      console.log("📌 District:", districtName);
      console.log("📮 Pincode:", pincode);
      console.log("🧾 Full Address:", fullAddr);

      if (!districtName.toLowerCase().includes("erode")) {
        alert("❌ Product can't be delivered outside Erode.");
      }

      // Set state
      setStreet(streetName);
      setSublocality(subLocal);
      setTown(townName);
      setDistrict(districtName);
      setPostalCode(pincode);
      setFullAddress(fullAddr);

      return townName;

    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      return '';
    }
  };

  const loadMap = (lat, lng) => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: 'Your Location',
    });
  };

  const loadMapScript = (callback) => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    } else {
      callback();
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
        loadMapScript(() => loadMap(latitude, longitude));
      },
      (err) => setError(err.message)
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Address Submitted: ${fullAddress}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Shipping Address</h2>
        {error && <p style={styles.error}>Location Error: {error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Street:</label>
          <input style={styles.input} value={street} readOnly />

          <label style={styles.label}>Sublocality:</label>
          <input style={styles.input} value={sublocality} readOnly />

          <label style={styles.label}>Town:</label>
          <input style={styles.input} value={town} readOnly />

          <label style={styles.label}>District:</label>
          <input style={styles.input} value={district} readOnly />

          <label style={styles.label}>Pincode:</label>
          <input style={styles.input} value={postalCode} readOnly />

          <label style={styles.label}>Full Address:</label>
          <textarea style={styles.input} value={fullAddress} rows={2} readOnly />

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>

      <div style={styles.mapBox}>
        <h2 style={styles.heading}>Your Location on Map</h2>
        <div ref={mapRef} style={styles.map}></div>
      </div>
    </div>
  );
};

export default LocationFormWithMap;

// Styles
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    justifyContent: 'center',
  },
  formBox: {
    flex: '1 1 300px',
    maxWidth: '400px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  mapBox: {
    flex: '1 1 400px',
    maxWidth: '500px',
  },
  map: {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
    border: '1px solid #ddd',
  },
};
