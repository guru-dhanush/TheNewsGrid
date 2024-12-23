import DynamicList from "./DynamicList";

const Authors = ({ onClick, state, authors }) => {
  
  const selectedAuthors = authors.filter((topic) =>
    state.authors.includes(topic.value)
  );
  const unselectedAuthors = authors.filter(
    (topic) => !state.authors.includes(topic.value)
  );

  const items = [...selectedAuthors, ...unselectedAuthors];

  return (
    <>
      {items?.length > 0 ? (
        <DynamicList
          items={items}
          selectedItems={state.authors}
          onItemClick={onClick}
          labelField="label"
          valueField="value"
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No authors found.
        </p>
      )}
    </>
  );
};

export default Authors;
