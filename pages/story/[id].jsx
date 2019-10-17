import "isomorphic-fetch";
import StoryComponent from "../../components/Story";

const Story = props => <StoryComponent story={props.story} />;

Story.getInitialProps = async ({ query }) => {
  const req = await fetch(`https://api.hackerwebapp.com/item/${query.id}`);
  const story = await req.json();
  return { story };
};

export default Story;
