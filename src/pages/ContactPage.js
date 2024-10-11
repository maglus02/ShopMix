import { useState } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.fullName.length < 3) newErrors.fullName = 'Full name must be at least 3 characters long';
    if (formData.subject.length < 3) newErrors.subject = 'Subject must be at least 3 characters long';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.body.length < 3) newErrors.body = 'Message must be at least 3 characters long';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form Data:', formData);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <input
          className={styles.inputField}
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}

        <input
          className={styles.inputField}
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <p className={styles.errorText}>{errors.subject}</p>}

        <input
          className={styles.inputField}
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <textarea
          className={styles.inputField}
          name="body"
          placeholder="Message"
          value={formData.body}
          onChange={handleChange}
        />
        {errors.body && <p className={styles.errorText}>{errors.body}</p>}

        <button className={styles.sendMsg} type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
