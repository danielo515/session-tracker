import React from 'react';
import './ReloadPrompt.css';

import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@mui/material';
import { Close, Refresh } from '@mui/icons-material';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>New content available, click on reload button to update.</span>
            )}
          </div>
          {needRefresh && (
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </Button>
          )}
          <Button variant="outlined" startIcon={<Close />} onClick={() => close()}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReloadPrompt;
