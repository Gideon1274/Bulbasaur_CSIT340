import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Dummy data generation function
const generateDummyRating = () => {
    return (Math.random() * 2) + 3; // Generates a rating between 3.0 and 5.0
};

const generateDummyReviews = (count = 5) => {
    const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Ethan', 'Fiona', 'George'];
    const reviews = [
        "Excellent product! Fast shipping and great quality.",
        "Exactly what I needed. Highly recommend this shop.",
        "Decent quality for the price, but shipping was a bit slow.",
        "Perfect fit and looks amazing! A true 5-star product.",
        "The best purchase I've made all year. Will buy again.",
        "Good value, though the color was slightly off from the picture."
    ];
    
    const dummyReviews = [];
    for (let i = 0; i < count; i++) {
        dummyReviews.push({
            id: i,
            author: names[Math.floor(Math.random() * names.length)],
            rating: generateDummyRating(),
            comment: reviews[Math.floor(Math.random() * reviews.length)]
        });
    }
    return dummyReviews;
};

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
        <span className="text-warning">
            {[...Array(fullStars)].map((_, i) => <FontAwesomeIcon key={`full-${i}`} icon={faStar} />)}
            {hasHalfStar && <FontAwesomeIcon icon={faStar} />} 
            {[...Array(emptyStars)].map((_, i) => <FontAwesomeIcon key={`empty-${i}`} icon={faStar} style={{ color: '#ccc' }} />)}
        </span>
    );
};

const ProductReviews = ({ productId }) => {
    const reviews = generateDummyReviews(5); 
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <div className="mt-5 border-top pt-4">
            <h3 className="mb-4">Customer Reviews</h3>
            
            <div className="d-flex align-items-center mb-4">
                <h4 className="me-3 mb-0">Average Rating: {averageRating.toFixed(1)} / 5</h4>
                <StarRating rating={averageRating} />
                <span className="ms-2 text-muted">({reviews.length} reviews)</span>
            </div>

            <div className="list-group">
                {reviews.map(review => (
                    <div key={review.id} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{review.author}</h5>
                            <small>
                                <StarRating rating={review.rating} />
                            </small>
                        </div>
                        <p className="mb-1">{review.comment}</p>
                    </div>
                ))}
            </div>
            
            <button className="btn btn-primary mt-3">Write a Review</button>
        </div>
    );
};

export default ProductReviews;