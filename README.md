# My Portfolio

## Contact Form (Direct Send With EmailJS)

This project supports direct email sending from the contact form using EmailJS (no custom backend server needed).

### 1. Create EmailJS account

1. Go to https://www.emailjs.com and create an account.
2. Add an Email Service (Gmail, Outlook, etc.).
3. Create an Email Template.

### 2. Template variables to add in EmailJS

Use these variables in your template body:

- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{to_email}}`

Example template body:

```text
You received a new portfolio message.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

### 3. Add your EmailJS IDs in code

Open [script.js](script.js) and update:

- `publicKey`
- `serviceId`
- `templateId`

Find this block:

```javascript
const EMAILJS_CONFIG = {
	publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
	serviceId: 'YOUR_EMAILJS_SERVICE_ID',
	templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
};
```

Replace placeholders with your real EmailJS values.

### 4. Test

1. Open the site in browser.
2. Fill the Contact form.
3. Click `Send Message`.
4. Check your inbox.

If sending fails, verify the EmailJS IDs and template variables.