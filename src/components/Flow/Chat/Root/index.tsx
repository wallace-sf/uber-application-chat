import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';

import { Message as MessageUI } from '~/components/View/Message';
import { TextArea } from '~components/Control/TextArea';
import { Message } from '~core/message';

import { BUTTON_PROPS, INITIAL_VALUES } from './Constants';
import { IChatRootProps, IValues } from './Types';

export const Root: FC<IChatRootProps> = ({ addMessage, messages, user }) => {
  const sectionRef = useRef<HTMLTableSectionElement>(null);

  const scrollToBottom = useCallback(() => {
    if (sectionRef.current != null) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [sectionRef]);

  const renderedMessages = useMemo(() => {
    return messages.map((message) =>
      user?.id.value === message.user.id.value ? (
        <MessageUI.My key={message.id.value} message={message} />
      ) : (
        <MessageUI.Other key={message.id.value} message={message} />
      ),
    );
  }, [messages, user]);

  const onSubmit = useCallback(
    (values: IValues, { resetForm }: FormikHelpers<IValues>) => {
      addMessage(
        Message.new({ user: user.props, content: values.message }),
        true,
      );
      resetForm();
    },
    [addMessage, user.props],
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  return (
    <>
      <section
        ref={sectionRef}
        className="border rounded-xl shadow-sm p-6 h-160 overflow-y-auto  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <ul className="h-full space-y-5">{renderedMessages}</ul>
      </section>
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <fieldset className="w-full space-y-3 mt-6">
              <TextArea.WithSend
                id="message"
                value={values.message}
                maxLength={4096}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Type a message..."
                buttonProps={BUTTON_PROPS}
              />
            </fieldset>
          </Form>
        )}
      </Formik>
    </>
  );
};
