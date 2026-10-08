import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    count?: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ rating, count, interactive = false, onRate, size = 'md' }: StarRatingProps) => {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const starSize = sizeClasses[size];

    const handleClick = (value: number) => {
        if (interactive && onRate) {
            onRate(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const filled = interactive
                        ? (hoverRating || rating) >= star
                        : rating >= star;

                    return (
                        <button
                            key={star}
                            type="button"
                            disabled={!interactive}
                            onClick={() => handleClick(star)}
                            onMouseEnter={() => interactive && setHoverRating(star)}
                            onMouseLeave={() => interactive && setHoverRating(0)}
                            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                        >
                            <svg
                                className={`${starSize} ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-none'} transition-colors`}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                        </button>
                    );
                })}
            </div>
            {count !== undefined && (
                <span className="text-sm text-gray-500 ml-1">({count})</span>
            )}
        </div>
    );
};

export default StarRating;
