import { ImageCard, Input } from '@/components';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;
  prompt: string;
  photo: string;
}

const RenderCards = ({ data, title }: { data: Post[]; title: string }) => {
  if (data?.length > 0) {
    return data.map((post) => <ImageCard key={post._id} {...post} />);
  }

  return (
    <h2 className='mt-5 font-bold text-white text-xl uppercase'>{title}</h2>
  );
};

const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchPosts();
  }, []);

  console.log(allPosts);

  return (
    <section className='max-w-7xl mx-auto '>
      <div className='absolute inset-0 -z-20 home-bg'></div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/75 to-black/25 -z-10'></div>

      <div>
        <h1 className='font-extrabold text-white text-[32px]'>
          The Future AI Graphics Generator
        </h1>
        <p className='mt-2 text-white/30 text-[16px] max-w-[500px]'>
          Unleash Your Creativity: Generate Images in Seconds
        </p>
      </div>

      <div className='mt-16'>
        <Input
          type='text'
          placeholder='Text'
          color='#FFFF'
          className='text-white'
        />
      </div>

      <div className='mt-10'>
        {searchText && (
          <h2 className='font-medium text-white text-xl mb-3'>
            Showing results of{' '}
            <span className='text-[#ebeae8]'>{searchText}</span>
          </h2>
        )}

        <div className='grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-3'>
          {searchText ? (
            <RenderCards data={[]} title='No search results found' />
          ) : (
            <RenderCards data={allPosts} title='No posts found' />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
