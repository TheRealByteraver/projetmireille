type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = (props: Props): React.JSX.Element => {
  // PROPS
  const { isOpen, children } = props;

  return (
    <>
      {isOpen && (
        <div className="absolute z-11 h-screen w-screen bg-black/50 p-8">
          <div className="h-full w-full rounded-md bg-white">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
