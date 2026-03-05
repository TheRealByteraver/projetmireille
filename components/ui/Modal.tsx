import { classNames } from '@/utils/classNames';
import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  fullSize?: boolean;
  children: React.ReactNode;
  closeModal?: () => void;
};

const Modal = (props: Props): React.JSX.Element => {
  // PROPS
  const { isOpen, children, fullSize = false, closeModal } = props;

  // REFS – so we can move focus into the modal when it opens
  const contentRef = useRef<HTMLDivElement>(null);

  // EFFECTS
  useEffect(() => {
    if (isOpen) contentRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={classNames(
            'absolute z-11 flex h-screen w-screen flex-col items-center justify-center bg-black/50 p-4 sm:p-8',
            fullSize ? 'h-screen w-screen' : '',
          )}
          onClick={closeModal}
        >
          <div
            ref={contentRef}
            className={classNames('rounded-md bg-white', fullSize ? 'h-full w-full' : '')}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
