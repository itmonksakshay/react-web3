export function AssetBundle({ imageIds = [] }) {
  if (imageIds.length === 0) return null;
  if (imageIds.length === 1)
    return (
      <img
        src={`/images/assets/Logo-${imageIds[0]}.png`}
        alt="Asset"
        className="w-[24px] h-[24px] rounded-full border-2 border-white dark:border-grey-darker3 box-content"
      />
    );
  if (imageIds.length === 2 || imageIds.length >= 4)
    return (
      <div className="flex">
        {imageIds.map((imageId, i) => (
          <img
            key={imageId}
            src={`/images/assets/Logo-${imageId}.png`}
            alt="Asset"
            className="w-[24px] h-[24px] rounded-full border-2 border-white dark:border-grey-darker3 box-content"
            style={{
              zIndex: imageIds.length - 1 - i,
              marginLeft: i ? "-10px" : "0px",
            }}
          />
        ))}
      </div>
    );
  if (imageIds.length === 3)
    return (
      <div className="relative w-[42px] h-[42px]">
        <img
          src={`/images/assets/Logo-${imageIds[0]}.png`}
          alt="Asset"
          className="absolute left-0 top-0 w-[24px] h-[24px] rounded-full border-2 border-white dark:border-grey-darker3 box-content z-[2]"
        />
        <img
          src={`/images/assets/Logo-${imageIds[1]}.png`}
          alt="Asset"
          className="absolute right-0 top-0 w-[24px] h-[24px] rounded-full border-2 border-white dark:border-grey-darker3 box-content z-[1]"
        />
        <img
          src={`/images/assets/Logo-${imageIds[2]}.png`}
          alt="Asset"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[24px] h-[24px] rounded-full border-2 border-white dark:border-grey-darker3 box-content"
        />
      </div>
    );
  return <div>Hello</div>;
}
