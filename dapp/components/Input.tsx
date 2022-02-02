type Props = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  setValue: (value: string) => void;
};

const Input: React.FC<Props> = ({
  label,
  value,
  setValue,
  placeholder = '',
  type = 'text',
}) => {
  return (
    <div>
      <label className="block">
        <span className="w-full text-gray-700">{label}</span>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default Input;
