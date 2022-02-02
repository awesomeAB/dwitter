type Props = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="rounded-xl bg-blue-400 py-2 px-6 text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
