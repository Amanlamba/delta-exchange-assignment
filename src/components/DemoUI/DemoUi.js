import React, { useEffect, useState } from 'react';

const SessionStorageWatcher = () => {
  const [btcLogs, setBtcLogs] = useState(() => sessionStorage.getItem('btc_ema_logs'));
  const [ethLogs, setEthLogs] = useState(() => sessionStorage.getItem('eth_ema_logs'));

  useEffect(() => {
    const interval = setInterval(() => {
      const newBtcLogs = sessionStorage.getItem('btc_ema_logs');
      const newEthLogs = sessionStorage.getItem('eth_ema_logs');

      if (newBtcLogs !== btcLogs) {
        setBtcLogs(newBtcLogs);
      }

      if (newEthLogs !== ethLogs) {
        setEthLogs(newEthLogs);
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [btcLogs, ethLogs]);

  return (
    <div>
      <h3>BTC EMA Logs</h3>
      <pre>{btcLogs || 'No BTC logs yet.'}</pre>

      <h3>ETH EMA Logs</h3>
      <pre>{ethLogs || 'No ETH logs yet.'}</pre>
    </div>
  );
};

export default SessionStorageWatcher;
