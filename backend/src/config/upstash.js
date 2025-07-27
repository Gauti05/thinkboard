const { Ratelimit } = require('@upstash/ratelimit');
// import { Redis } from "@upstash/redis";
const { Redis } = require('@upstash/redis')

// import dotenv from "dotenv";
const dotenv = require('dotenv');

dotenv.config();

// create a ratelimiter that allows 100 requests per minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

module.exports = ratelimit;