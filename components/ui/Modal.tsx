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
        <div className="absolute h-screen w-screen bg-black/50 p-8 z-11">
          <div className="h-full w-full bg-white rounded-md">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
