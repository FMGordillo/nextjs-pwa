const style = {
  margin: "1rem",
  padding: "1.25rem",
  backgroundColor: "lightgray"
};

const Story = props => (
  <section>
    <h4>Comments:</h4>
    {props.story.comments.map((comment, k) => (
      <div key={k} style={style}>
        <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
        <i>
          Commented {comment.time_ago} by {comment.user}
        </i>
      </div>
    ))}
  </section>
);

export default Story;
