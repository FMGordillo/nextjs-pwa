import StoryItem from "../Stories/StoryItem";

const StoryList = props => (
  <>
    {props.stories.map((story, k) => (
      <StoryItem story={story} key={k} />
    ))}
  </>
);

export default StoryList;
