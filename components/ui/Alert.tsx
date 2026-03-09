import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { classNames } from '@/utils/classNames';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type Props = {
  alertType: AlertType;
  closeAlert: () => void;
  message: string | React.ReactNode;
};

const Alert = (props: Props): React.JSX.Element => {
  // PROPS
  const { message, alertType, closeAlert } = props;

  // VARS
  const colors: Record<typeof alertType, string> = {
    success: 'border-green-400 bg-green-50 text-green-800',
    error: 'border-red-400 bg-red-50 text-red-800',
    warning: 'border-yellow-400 bg-yellow-50 text-yellow-800',
    info: 'border-blue-400 bg-blue-50 text-blue-800',
  };

  const buttonColors: Record<typeof alertType, string> = {
    success: 'bg-green-50 text-green-500 hover:bg-green-100',
    error: 'bg-red-50 text-red-500 hover:bg-red-100',
    warning: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
    info: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
  };

  const icons: Record<typeof alertType, React.ReactNode> = {
    success: <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />,
    error: <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />,
    warning: <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />,
    info: <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />,
  };

  return (
    <div className={classNames('rounded-md border-l-4 p-4', colors[alertType])}>
      <div className="flex">
        <div className="shrink-0">{icons[alertType]}</div>
        <div className="ml-3">{message}</div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={classNames('inline-flex rounded-md p-1.5', buttonColors[alertType])}
              onClick={closeAlert}
            >
              <span className="sr-only">Fermer</span>
              <XMarkIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

export type { AlertType };
