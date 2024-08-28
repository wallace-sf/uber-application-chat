import './index.css';

import { Message as MessageUI } from '~/components/View/Message';
import { Message } from '~core/message';

function App() {
  return (
    <>
      <ul className="space-y-5">
        {/* Chat */}
        <MessageUI.Other
          message={Message.new({
            user: { username: 'xama322' },
            sent_at: new Date().toISOString(),
            content: 'what&#39;s preline ui?',
          })}
        />
        <MessageUI.My
          message={Message.new({
            user: { username: 'xama322' },
            sent_at: new Date().toISOString(),
            content: 'what&#39;s preline ui?',
          })}
        />
      </ul>
    </>
  );
}

export default App;
