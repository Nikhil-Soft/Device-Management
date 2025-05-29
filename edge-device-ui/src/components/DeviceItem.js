import React from 'react';
import api from '../api';
import styles from './DeviceItem.module.css';


const DeviceItem = ({ device, onUpdate, onDelete }) => {
  const toggleActive = async () => {
    try {
      const res = await api.patch(`/devices/${device.id}`, {
        device: { active: !device.active },
      });
      onUpdate(res.data);
    } catch {
      alert('Failed to toggle device');
    }
  };

  const deleteDevice = async () => {
    try {
      await api.delete(`/devices/${device.id}`);
      onDelete(device.id);
    } catch {
      alert('Failed to delete device');
    }
  };

  return (
    <div className={styles.deviceCard}>
      <div className={styles.deviceInfo}>
        <p><strong>{device.name}</strong> - {device.ip_address}</p>
        <p>{device.status} | {device.active ? 'Active' : 'Inactive'}</p>
      </div>
      <div className={styles.actions}>
        <button
          className={device.active ? styles.deactivate : styles.activate}
          onClick={toggleActive}
        >
          {device.active ? 'Deactivate' : 'Activate'}
        </button>
        <button className={styles.delete} onClick={deleteDevice}>Delete</button>
      </div>
    </div>
  );
};

export default DeviceItem;