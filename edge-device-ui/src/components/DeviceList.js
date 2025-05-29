import React, { useEffect, useState } from 'react';
import api from '../api';
import DeviceItem from './DeviceItem';
import DeviceForm from './DeviceForm';
import styles from './DeviceList.module.css';


const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/devices');
      setDevices(res.data);
    } catch {
      alert('Failed to load devices');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeviceAdded = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const handleDeviceUpdated = (updatedDevice) => {
    setDevices(devices.map(d => d.id === updatedDevice.id ? updatedDevice : d));
  };

  const handleDeviceDeleted = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  return (
    <div className={styles.deviceListContainer}>
      <h2 className={styles.heading}>Device List</h2>
      {loading ? (
        <p className={styles.loadingMessage}>Loading devices...</p>
      ) : (
        <div className={styles.deviceList}>
          {devices.map(device => (
            <DeviceItem
              key={device.id}
              device={device}
              onUpdate={handleDeviceUpdated}
              onDelete={handleDeviceDeleted}
            />
          ))}
        </div>
      )}

      <div className={styles.addDeviceSection}>
        <h3 className={styles.heading}>Add New Device</h3>
        <DeviceForm onDeviceAdded={handleDeviceAdded} />
      </div>
    </div>
  );
};

export default DeviceList;
