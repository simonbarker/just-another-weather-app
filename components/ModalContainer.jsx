export const ModalContainer = ({ setShowModal, children }) => {
  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 p-6"
      onClick={(e) => {
        console.log(e.target, e.currentTarget);
        if (e.target === e.currentTarget) {
          setShowModal(false);
        }
      }}
    >
      {children}
    </div>
  );
};
