import { GridList, Heading } from "@/components/common";
import { Category } from "@/components/eCommerce";
import type { ICategory } from "@/types";
import { Loading } from "@/components/feedback";

import useCategories from "./useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();

  return (
    <>
      <Heading title={"Categories"} />
      <Loading status={loading} error={error} type="category">
        {/* Render Props Pattern */}
        <GridList<ICategory>
          records={records}
          renderItem={(record) => (
            <Category
              title={record.title}
              img={record.img}
              prefix={record.prefix}
            />
          )}
          title="Sorry, You have no categories to show!"
          message="There is no categories to show."
        />
      </Loading>
    </>
  );
};

export default Categories;
