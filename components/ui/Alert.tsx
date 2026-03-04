import { classNames } from '@/utils/classNames';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type Props = {
  message: string;
  alertType: AlertType;
  closeAlert: () => void;
};

const Alert = (props: Props): React.JSX.Element => {
  // PROPS
  const { message, alertType, closeAlert } = props;

  // VARS
  const colors: Record<typeof alertType, string> = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={classNames(colors[alertType], 'flex flex-row gap-2 rounded-md p-4')}>
      <div className="flex flex-1 self-end">{message}</div>
      <button
        className="self-start rounded-md border-2 px-2 py-0.5 font-bold hover:cursor-pointer hover:opacity-50"
        onClick={closeAlert}
      >
        x
      </button>
    </div>
  );
};

export default Alert;

export type { AlertType };
