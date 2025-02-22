import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { CreatePost, Home } from './pages';
import { Button } from './components';

function App() {
  return (
    <BrowserRouter>
      <header className='flex justify-between items-center sm:px-8 px-4 py-4 bg-transparent relative'>
        <Link to='/'>
          <h1 className='text-3xl font-black text-white'>IMAGIGEN</h1>
        </Link>

        <Link to='/create-post'>
          <Button variant='secondary'>Create</Button>
        </Link>
      </header>
      <main className='sm:px-8 px-4 py-8 min-h[calc(100vh - 73px)] w-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
