import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRandomPrompt } from '@/utils';
import FormField from '@/components/FormField';
import { preview } from '@/assets';
import { Button } from '@/components';

const CreatePost = () => {
  const navigate = useNavigate();

  const generateImage: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:3000/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: data.photo });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupriseMe: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto '>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>
          The Future AI Graphics Generator
        </h1>
        <p className='mt-2 text-white/30 text-[16px] max-w-[500px]'>
          Unleash Your Creativity: Generate Images in Seconds
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Prompt'
            isSupriseMe={true}
            handleSupriseMe={handleSupriseMe}
            handleChange={handleChange}
            value={form.prompt}
            placeHolder='A Viking longship sailing through a sea of stars.'
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
          </div>
          <div className='mt-5 flex gap-5'>
            <Button type='button' onClick={generateImage}>
              {generatingImg ? 'Generating' : 'Generate'}
            </Button>
          </div>

          <div className='mt-5'>
            <p className='mb-2 text-white/30 text-[16px] max-w-[500px]'>
              Share your creatings with the community
            </p>
            <Button type='submit' variant='destructive'>
              Share with the community
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
