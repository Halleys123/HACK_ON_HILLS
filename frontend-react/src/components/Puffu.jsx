import React, { useCallback, useEffect, useState } from 'react';

export default function AiAssistant() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleChat = useCallback(() => {
    const dfMessenger = document.querySelector('df-messenger');
    const chatEl = dfMessenger?.shadowRoot?.querySelector('df-messenger-chat');

    if (chatEl) {
      if (!isChatOpen) {
        chatEl.setAttribute('opened', '');
      } else {
        chatEl.removeAttribute('opened');
      }
      setIsChatOpen(!isChatOpen);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (!isInitialized) {
      const initializeChat = () => {
        const dfMessenger = document.querySelector('df-messenger');
        const puffuTrigger = document.getElementById('puffuTrigger');

        if (!dfMessenger || !puffuTrigger) return;

        puffuTrigger?.addEventListener('click', toggleChat);

        // Handle chat state
        const handleChatState = () => {
          const chatEl =
            dfMessenger?.shadowRoot?.querySelector('df-messenger-chat');
          if (chatEl) {
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (
                  mutation.type === 'attributes' &&
                  mutation.attributeName === 'opened'
                ) {
                  const isOpened = chatEl.hasAttribute('opened');
                  setIsChatOpen(isOpened);
                }
              });
            });

            observer.observe(chatEl, {
              attributes: true,
              attributeFilter: ['opened'],
            });
          }
        };

        // Hide default button and handle chat state
        const interval = setInterval(() => {
          const chatEl =
            dfMessenger?.shadowRoot?.querySelector('df-messenger-chat');
          const innerBtn = chatEl?.shadowRoot?.querySelector('button');

          if (innerBtn && chatEl) {
            innerBtn.style.display = 'none';
            handleChatState();
            clearInterval(interval);
          }
        }, 500);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChat);
      } else {
        initializeChat();
      }

      setIsInitialized(true);
    }
  }, [isInitialized, toggleChat]);

  return (
    <>
      {/* Dialogflow Messenger */}
      <div className='fixed bottom-4 right-4 z-[999]'>
        <df-messenger
          intent='WELCOME'
          chat-title='Puffu'
          agent-id='13ef68ef-44b4-4b57-9b96-e2ac94eade56'
          language-code='en'
          chat-icon='/images/puffu-end.png'
        ></df-messenger>
      </div>

      {/* Custom Puffu Button and Close Button Container */}
      <div className='fixed bottom-5 right-5 z-[1000] flex items-center gap-3'>
        {isChatOpen && (
          <button
            onClick={toggleChat}
            className='w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-lg'
            aria-label='Close Puffu Chat'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
        <button
          id='puffuTrigger'
          className='w-[60px] h-[60px] rounded-full bg-cover bg-center bg-no-repeat border-none cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg'
          style={{ backgroundImage: "url('/images/puffu-end.png')" }}
          aria-label='Open Puffu Chat'
        ></button>
      </div>

      {/* Styles for Dialogflow elements */}
      <style jsx global>{`
        df-messenger {
          --df-messenger-bot-message: #878787;
          --df-messenger-button-titlebar-color: #0f172a;
          --df-messenger-chat-background-color: #fafafa;
          --df-messenger-font-color: white;
          --df-messenger-send-icon: #0f172a;
          --df-messenger-user-message: #0f172a;
        }

        /* Hide default close button */
        df-messenger-chat::part(close-icon) {
          display: none !important;
        }

        /* Ensure chat wrapper remains visible */
        df-messenger-chat::part(chat-wrapper) {
          display: block !important;
        }
      `}</style>
    </>
  );
}
