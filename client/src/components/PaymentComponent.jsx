import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api';

export default function PaymentComponent() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleQuickAmount = (amt) => {
    setAmount(amt.toString());
  };

  const openRazorpay = async () => {
    if (!amount || amount < 1) {
      setMessage('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Create order
      const orderData = await api('/payments/create-order', {
        method: 'POST',
        data: {
          amount: parseInt(amount),
          donorName,
          donorEmail,
          donorPhone,
          notes
        }
      });

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Sarva Manav Seva Trust",
        description: "Online Donation",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            await api('/payments/verify-payment', {
              method: 'POST',
              data: response
            });

            setMessage('Thank you! Your donation was successful. You will receive a confirmation email shortly.');
            setAmount('');
            setDonorName('');
            setDonorEmail('');
            setDonorPhone('');
            setNotes('');
          } catch (error) {
            setMessage(`Payment verification failed: ${error.message}`);
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone
        },
        notes: {
          purpose: notes || 'General donation'
        },
        theme: {
          color: "#ff9800"
        },
        modal: {
          ondismiss: function() {
            setMessage('Payment was cancelled');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setMessage(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{t('donate.online_heading')}</h3>
      <p>{t('donate.online_info')}</p>

      {/* Quick amount buttons */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
          {t('donate.quick_amounts')}
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quickAmounts.map(amt => (
            <button
              key={amt}
              type="button"
              className={amount === amt.toString() ? 'control-btn' : 'control-ghost'}
              onClick={() => handleQuickAmount(amt)}
              style={{ minWidth: '80px' }}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount input */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
          {t('donate.amount_label')}
        </label>
        <input
          type="number"
          className="input"
          placeholder={t('donate.custom_amount')}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          style={{ width: '100%' }}
        />
      </div>

      {/* Donor details */}
      <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
        <input
          type="text"
          className="input"
          placeholder={t('donate.donor_name')}
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder={t('donate.donor_email')}
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
        />
        <input
          type="tel"
          className="input"
          placeholder={t('donate.donor_phone')}
          value={donorPhone}
          onChange={(e) => setDonorPhone(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder={t('donate.donation_purpose')}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Donate button */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <button
          className="control-btn"
          onClick={openRazorpay}
          disabled={loading || !amount}
          style={{ minWidth: '150px' }}
        >
          {loading ? 'Processing...' : `${t('donate.donate_button')} ₹${amount || '0'}`}
        </button>
      </div>

      {/* Status message */}
      {message && (
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: message.includes('successful') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: message.includes('successful') ? '#22c55e' : '#ef4444',
          fontWeight: 600,
          marginTop: '16px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}