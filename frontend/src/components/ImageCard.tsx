import React from 'react';
import { CardContent } from './ui/card';

type Props = {
  prompt: string;
  photo: string;
};

const ImageCard = ({ prompt, photo }: Props) => {
  return (
    <CardContent>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
    </CardContent>
  );
};

export default ImageCard;
