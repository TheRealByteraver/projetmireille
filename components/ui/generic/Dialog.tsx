'use client';

import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ButtonColors } from '@/types/frontend';
import Button from './Button';
import { classNames } from '@/utils/classNames';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  text: string;
  buttons: {
    label: string;
    value: string;
    color: ButtonColors;
  }[];
  onButtonClick: (value: string) => void;
};

const Dialog = (props: Props): React.JSX.Element => {
  // PROPS
  const { isOpen, title, text, buttons, onButtonClick, closeModal } = props;

  const handleCloseModal = () => {
    // setOpen(false);
    closeModal();
  };

  return (
    <HeadlessDialog open={isOpen} onClose={handleCloseModal} className="relative z-10">
      <DialogBackdrop
        transition
        className={classNames(
          'fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0',
          'data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in',
        )}
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={classNames(
              'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all',
              'data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out',
              'data-leave:duration-200 data-leave:ease-in',
              'sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95',
            )}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={classNames(
                    'flex shrink-0 items-center justify-center',
                    'mx-auto size-12 rounded-full bg-red-100 sm:mx-0 sm:size-10',
                  )}
                >
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="flex w-full justify-end gap-2">
                {buttons.map((button) => (
                  <Button key={button.value} color={button.color} onClick={() => onButtonClick(button.value)}>
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
