export const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

    const starsArray = [];

    for (let i = 0; i < filledStars; i++) {
        starsArray.push(
            <i key={`filled-${i}`} className="fas fa-star" />
        );
    }

    if (halfStar) {
        starsArray.push(
            <i key="half" className="fas fa-star-half-alt" />
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        starsArray.push(
            <i key={`empty-${i}`} className="far fa-star" />
        );
    }

    return starsArray;
};