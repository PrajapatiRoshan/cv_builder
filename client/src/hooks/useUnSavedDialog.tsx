import { useEffect } from 'react';

const useUnSavedDialog = (dialogShow: boolean) => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    if (dialogShow) {
      window.addEventListener('beforeunload', handler);
    }

    return () => window.removeEventListener('beforeunload', handler);
  }, [dialogShow]);
};

export default useUnSavedDialog;

