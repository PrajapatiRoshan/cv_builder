import { config } from './app.config';

import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: config.Razorpay_KEY_ID,
  key_secret: config.Razorpay_KEY_SECRET,
});

