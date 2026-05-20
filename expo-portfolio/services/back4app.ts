type ParseObject<T extends Record<string, unknown>> = T & {
  objectId: string;
  createdAt: string;
  updatedAt: string;
};

type ParseCollectionResponse<T extends Record<string, unknown>> = {
  results: ParseObject<T>[];
};

const DEFAULT_SERVER_URL = 'https://parseapi.back4app.com';

function getServerUrl() {
  return (process.env.EXPO_PUBLIC_BACK4APP_SERVER_URL ?? DEFAULT_SERVER_URL).replace(/\/$/, '');
}

function getApplicationId() {
  return process.env.EXPO_PUBLIC_BACK4APP_APPLICATION_ID?.trim();
}

function getJavaScriptKey() {
  return process.env.EXPO_PUBLIC_BACK4APP_JAVASCRIPT_KEY?.trim();
}

export function isBack4AppConfigured() {
  return Boolean(getApplicationId() && getJavaScriptKey());
}

function buildHeaders() {
  const applicationId = getApplicationId();
  const javascriptKey = getJavaScriptKey();

  if (!applicationId || !javascriptKey) {
    throw new Error('Back4App credentials are missing.');
  }

  return {
    'X-Parse-Application-Id': applicationId,
    'X-Parse-JavaScript-Key': javascriptKey,
    'Content-Type': 'application/json',
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  const bodyText = await response.text();

  if (!response.ok) {
    throw new Error(bodyText || `Back4App request failed with status ${response.status}.`);
  }

  return bodyText ? (JSON.parse(bodyText) as T) : ({} as T);
}

export async function findMany<T extends Record<string, unknown>>(
  className: string,
  options?: {
    limit?: number;
    order?: string;
    where?: Record<string, unknown>;
    keys?: string[];
  },
): Promise<ParseObject<T>[]> {
  const url = new URL(`${getServerUrl()}/classes/${className}`);

  if (options?.limit !== undefined) {
    url.searchParams.set('limit', String(options.limit));
  }

  if (options?.order) {
    url.searchParams.set('order', options.order);
  }

  if (options?.where) {
    url.searchParams.set('where', JSON.stringify(options.where));
  }

  if (options?.keys?.length) {
    url.searchParams.set('keys', options.keys.join(','));
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: buildHeaders(),
  });

  const payload = await parseResponse<ParseCollectionResponse<T>>(response);
  return payload.results;
}

export async function findFirst<T extends Record<string, unknown>>(
  className: string,
  options?: {
    order?: string;
    where?: Record<string, unknown>;
    keys?: string[];
  },
): Promise<ParseObject<T> | null> {
  const results = await findMany<T>(className, {
    ...options,
    limit: 1,
  });

  return results[0] ?? null;
}