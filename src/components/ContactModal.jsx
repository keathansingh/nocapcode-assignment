import { useEffect, useRef, useState } from 'react';
import { submitContact } from '../services/api';

const initialValues = { name: '', email: '', subject: '', organization: '', message: '' };

function validateContact(values) {
  const errors = {};
  const required = ['name', 'email', 'subject', 'message'];
  required.forEach((field) => {
    if (!values[field].trim()) errors[field] = 'This field is required.';
  });
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  const limits = { name: 100, email: 254, subject: 160, organization: 160, message: 5000 };
  Object.entries(limits).forEach(([field, limit]) => {
    if (values[field].length > limit) errors[field] = `Use ${limit} characters or fewer.`;
  });
  return errors;
}

export function ContactModal({ onClose }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const firstInputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeButtonRef = useRef(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmittingRef.current) onClose();
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll('.contact-dialog button:not(:disabled), .contact-dialog input:not(:disabled), .contact-dialog textarea:not(:disabled)')];
        if (!controls.length) return;
        if (event.shiftKey && document.activeElement === controls[0]) {
          event.preventDefault();
          controls.at(-1).focus();
        } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
          event.preventDefault();
          controls[0].focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (status.state === 'success') closeButtonRef.current?.focus();
  }, [status.state]);

  const changeValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }));
    setStatus((current) => current.state === 'error' ? { state: 'idle', message: '' } : current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;
    const validationErrors = validateContact(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      setStatus({ state: 'error', message: 'Please correct the fields marked below.' });
      return;
    }

    isSubmittingRef.current = true;
    setStatus({ state: 'submitting', message: '' });
    try {
      await submitContact(Object.fromEntries(
        Object.entries(values).map(([field, value]) => [field, value.trim()]),
      ));
      setStatus({ state: 'success', message: 'Your message was saved successfully. Thank you for contacting the team.' });
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setErrors(error.fields ?? {});
      setStatus({ state: 'error', message: error.message });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  if (status.state === 'success') {
    return (
      <div className="contact-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button className="contact-dialog__close" onClick={onClose} ref={closeButtonRef} aria-label="Close contact form">×</button>
          <p className="eyebrow">CONTACT THE TEAM</p>
          <h2 id="contact-title">Message received.</h2>
          <p className="contact-success" role="status">{status.message}</p>
          <button className="contact-submit" onClick={onClose}>Done</button>
        </section>
      </div>
    );
  }

  const fieldError = (field) => errors[field] && <span className="contact-field__error" id={`${field}-error`}>{errors[field]}</span>;

  return (
    <div className="contact-backdrop" onMouseDown={(event) => event.target === event.currentTarget && status.state !== 'submitting' && onClose()}>
      <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button
          className="contact-dialog__close"
          onClick={onClose}
          ref={closeButtonRef}
          disabled={status.state === 'submitting'}
          aria-label="Close contact form"
        >
          ×
        </button>
        <p className="eyebrow">CONTACT THE TEAM</p>
        <h2 id="contact-title">Send a message.</h2>
        <p className="contact-dialog__intro">
          Share a question about the identity or this case study. Your message is saved by
          the site operator; do not include sensitive information.
        </p>
        {status.message && <p className={`contact-status contact-status--${status.state}`} role="alert">{status.message}</p>}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label className="contact-field">
            <span>Full name *</span>
            <input ref={firstInputRef} name="name" value={values.name} onChange={changeValue} maxLength={100} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {fieldError('name')}
          </label>
          <label className="contact-field">
            <span>Email address *</span>
            <input type="email" name="email" value={values.email} onChange={changeValue} maxLength={254} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {fieldError('email')}
          </label>
          <label className="contact-field">
            <span>Subject *</span>
            <input name="subject" value={values.subject} onChange={changeValue} maxLength={160} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />
            {fieldError('subject')}
          </label>
          <label className="contact-field">
            <span>Organization <span className="contact-field__optional">(optional)</span></span>
            <input name="organization" value={values.organization} onChange={changeValue} maxLength={160} autoComplete="organization" aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? 'organization-error' : undefined} />
            {fieldError('organization')}
          </label>
          <label className="contact-field contact-field--full">
            <span>Message *</span>
            <textarea name="message" value={values.message} onChange={changeValue} maxLength={5000} rows={4} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            {fieldError('message')}
          </label>
          <button className="contact-submit" type="submit" disabled={status.state === 'submitting'}>
            {status.state === 'submitting' ? 'Saving message…' : 'Send message'}
          </button>
        </form>
      </section>
    </div>
  );
}
