import Alert, { AlertType } from '@/components/ui/Alert';
import { useCallback, useState } from 'react';

type AlertProps = {
  message: string;
  alertType: AlertType;
};

type ReturnType = [React.JSX.Element | null, (alertProps: AlertProps) => void, () => void];

const useAlert = (): ReturnType => {
  // STATE
  const [alert, setAlert] = useState<AlertProps | null>(null);

  // METHODS
  const clearAlert = useCallback(() => setAlert(null), []);

  return [
    alert ? <Alert message={alert?.message} alertType={alert?.alertType} closeAlert={() => setAlert(null)} /> : null,
    setAlert,
    clearAlert,
  ];
};

export default useAlert;

export type { AlertProps };
