import axios from "axios";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";

export function useProtocolOptions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [protocolOptions, setProtocolOptions] = useState([
    {
      value: "all",
      label: "All protocols",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/analysis/protocols`)
      .then((response) => {
        setIsLoading(true);
        setProtocolOptions([
          {
            value: "all",
            label: "All protocols",
          },
          ...response.data.map((item) => ({
            value: item.protocol_name,
            label: item.protocol_name,
            color: item.color,
            imageId: item.image_id,
          })),
        ]);
      })
      .catch((error) => {
        setError("Error");
        Sentry.captureException(error);
      });
  }, []);

  return { isLoading, error, protocolOptions };
}
