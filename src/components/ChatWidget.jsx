import { useEffect, useRef, useState } from 'react';
import { getAssistantReply, suggestedQuestions } from '../services/assistant';

const openingMessage = {
  role: 'assistant',
  text: 'Hello! I’m the PPSTU Virtual Assistant. Ask me about the case-study identity or choose a suggested question.',
};

export function ChatWidget({ onContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([openingMessage]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = (value = input) => {
    const text = value.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: getAssistantReply(text) },
    ]);
    setInput('');
    setShowSuggestions(false);
  };

  const restart = () => {
    setMessages([openingMessage]);
    setInput('');
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
          <header className="chat-panel__header">
            <div>
              <strong id="assistant-title">PPSTU Virtual Assistant</strong>
              <span>Case-study information assistant</span>
            </div>
            <div className="chat-panel__actions">
              <button onClick={restart} aria-label="Restart conversation" title="Restart conversation">↻</button>
              <button onClick={() => { setIsOpen(false); launcherRef.current?.focus(); }} aria-label="Close assistant">×</button>
            </div>
          </header>
          <div className="chat-panel__messages" ref={listRef} aria-live="polite" aria-relevant="additions text">
            {messages.map((message, index) => (
              <p className={`chat-message chat-message--${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
            {showSuggestions && (
              <div className="chat-suggestions" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button key={question} onClick={() => sendMessage(question)}>{question}</button>
                ))}
                <button className="chat-suggestions__contact" onClick={onContact}>Contact the team</button>
              </div>
            )}
            {!showSuggestions && (
              <button className="chat-contact-link" onClick={onContact}>Contact the team</button>
            )}
          </div>
          <form
            className="chat-panel__form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              aria-label="Ask a question"
              placeholder="Ask about the identity..."
              rows={1}
              maxLength={500}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button type="submit" disabled={!input.trim()} aria-label="Send message">Send</button>
          </form>
        </section>
      )}
      <button
        className="chat-launcher"
        ref={launcherRef}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close virtual assistant' : 'Open virtual assistant'}
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.15A2.5 2.5 0 0 1 4 13.5z" />
        </svg>
      </button>
    </div>
  );
}
