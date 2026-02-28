import Alert, { AlertType } from '@/components/ui/Alert';
import { useState } from 'react';

type AlertConfig = {
  message: string;
  alertType: AlertType;
};

type ReturnType = [React.JSX.Element | null, (alertConfig: AlertConfig) => void, () => void];

const useAlert = (): ReturnType => {
  // STATE
  const [alert, setAlert] = useState<AlertConfig | null>(null);

  return [
    alert ? <Alert message={alert?.message} alertType={alert?.alertType} /> : null,
    setAlert,
    () => setAlert(null),
  ];
};

export default useAlert;
