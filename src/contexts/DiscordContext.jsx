import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { isMobileDevice } from "src/utils/helpers";

const DiscordContext = createContext();
DiscordContext.displayName = "Discord Context";

function DiscordProvider({ children }) {
  const [discordUser, setDiscordUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tokenRef = useRef(null);
  const location = useLocation();

  const getUserDetails = useCallback(async (accessToken, tokenType) => {
    try {
      setIsLoading(true);
      setDiscordUser(null);
      let [response1, response2] = await Promise.all([
        axios.get("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        }),
        axios.get("https://discord.com/api/users/@me/guilds", {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        }),
      ]);
      const {
        id,
        username,
        discriminator,
        avatar: avatarHash,
        email,
      } = response1.data;
      const guilds = response2.data;

      setIsLoading(false);
      setDiscordUser({
        id,
        username: username + "#" + discriminator,
        email,
        imageUrl: `https://cdn.discordapp.com/avatars/${id}/${avatarHash}.png`,
        joined: Boolean(
          guilds.find(
            (guild) => guild.id === process.env.REACT_APP_1CC_GUILD_ID
          )
        ),
      });
    } catch {
      console.log("error getting user");
    }
  }, []);

  useEffect(() => {
    if (!isMobileDevice()) return;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
    if (accessToken && tokenType) getUserDetails(accessToken, tokenType);
  }, [getUserDetails, location]);

  const retryDiscord = useCallback(() => {
    const { tokenType, accessToken } = tokenRef.current;

    axios
      .get("https://discord.com/api/users/@me/guilds", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        const guilds = response.data;
        setDiscordUser((user) => ({
          ...user,
          joined: Boolean(
            guilds.find(
              (guild) => guild.id === process.env.REACT_APP_1CC_GUILD_ID
            )
          ),
        }));
      });
  }, []);

  const connectDiscord = useCallback(() => {
    if (isMobileDevice()) {
      window.location.href = process.env.REACT_APP_DISCORD_AUTH_LINK_MOBILE;
    } else {
      let popup;
      popup = window.open(
        process.env.REACT_APP_DISCORD_AUTH_LINK,
        "Discord OAuth2",
        "popup"
      );
      const interval = setInterval(() => {
        popup.postMessage("", process.env.REACT_APP_ORIGIN); // Replace * with your origin
      }, 500);

      window.addEventListener(
        "message",
        (event) => {
          if (event.data.accessToken) {
            clearInterval(interval);
            popup.close();

            tokenRef.current = {
              accessToken: event.data.accessToken,
              tokenType: event.data.tokenType,
            };
            getUserDetails(event.data.accessToken, event.data.tokenType);
          }
        },
        false
      );
    }
  }, [getUserDetails]);

  const value = useMemo(
    () => ({
      discordUser,
      isLoading,
      retryDiscord,
      connectDiscord,
    }),
    [discordUser, isLoading, retryDiscord, connectDiscord]
  );

  return (
    <DiscordContext.Provider value={value}>{children}</DiscordContext.Provider>
  );
}

const useDiscord = () => {
  const value = useContext(DiscordContext);
  if (!value)
    throw new Error("useDiscord hook must be used within DiscordProvider");
  return value;
};

export { useDiscord, DiscordProvider };
