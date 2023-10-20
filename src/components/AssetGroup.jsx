export function AssetGroup({ imageIds = [] }) {
  if (imageIds.length === 0) return null;
  return (
    <div className="flex rounded-[27px] border-[1px] border-yellow-dark">
      {imageIds.map((imageId, i) => (
        <img
          key={imageId}
          src={`/images/assets/Logo-${imageId}.png`}
          alt="Asset"
          className="w-[54px] h-[54px] rounded-full"
          style={{
            zIndex: imageIds.length + 1 + i,
            marginLeft: i ? "-12px" : "0px",
          }}
        />
      ))}
    </div>
  );
}
