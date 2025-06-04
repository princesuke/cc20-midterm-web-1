import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type StarReviewProps = {
  rating: number;
};
export default function StarReview({ rating }: StarReviewProps) {
  const renderStar = (rating: number) => {
    const star = [];
    for (let i = 1; i <= 5; i++) {
      if (rating == 0) {
        star.push(<FaRegStar key={i} />);
      } else if (rating > 5 || rating < 0) {
        star.push(<FaRegStar key={i} />);
      } else if (rating >= i - 0.25) {
        star.push(<FaStar key={i} />);
      } else if (rating > i - 0.75) {
        star.push(<FaStarHalfAlt key={i} />);
      } else {
        star.push(<FaRegStar key={i} />);
      }
    }
    return star;
  };
  return (
    <>
      {rating == 0 && <h1 className="text-lg font-semibold">No Review</h1>}
      <div className={`flex gap-2 text-yellow-300 text-xl`}>{renderStar(rating)}</div>
    </>
  );
}
