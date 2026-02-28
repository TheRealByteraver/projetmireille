import { classNames } from '@/utils/classNames';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type Props = {
  message: string;
  alertType: AlertType;
};

const Alert = (props: Props): React.JSX.Element => {
  // PROPS
  const { message, alertType } = props;

  // VARS
  const types: Record<typeof alertType, string> = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return <div className={classNames(types[alertType], 'rounded-md p-4')}>{message}</div>;
};

export default Alert;

export type { AlertType };
