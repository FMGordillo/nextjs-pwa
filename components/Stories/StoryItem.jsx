import Link from "next/link";

const articleStyle = {
  margin: "2rem",
  padding: "1rem",
  backgroundColor: "lightgray",
  boxShadow: "2px 2px 2px black"
};

const StoryItem = ({ story }) => (
  <Link href="/story/[id]" as={`/story/${story.id}`}>
    <article style={articleStyle}>
      <h4>{story.title}</h4>
      <p>
        Comments: {story.comments_count || 0} / Points: {story.points || 0}
      </p>
    </article>
  </Link>
);
export default StoryItem;
