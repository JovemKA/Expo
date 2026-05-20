import { useEffect, useState } from 'react';

import { portfolioFallback, type PortfolioContent } from '@/services/data';
import { getPortfolioContent } from '@/services/portfolio';

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(portfolioFallback);

  useEffect(() => {
    let isMounted = true;

    void getPortfolioContent()
      .then((remoteContent) => {
        if (isMounted) {
          setContent(remoteContent);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContent(portfolioFallback);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    content,
    hasRemoteBackend: Boolean(
      process.env.EXPO_PUBLIC_BACK4APP_APPLICATION_ID && process.env.EXPO_PUBLIC_BACK4APP_JAVASCRIPT_KEY,
    ),
  };
}