import CategoryItem from "../category-item/category-item.component";
import "./directory.style.scss";


const Directory = (props) => {
  const { categories } = props;

  // console.log("props",props);
  // console.log(categories);

  return (
    <div className="categories-container">
      {
        // Destructured by adding {title} , instead of just title
        // categories.map(({title,id, imageUrl}) => (
        //   <CategoryItem key={id} title={title} imageUrl={imageUrl} />
        // ))

        categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))
      }

    </div>
  )
};

export default Directory;
