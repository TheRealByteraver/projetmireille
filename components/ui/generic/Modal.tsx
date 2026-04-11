import { classNames } from '@/utils/classNames';
import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  fullSize?: boolean;
  children: React.ReactNode;
  closeModal?: () => void;
  closeOnOutsideClick?: boolean;
};

const Modal = (props: Props): React.JSX.Element | null => {
  // PROPS
  const { isOpen, children, fullSize = false, closeModal, closeOnOutsideClick = true } = props;

  // REFS – so we can move focus into the modal when it opens
  const contentRef = useRef<HTMLDivElement>(null);

  // EFFECTS
  useEffect(() => {
    if (isOpen) contentRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        'absolute z-11 flex h-full w-full flex-col items-center justify-center bg-black/50 p-4 sm:p-8',
        // 'overflow-hidden overscroll-contain',
        // fullSize ? 'h-full w-full' : '',
      )}
      onClick={closeOnOutsideClick ? closeModal : undefined}
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
  );
};

export default Modal;
