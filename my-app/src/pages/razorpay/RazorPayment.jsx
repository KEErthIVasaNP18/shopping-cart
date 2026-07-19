import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./razorpay.css"

const RazorpayPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  const { isAuthenticated, user } = useSelector(state => state.auth);

  const [email, setEmail] = useState(isAuthenticated && user ? user.email : '');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [verified, setVerified] = useState(isAuthenticated);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);


    if (amount <= 0) {
      alert('Invalid amount');
      navigate('/');
    }
  }, [amount, navigate]);

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5500/sendOtp', { email });
      if (res.data.message === 'OTP sent successfully') {
        alert('OTP sent to your email');
        setOtpSent(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5500/verifyOtp', { email, otp: enteredOtp });
      if (res.data.message === 'OTP verified successfully') {
        alert('OTP verified');
        setVerified(true);
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verify error:', error);
      alert('OTP verification failed');
    }
  };

  const loadRazorpay = async () => {
    if (!verified) return alert("Please verify OTP first");

    try {
      const { data: order } = await axios.post('http://localhost:5500/create-order', { amount });

      const options = {
        key: 'rzp_test_uVn1nCMdkKJ7qH',
        amount: order.amount,
        currency: order.currency,
        name: 'Shoppiee',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          try {
            const res = await axios.post('http://localhost:5500/verify-payment', verifyData);
            if (res.data.message === 'Payment successful') {
              alert('Payment Successful!');
              navigate('/');
            } else {
              alert('Payment Failed!');
            }
          } catch (error) {
            alert('Verification Error');
            console.error(error);
          }
        },
        theme: { color: '#3399cc' },
        prefill: {
            email: email
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div className="payment-container">
      <h3>Confirm Payment</h3>
      <p>Total Amount: ₹{amount}</p>

      {isAuthenticated ? (
        <div className="auth-status-msg" style={{marginBottom: '20px', color: '#10B981', fontWeight: 'bold'}}>
          <p>Logged in as: {user?.email}</p>
          <p>Verification successful. You can proceed to payment.</p>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={verified}
          />

          {!verified && !otpSent && (
            <button className="btn-primary" onClick={sendOtp}>Send OTP</button>
          )}
          
          {!verified && otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <button className="btn-info" onClick={verifyOtp}>Verify OTP</button>
            </>
          )}
        </>
      )}

      <button className="btn-success" onClick={loadRazorpay} disabled={!verified}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
