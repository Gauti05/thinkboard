const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 20 * 1000, // 20 seconds
  max: 10,             // Limit each IP to 10 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
