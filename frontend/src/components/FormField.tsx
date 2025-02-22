import { MouseEventHandler } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type Props = {
  labelName?: string;
  type?: string;
  name?: string;
  placeHolder?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSupriseMe?: boolean;
  handleSupriseMe?: MouseEventHandler<HTMLButtonElement>;
};

const FormField = ({
  labelName,
  type,
  name,
  placeHolder,
  value,
  handleChange,
  isSupriseMe,
  handleSupriseMe,
}: Props) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-white'>
          {labelName}
        </label>
        {isSupriseMe && (
          <Button variant='secondary' onClick={handleSupriseMe}>
            Suprise me
          </Button>
        )}
      </div>
      <Input
        type={type}
        id={name}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        required
        color='#FFFF'
        className='text-white'
      />
    </div>
  );
};

export default FormField;
