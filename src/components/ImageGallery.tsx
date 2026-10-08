import { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    alt: string;
}

const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    // Ensure we have at least one image
    const displayImages = images.length > 0 ? images : ['https://via.placeholder.com/500'];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-md">
                <img
                    src={displayImages[selectedImage]}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                    {displayImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                    ? 'border-slate-600 shadow-md'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${alt} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
