type TSendN8nNotificationParams = {
  message: string;
};

const sendN8nNotification = async ({ message }: TSendN8nNotificationParams): Promise<void> => {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('n8n notification skipped: missing N8N_WEBHOOK_URL');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => '');

      console.error('n8n notification failed', {
        status: response.status,
        statusText: response.statusText,
        responseText,
      });
    }
  } catch (error) {
    console.error('n8n notification error', error);
  }
};

export { sendN8nNotification };
