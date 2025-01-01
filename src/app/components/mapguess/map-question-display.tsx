import ExpandableImage from "../global/expandable-img";

interface ImageProps{
  imageURL?: string
}

export default function MapQuestionDisplay(Props: ImageProps){
  const defaultImageUrl = "/image-missing.svg";

  const { imageURL=defaultImageUrl } = Props;

  return(
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex aspect-video w-10/12 bg-slate-100 rounded-lg items-center justify-center hover:shadow-custom-white">
        <ExpandableImage
          disableExpand={imageURL.valueOf() === defaultImageUrl.valueOf()}
          className="w-auto"
          priority={true}
          src={imageURL}
          alt=""
          width={1980}
          height={1080}
        />
      </div>
    </div>
  )
}