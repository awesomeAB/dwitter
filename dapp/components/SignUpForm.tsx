import Input from './Input';
import Button from './Button';
import { useState } from 'react';

type Props = {
  createUser: (
    username: string,
    name: string,
    bio: string,
    avatar: string
  ) => void;
};

const SignUpForm: React.FC<Props> = ({ createUser }) => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  const handleRegister = async () => {
    createUser(username, name, bio, avatar);
  };

  return (
    <div className="w-80">
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Pick your @username"
          value={username}
          setValue={setUsername}
        />
        <Input
          label="What do your friends call you?"
          value={name}
          setValue={setName}
        />
        <Input label="Bio" value={bio} setValue={setBio} />
        <Input label="Your avatar link?" value={avatar} setValue={setAvatar} />
        <div className="mt-4 flex items-center justify-center px-4">
          <Button label="Sign Up" onClick={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
