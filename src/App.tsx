import { useEffect, useRef } from 'react';
import 'preline/preline';

import './index.css';

import { Chat } from '~components/Flow';
import { User } from '~core';

function App() {
  const user = useRef(User.new({ username: 'xama322' }));

  useEffect(() => {
    window?.HSStaticMethods?.autoInit();
  }, []);

  return (
    <main className="container mx-auto max-w-2xl my-6">
      <Chat.Root user={user.current} />
    </main>
  );
}

export default App;
