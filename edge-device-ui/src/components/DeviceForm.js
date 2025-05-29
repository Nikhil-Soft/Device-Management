import React, { useState } from 'react';
import api from '../api';
import styles from './DeviceForm.module.css';


const DeviceForm = ({ onDeviceAdded }) => {
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [status, setStatus] = useState('online');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/devices', {
        device: {
          name,
          ip_address: ipAddress,
          status,
          active: true,
        },
      });
      onDeviceAdded(res.data);
      setName('');
      setIpAddress('');
    } catch (err) {
      alert('Failed to add device');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        className={styles.input}
        placeholder="Device Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className={styles.input}
        placeholder="IP Address"
        value={ipAddress}
        onChange={e => setIpAddress(e.target.value)}
        required
      />
      <select
        className={styles.select}
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>
      <button type="submit" className={styles.submitButton}>
        Add Device
      </button>
    </form>
  );
};

export default DeviceForm;
