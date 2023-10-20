/* eslint-disable jsx-a11y/anchor-is-valid */
export function ErrorBox({
  error,
  reset,
  scanning = false,
  hideErrorLabel = false,
  retry = true,
  className,
}) {
  if (!error) return null;

  return (
    <p className={`text-red-light dark:text-red-lighter2 ${className}`}>
      {scanning ? (
        <>
          Error 500: Looks like there was an error scanning your wallet.
          <br />
          {retry && (
            <>
              <a onClick={reset} className="underline cursor-pointer ml-[12px]">
                Click Here
              </a>{" "}
              to explore the demo portfolio.
            </>
          )}
        </>
      ) : (
        <>
          {!hideErrorLabel && "Error: "}
          {error}{" "}
          {reset && (
            <a onClick={reset} className="underline cursor-pointer ml-[12px]">
              Restart
            </a>
          )}
        </>
      )}
    </p>
  );
}
