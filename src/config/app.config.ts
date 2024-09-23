import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'app',
  appEnv: process.env.APP_ENV || 'dev',
  apiPrefix: process.env.API_PREFIX || 'api',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  frontendDomainURL: process.env.FRONTEND_DOMAIN_URL || '*',

  docApiV: process.env.DOC_API_V || 'v1',
  isDocApiEnabled: process.env.IS_DOC_ENABLED || true,
  docApiBaseUrl: process.env.DOC_API_BASEURL || 'doc/api',
  docApiTitle: process.env.DOC_API_TITLE || 'Api Doc Title',
  docApiDesc: process.env.DOC_API_DESC || 'Api Doc Description',

  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
}));
