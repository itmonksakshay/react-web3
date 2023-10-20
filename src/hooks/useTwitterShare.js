import axios from "axios";
import html2canvas from "html2canvas";
import { useCallback, useState } from "react";
import { isMobileDevice, openNewTab } from "src/utils/helpers";
import * as Sentry from "@sentry/react";

export function useTwitterShare() {
  const [isLoading, setIsLoading] = useState(false);

  const twitterShare = useCallback(
    ({ chartDOM, tweetText, data, portfolioId } = {}) => {
      setIsLoading(true);
      setTimeout(() => {
        html2canvas(chartDOM).then((chartCanvas) => {
          const chartImageData = chartCanvas.toDataURL();

          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/image/upload`, {
              chart_image: chartImageData,
              portfolio_id: portfolioId,
              data,
            })
            .then((response) => {
              const tweetImageUrl = `${process.env.REACT_APP_ORIGIN}/i/${response.data}`;
              const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                tweetText
              )}&url=${encodeURIComponent(tweetImageUrl)}`;
              if (isMobileDevice()) openNewTab(tweetUrl);
              else window.open(tweetUrl, "Twitter Share", "popup");
              setIsLoading(false);
            })
            .catch((error) => {
              Sentry.captureException(error);
            });
        });
      }, 0);
    },
    []
  );
  return { isLoading, twitterShare };
}
