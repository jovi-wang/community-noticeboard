import React from 'react';
import { IAlert } from '../types/interfaces';

type Props = {
  alerts: IAlert[];
};
const Alert: React.FC<Props> = ({ alerts }) => {
  return (
    <div className='alert-wrapper'>
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

export default Alert;
