import "isomorphic-fetch";
import StoryList from "../components/Stories";

const Stories = props => (
  <>
    <h1>Welcome user!</h1>
    <StoryList stories={props.stories} />
  </>
);

Stories.getInitialProps = async () => {
  const req = await fetch("https://api.hackerwebapp.com/news");
  const stories = await req.json();
  return {
    stories
  };
};

export default Stories;
