//THIS HOOK CAN BE USED TO DETECT NETWORK CONNECTIVITY OF USER

import { useState, useEffect } from 'react';

const useNetworkState = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
};

export default useNetworkState;
