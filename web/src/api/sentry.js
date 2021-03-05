import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
const { SENTRY_DSN } = require('../config');

Sentry.init({
  Vue,
  dsn: SENTRY_DSN || '',
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});