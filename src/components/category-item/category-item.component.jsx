import "./category-item.styles.scss";

const CategoryItem = (props) => {
  // Destructured props , 2 ways
  // const {category: {imageUrl,title}} = props;
  const {imageUrl, title} = props.category;


  return (
    <div className="category-container">
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
};

export default CategoryItem;
