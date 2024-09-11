
const ImagenZoom = ({src, alt}) => {
  return (
    <div className="relative flex items-center rounded-sm shadow-lg overflow-hidden w-full h-full">
        <img 
            src={src} 
            alt={alt} 
            className="transition-transform duration-1000 ease-in-out transform hover:scale-105"
        />
    </div>
  )
}

export default ImagenZoom;