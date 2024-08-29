import { useEffect, useRef } from 'react';
import 'preline/preline';

import './index.css';

import { generateUsername } from 'unique-username-generator';

import { Chat } from '~components/Flow';
import { Message, IMessageProps, User } from '~core';
import { useChat } from '~hooks';
import { MqttManager, generateMqttClientId } from '~mqttManager';

const TOPIC = '5d81d305-8c1e-49ff-8905-34fcc2269440';
const BROKER_URL = 'ws://broker.mqttdashboard.com:8000/mqtt';

function App() {
  const user = useRef(User.new({ username: generateUsername('', 0, 15) }));
  const { messages, addMessage } = useChat();

  useEffect(() => {
    window?.HSStaticMethods?.autoInit();
    MqttManager.connect(
      BROKER_URL,
      {
        clientId: generateMqttClientId(),
        keepalive: 60,
      },
      () => {
        MqttManager.subscribe(TOPIC, { qos: 2 });
      },
    );
  }, []);

  useEffect(() => {
    MqttManager.onMessageArrived((message) => {
      const detail = (message as Event & { detail: IMessageProps }).detail;

      if (detail?.user?.id === user.current.id.value) return;

      addMessage(Message.new(detail), false);
    });

    return () => {
      MqttManager.offMessageArrived();
    };
  }, [addMessage]);

  return (
    <main className="container mx-auto max-w-2xl my-6">
      <Chat.Root
        messages={messages}
        addMessage={addMessage}
        user={user.current}
      />
    </main>
  );
}

export default App;
