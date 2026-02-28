import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = (props: Props): React.JSX.Element => {
  // PROPS
  const { isOpen, children } = props;

  // REFS – so we can move focus into the modal when it opens
  const contentRef = useRef<HTMLDivElement>(null);

  // EFFECTS
  useEffect(() => {
    if (isOpen) contentRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="absolute z-11 h-screen w-screen bg-black/50 p-4 sm:p-8">
          <div ref={contentRef} className="h-full w-full rounded-md bg-white" tabIndex={-1}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
