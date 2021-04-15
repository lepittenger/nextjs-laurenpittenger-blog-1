import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://laurenpittenger.com/wp-json/wp/v2/posts')
    const posts = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
}

function Blog({ posts }) {
    return (
      <ul>
        {posts}
      </ul>
    )
  }

export default Blog;